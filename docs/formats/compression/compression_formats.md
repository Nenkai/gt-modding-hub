---
comments: true
icon: material/zip-box
---

# :material-zip-box: Basics

There are various, standard compression types used across PDI games, most often using their own headers with a magic starting with `FF F7`. PS2ZIP is the most common.

Magic              | Name           | Compression Algorithm       | Games                                        |
----------------   | ------------   | ----------                  | --------------------------------------       |
`FF F7 EE C5`      | PS2ZIP         | Inflate                     | GT3 -> GT7
`FF F7 F3 2F`      | PDIZIP         | Inflate/ZLib                | GT Sport -> GT7
`FF F7 ED 85`      | ZSTD ZIP (Tiny)| ZSTD                        | GT7
`FF F7 97 2F`      | ZSTD ZIP       | ZSTD                        | GT7
`FF F7 F3 2E`      | ZSTD ZIP Chunk | ZSTD                        | GT7
`FE FE 65 FA`      | ?              | Oodle?                      | GT7 (PS5)
`FE FD DB 45`      | ?              | Oodle?                      | GT7 (PS5)
`FE FD B3 45`      | ?              | Oodle?                      | GT7 (PS5)
`FE F2 E5 FA`      | ?              | Oodle?                      | GT7 (PS5)

!!! warning 
    If you are using C#, do **NOT** use DeflateStream to create compression streams, it's been proven to have a few issues with games unable to read through them. You can use it to decompress, though.

    Prefer using [ICSharpCode.SharpZipLib](https://github.com/icsharpcode/SharpZipLib) for creating compressed streams.

## PS2ZIP (FF F7 EE C5)

:octicons-cpu-24: *Applies to: GT3 and above*

Field                    | Offset         | Type       | Description                                        |
----------------         | ------------   | ---------- | --------------------------------------             |
`FF F7 EE C5`            |  `0x00`        | `UInt`     | Magic                                              |
Size Complement          |  `0x04`        | `Int`      | Decompressed size (negated!)                       |
Start of compressed data |  `0x08`        | `Int`      | Inflated data                                      |

## PDIZIP (FF F7 F3 2F)

:octicons-cpu-24: *Applies to: GT Sport and above*

Field                    | Offset         | Type        | Description                                        |
----------------         | ------------   | ----------  | --------------------------------------             |
`FF F7 F3 2F`            |  `0x00`        | `UInt`      | Magic                                              |
expand_size              |  `0x04`        | `UInt`      | Total decompressed size (negated!)                 |
compressed_size          |  `0x08`        | `UInt`      | Total compressed size (negated!)                   |
fragment_size            |  `0x0C`        | `UInt`      | Size of one fragment                               |
Fragments                |  `0x10`        | `Fragment[]`| Compressed fragments.                              |

### Fragment

Field                              | Offset         | Type       | Description                                        |
----------------                   | ------------   | ---------- | --------------------------------------             |
fragment_expand_size               |  `0x00`        | `UInt`     | Total decompressed size (negated!)                 |
fragment_compressed_size           |  `0x04`        | `UInt`     | Total compressed size (negated!)                   |
Unknown                            |  `0x08`        | `UInt`     | ?                                                  |
Start of compressed fragment data  |  `0x10`        | `byte[]`   | Size of one fragment                               |

## ZSTD Zip Tiny (FF F7 ED 85)

:octicons-cpu-24: *Applies to: GT7*

This format is normally not chunked.

### Non-Chunked
Field                    | Offset         | Type        | Description                                        |
----------------         | ------------   | ----------  | --------------------------------------             |
`FF F7 ED 85`            |  `0x00`        | `UInt`      | Magic                                              |
uncompressed_size        |  `0x04`        | `UInt`      | Total decompressed size (negated!)                 |
Start of compressed data |  `0x08`        | `byte[]`    | ZSTD compressed data                               |

## ZSTD Zip (FF F7 ED 85)

:octicons-cpu-24: *Applies to: GT7*

Field                    | Offset         | Type        | Description                                        |
----------------         | ------------   | ----------  | --------------------------------------             |
`FF F7 97 2F`            |  `0x00`        | `UInt`      | Magic                                              |
uncompressed_size_lo     |  `0x04`        | `UInt`      | Total decompressed size (lower 32 bits)            |
uncompressed_size_hi     |  `0x08`        | `short`     | Total decompressed size (upper 16 bits)            |
compressed_size_lo       |  `0x0A`        | `UInt`      | Total decompressed size (lower 32 bits)            |
compressed_size_hi       |  `0x0E`        | `short`     | Total decompressed size (upper 16 bits)            |
Unknown                  |  `0x10`        | `byte[0x0C]`| N/A                                                |
Flags                    |  `0x1C`        | `UInt`      | 0x01 = Fragmented                                  |

!!! tip
    If fragmented, chunks may follow after. There is no chunk count, so check the magic accordingly.

## ZSTD Chunk

These will all appear one after the other (including magic).

Field                              | Offset         | Type       | Description                                        |
----------------                   | ------------   | ---------- | --------------------------------------             |
`FF F7 F3 2E`                      |  `0x00`        | `UInt`     | Magic                                              |
chunk_uncompressed_size            |  `0x04`        | `UInt`     | Decompressed size of the chunk                     |
chunk_compressed_size              |  `0x08`        | `UInt`     | Compressed size of the chunk                       |
crc_checksum                       |  `0x0C`        | `UInt`     | CRC Checksum of the chunk                          |