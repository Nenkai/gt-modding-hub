# RT2 - RText Localization File
:octicons-cpu-24: *Applies to: GT4, GT5, GTPSP, GT6, GT7* · :material-file-question: Extension: `.rt2`

RT2 Stands for RText 2 (Region Text 2?). 

They are key-value dictionaries for localized text.

## Editing

[GT.RText](https://github.com/Razer2015/GT.RText) by [Razer2015](https://github.com/Razer2015) can be used to edit these files.

A C# library is also available - [PDTools.RText](https://github.com/Nenkai/PDTools/tree/master/PDTools.RText) by [Nenkai](https://github.com/Nenkai)

## RT05 (RTextV5)

:octicons-cpu-24: *Applies to GT Sport, GT7* · :octicons-arrow-left-16: Endian: Big (GT5/GT6) · :octicons-arrow-right-16: Little (GT4, GT Sport, GT7)

### Header

Size: `0x20`

Field              | Offset         | Type       | Description                               |
----------------   | ------------   | ---------- | --------------------------------------    |
`RT0x`             |  `0x00`        | `Int`      | Magic, (Enforced, cannot be different)    |
Page Count         |  `0x04`        | `Int`      | Number of pages (categories) in the RText |
Unknown            |  `0x08`        | `Byte`     | This field is not read                    |
Relocation Pointer |  `0x10`        | `Int`      | Relocation Pointer                        |
Padding            |  `Until 0x20`  | `Byte`     | N/A                                       |

#### Page

Size: `0x10`

Field                  | Offset         | Type       | Description                            |
----------------       | -------------- | ---------- | -------------------------------------- |
Page Name Pointer      |  `0x00`        | `Int`      | String Offset to Name (Zero-terminated)|
Pair Count             |  `0x04`        | `Int`      | Number of pairs in this category       |
Empty                  |  `0x08`        | `Int`      | N/A                                    |
Pairs Pointer          |  `0x0C`        | `Pair*`    | Offset to the pairs                    |

#### Pair

Size: `0x10`

Field                  | Offset         | Type       | Description                                          |
----------------       | -------------- | ---------- | --------------------------------------               |
ID                     |  `0x00`        | `UInt`     | String Offset to Name (Zero-terminated)              |
Label Name Length      |  `0x04`        | `UShort`   | Length of the label string                           |
Value Name Length      |  `0x06`        | `UShort`   | Length of the value string                           |
Label String Pointer   |  `0x08`        | `char*`    | Offset to the key's encrypted label (Zero-terminated)|
Value String Pointer   |  `0x0C`        | `char*`    | Offset to the key's encrypted value (Zero-terminated)|

### Encryption

The content is encrypted with Salsa20, use the following sample code to decrypt it:

=== "C#"

    ``` csharp
    
    static string Key = "majimenihataraiteimasu";

    static byte[] Decrypt(byte[] encrypted, string key)
    {
        if (encrypted.Length == 0)
            return encrypted;

        using (SymmetricAlgorithm salsa20 = new Salsa20SymmetricAlgorithm())
        {
            var dataKey = new byte[8];
            var keyBytes = Encoding.UTF8.GetBytes(key);
            byte[] decrypted = new byte[encrypted.Length];
            using (var decrypt = salsa20.CreateDecryptor(keyBytes, dataKey))
                decrypt.TransformBlock(encrypted, 0, encrypted.Length, decrypted, 0);

            return decrypted;
        }
    }

    [...]

    Decrypt(..., Key);
    ```

## RT04 (RTextV4)

:octicons-cpu-24: *Applies to GTPSP, GT5* · :octicons-arrow-left-16: Endian: Big (GT5) · :octicons-arrow-right-16: Little (GT4/GTPSP)

### Header

Size: `0x10`

Field              | Offset         | Type       | Description                               |
----------------   | ------------   | ---------- | --------------------------------------    |
`RT04`             |  `0x00`        | `Int`      | Magic, (Enforced, cannot be different)    |
Relocation Pointer |  `0x04`        | `Int`      | Relocation Pointer                        |
Empty              |  `0x08`        | `Int`      | N/A                                       |
Page Count         |  `0x0C`        | `Int`      | Number of pages (categories) in the RText |

### Page

Size: `0x10`

Field                  | Offset         | Type       | Description                            |
----------------       | -------------- | ---------- | -------------------------------------- |
Page Name Pointer      |  `0x00`        | `Int`      | String Offset to Name (Zero-terminated)|
Pair Count             |  `0x04`        | `Int`      | Number of pairs in this category       |
Pairs Pointer          |  `0x08`        | `Pair*`    | Offset to the pairs                    |
Padding                |  `0x0C`        | `Int`      | Padding `5E 5E 5E 5E`                  |

#### Pair

Size: `0x10`

Field                  | Offset         | Type       | Description                                          |
----------------       | -------------- | ---------- | --------------------------------------               |
ID                     |  `0x00`        | `UInt`     | ID                                                   |
Label String Pointer   |  `0x04`        | `char*`    | Offset to the key's label (Zero-terminated)          |
Value String Pointer   |  `0x08`        | `char*`    | Offset to the key's value (Zero-terminated)          |

## RT03 (RTextV3)

:octicons-cpu-24: *Applies to GT4* · :octicons-arrow-right-16: Little (GT4/GTPSP)

RTextV3 did not have pair IDs.

### Header

Size: `0x10`

Field              | Offset         | Type       | Description                               |
----------------   | ------------   | ---------- | --------------------------------------    |
`RT03`             |  `0x00`        | `Int`      | Magic, (Enforced, cannot be different)    |
Relocation Pointer |  `0x04`        | `Int`      | Relocation Pointer                        |
Empty              |  `0x08`        | `Int`      | N/A                                       |
Page Count         |  `0x0C`        | `Int`      | Number of pages (categories) in the RText |

### Page

Size: `0x10`

Field                  | Offset         | Type       | Description                            |
----------------       | -------------- | ---------- | -------------------------------------- |
Page Name Pointer      |  `0x00`        | `Int`      | String Offset to Name (Zero-terminated)|
Pair Count             |  `0x04`        | `Int`      | Number of pairs in this category       |
Pairs Pointer          |  `0x08`        | `Pair*`    | Offset to the pairs                    |
Padding                |  `0x0C`        | `Int`      | Padding `5E 5E 5E 5E`                  |

#### Pair

Size: `0x08`

Field                  | Offset         | Type       | Description                                          |
----------------       | -------------- | ---------- | --------------------------------------               |
Label String Pointer   |  `0x00`        | `char*`    | Offset to the key's label (Zero-terminated)          |
Value String Pointer   |  `0x04`        | `char*`    | Offset to the key's value (Zero-terminated)          |

## Notes

!!! note ""
    All games after GT4 have backwards compatibility with RTextV3 and RTextV4. Endianess will depend of the current platform.

    The string table must be properly ordered alphanumerically as the game uses binary searching.

    String/Data alignment is `0x04`.
