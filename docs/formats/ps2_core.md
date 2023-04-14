# PS2 Executables (CORE)

Main builds of Gran Turismo and Tourist Trophy will have splitted executables - the main executable named by the game code and another file usually starting with `CORE`.

The main executable is in charge of processing the second file.

---

## File Layout

### Encryption layer (GT4O)

Field              | Offset         | Type          | Description                               |
----------------   | ------------   | ----------    | --------------------------------------    |
Decryption IV      |  `0x00`        | `byte[8]`     | Decryption IV for the encrypted data      |
Data               |  `0x00`        | `byte[...]`   | Encrypted data                            |
CRC Checksum       |  `EOF - 4`     | `Int`         | CRC starting from `0x00`                  |

=== "C#"

    ``` csharp
    private static readonly byte[] k = new byte[16]
    {
        // "PolyphonyDigital"
        0x05, 0x3A, 0x39, 0x2C, 0x25, 0x3D, 0x3A, 0x3B,
        0x2C, 0x11, 0x3C, 0x32, 0x3C, 0x21, 0x34, 0x39,
    };

    // The key is encrypted, decrypt it
    private static byte[] GetKey()
    {
        byte[] key = new byte[16];
        for (int i = 0; i < 16; i++)
            key[i] = (byte)(k[i] ^ 0x55);
        return key;
    }

    // For decryption of the body:
    byte[] iv = sr.ReadBytes(8);
    byte[] key = GetKey();
    var s = new Salsa20(key, key.Length);
    s.SetIV(iv);
    s.Decrypt(file.AsSpan(8), file.Length - 12);
    ```

### Compression layer
Field              | Offset         | Type       | Description                               |
----------------   | ------------   | ---------- | --------------------------------------    |
Boot Load Flags    |  `0x00`        | `ushort`   | Boot load flags (boot device priority?)   |
Decompressed Size  |  `0x02`        | `uint`     | Size of the decompressed data             |
Compressed Data    |  `0x06`        | `byte[]`   | Compressed data until end of file         |

### Main Header

Field                    | Offset         | Type            | Description                               |
----------------         | ------------   | ----------      | --------------------------------------    |
First SHA-512 Hash Size  |  `0x00`        | `ushort`        | First SHA-512 hash size                   |
First SHA-512 Hash       |  `N/A`         | `ushort`        | First SHA-512 hash                        |
Second SHA-512 Hash Size |  `N/A`         | `ushort`        | Second SHA-512 hash size                  |
Second SHA-512 Hash      |  `N/A`         | `ushort`        | Second SHA-512 hash                       |
Section Count            |  `N/A`         | `Int`           | Executable section count                  |
Entrypoint               |  `N/A`         | `Int`           | Entrypoint address for the executable     |
Sections                 |  `N/A`         | `SectionInfo[]` | Section Infos                             |

#### Section Info

Field                    | Offset         | Type            | Description                               |
----------------         | ------------   | ----------      | --------------------------------------    |
Target Offset            |  `0x00`        | `Int`           | EE Memory Target Offset                   |
Size                     |  `0x04`        | `Int`           | Size of the section                       |
Data                     |  `...`         | `byte[]`        | Section Data                              |
