---
comments: true
---

# Gpb Data

:octicons-cpu-24: *Applies to: GT4, GT5, GTPSP, GT6, GT7* · :material-file-question: Extension: `.gpb` · Endian: Platform Dependent

Gpb files are Asset containers mostly used alongside Adhoc projects. Roots are often linked to an individual GpbData file to pre-load assets (mostly images, but sometimes strobe/flash files too) before a root has finished loading.

Gpb files can contain compressed assets (inflate algorithm), and will be decompressed if the file data starts with `FF F7 C5 EE`.

!!! tip
    Adhoc projects can instead load from disk aka local path instead of a Gpb container if a widget's `from_disk`'s property is set to true.

---

## Unpacking/Packing

The [GTAdhocToolchain](https://github.com/Nenkai/GTAdhocToolchain) can be used to unpack and pack these containers.

---

## Gpb1

:octicons-cpu-24: *Applies to GT4 First Preview* · :octicons-arrow-right-16: Endian: Little

### Header

Size: `0x20`

Field              | Offset         | Type       | Description                                        |
----------------   | ------------   | ---------- | --------------------------------------             |
`gpb1`             |  `0x00`        | `Int`      | Magic, (Enforced, cannot be different)             |
Relocation Pointer |  `0x04`        | `Int`      | Relocation Pointer                                 |
Empty              |  `0x08`        | `Int`      | Presumably Header Size, but it's not read and 0    |
Pair Count         |  `0x0C`        | `Int`      | File count in the container                        |

#### Pair

Size: `0x08`

Field                  | Offset         | Type       | Description                                         |
----------------       | -------------- | ---------- | --------------------------------------------------- |
File Name Offset       |  `0x00`        | `char*`    | String Offset to name of this file (Zero-terminated)|
File Data Offset       |  `0x04`        | `void*`    | Offset of the data for this file (Zero-terminated)  |

---

## Gpb2

:octicons-cpu-24: *Applies to GT4* · :octicons-arrow-right-16: Endian: Little

### Header

Size: `0x20`

Field              | Offset         | Type       | Description                                        |
----------------   | ------------   | ---------- | --------------------------------------             |
`gpb2`             |  `0x00`        | `Int`      | Magic, (Enforced, cannot be different)             |
Relocation Pointer |  `0x04`        | `Int`      | Relocation Pointer                                 |
Empty              |  `0x08`        | `Int`      | Presumably Header Size, but it's not read and 0    |
Pair Count         |  `0x0C`        | `Int`      | File count in the container                        |

#### Pair

Size: `0x10`

Field                  | Offset         | Type       | Description                                         |
----------------       | -------------- | ---------- | --------------------------------------------------- |
File Name Offset       |  `0x00`        | `char*`    | String Offset to name of this file (Zero-terminated)|
File Data Offset       |  `0x04`        | `void*`    | Offset of the data for this file (Zero-terminated)  |
File Size              |  `0x08`        | `Int`      | File size within the container                      |
Padding                |  `0x0C`        | `Int`      | N/A                                                 |

---

## Gpb3

:octicons-cpu-24: *Applies to GT5, GTPSP, GT6* · :octicons-arrow-right-16: Endian: Big (even GTPSP)

Gpb3 modified some of the header.

### Header

Size: `0x20`

Field              | Offset         | Type       | Description                                        |
----------------   | ------------   | ---------- | --------------------------------------             |
`3bpg`             |  `0x00`        | `Int`      | Magic, (Enforced, cannot be different)             |
Relocation Pointer |  `0x04`        | `Int`      | Relocation Pointer                                 |
Header Size        |  `0x08`        | `Int`      | Header Size (should be 0x20)                       |
Pair Count         |  `0x0C`        | `Int`      | File count in the container                        |
Pair Entries Offset|  `0x10`        | `Pair*`    | Offset to the array of pairs aka file entries      |
File Names Offset  |  `0x14`        | `char*`    | Offset to file names string table (Zero-terminated)|
File Data Offset   |  `0x18`        | `void*`    | Offset to the start of file data                   |
Padding            |  `0x1C`        | `Int`      | N/A                                                |

#### Pair

Size: `0x20`

Field                  | Offset         | Type       | Description                                         |
----------------       | -------------- | ---------- | --------------------------------------------------- |
File Name Offset       |  `0x00`        | `char*`    | String Offset to Name of this file (Zero-terminated)|
File Data Offset       |  `0x04`        | `void*`    | Offset of the data for this file (Zero-terminated)  |
File Size              |  `0x08`        | `Int`      | File size within the container                      |
Padding                |  `0x0C`        | `Int`      | N/A                                                 |

---

## Gpb4

:octicons-cpu-24: *Applies to GT Sport, GT7* · :octicons-arrow-right-16: Endian: Little

Gpb4 changed all 32-bit data pointers to 64-bit pointers.

### Header

Size: `0x20`

Field              | Offset         | Type       | Description                                        |
----------------   | ------------   | ---------- | --------------------------------------             |
`4bpg`             |  `0x00`        | `Int`      | Magic, (Enforced, cannot be different)             |
Header Size        |  `0x04`        | `Int`      | Header size, should be 0x20                        |
Relocation Pointer |  `0x08`        | `Int64`    | Relocation Pointer                                 |
Pair Count         |  `0x10`        | `Int`      | File count in the container                        |
Pair Entries Offset|  `0x14`        | `Int`      | Offset to the array of pairs aka file entries      |
File Names Offset  |  `0x18`        | `Int`      | Offset to file names string table (Zero-terminated)|
File Data Offset   |  `0x1C`        | `Int`      | Offset to the start of file data                   |

#### Pair

Size: `0x20`

Field                  | Offset         | Type       | Description                                         |
----------------       | -------------- | ---------- | --------------------------------------------------- |
File Name Offset       |  `0x00`        | `char*`    | String Offset to Name of this file (Zero-terminated)|
File Data Offset       |  `0x08`        | `void*`    | Offset of the data for this file (Zero-terminated)  |
Empty                  |  `0x10`        | `Int64`    | N/A                                                 |
File Size              |  `0x18`        | `Int64`    | File size within the container                      |

## Notes

!!! note ""
    The string table must be properly ordered alphanumerically as the game uses binary searching.

    String/Data alignment is `0x04`.

    GT4 is backwards compatible with Gpb1.
