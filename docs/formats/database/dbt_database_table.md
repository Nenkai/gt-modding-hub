---
comments: true
---

# DBT - Database Table
:octicons-cpu-24: *Applies to: GT4, GT5, GTPSP* · :material-file-question: Extension: `.dbt` · Endian: Platform Dependent

DBT Stands for Database Table.

DBT files is a non-standard database table format that supports compression. This format is directly linked to IDI, Label Information. No column information is present in this file, they had to be figured out from raw row data.

!!! note
    All the database tables are loaded at boot fully in memory. When a row is extracted, a row is decompressed, but not in-place. The DBT format supports compressed and uncompressed tables, although uncompressed is generally not compatible with GT4 and will easily run out of memory. [GTSpecDB](https://github.com/Nenkai/GTSpecDB) will save compressed by default.

    GT6 and above have moved away from this format, using SQLite instead.

---

## Header

Size: `0x10`

Field              | Offset         | Type                | Description                                          |
----------------   | ------------   | ----------          | --------------------------------------               |
`GTDB`             |  `0x00`        | `Int`               | Magic, (Enforced, cannot be different)               |
Version/Flags      |  `0x04`        | `Int`               | If 0x01 is toggled, the database is not compressed   |
Row Count          |  `0x08`        | `Int`               | Number of rows in the table                          |
Row Data Length    |  `0x0C`        | `Int`               | The size of one row in bytes, when extracted         |
Row Infos          |  `0x10`        | `RowInfos[]`        | Row Infos start here                                 |
Huffman Dictionary |  N/A           | `Huffman Dictionary`| Huffman dictionary (only when compressed)            |
Row Data           |  N/A           | N/A                 | Row Data                                             |

### Row Infos

Size: `0x08`

Field                  | Offset         | Type       | Description                            |
----------------       | -------------- | ---------- | -------------------------------------- |
Row ID                 |  `0x00`        | `Int`      | Row ID of this row                     |
Data Offset            |  `0x04`        | `char*`    | If uncompressed, this will point to the row's data. If compressed it will point to the huffman codes used by this row to extract the row's data. |

!!! tip
    This table must be ordered by Row ID for binary search.

### Huffman Dictionary

!!! note ""
    This is only present if the database is compressed.

Field              | Offset         | Type                      | Description                                               |
----------------   | ------------   | ----------                | --------------------------------------                    |
Dictionary Size    |  `0x00`        | `Int`                     | Size of dictionary (relative from here)                   |
Dict Entry Count   |  `0x04`        | `Int`                     | Number of entries in the dictionary                       |
Prefix Lookup Table|  `0x08`        | `Prefix Lookup Entry[256]`| Lookup tables mapping every byte (for codes under 8 bits) |
Code Definitions   | N/A            | `Code Definition[]`       | Defines each code in the huffman dictionary               |

#### Prefix Lookup Entry

Field              | Offset         | Type        | Description                                               |
----------------   | ------------   | ----------  | --------------------------------------                    |
Byte Data          |  `0x00`        | `byte`      | Byte data or this indexed entry                           |
Code Bit Size      |  `0x01`        | `byte`      | Size of this indexed code in bits                         |

#### Code Definition
Field              | Offset         | Type                      | Description                                               |
----------------   | ------------   | ----------                | --------------------------------------                    |
Code Bit Size      |  `0x00`        | `byte`                    | Size of the code in bits                                  |
Data               |  `0x01`        | `byte`                    | Data linked to this code                                  |
Padding            |  `0x02`        | `short`                   | N/A                                                       |
Code               |  `0x04`        | `Int`                     | Huffman Code                                              |

!!! tip
    This table must be ordered for binary search first by code, then by code bit size.

### Row Data
!!! note ""
    If the table is compressed, bytes will be extracted from here to form the row

    Otherwise uncompressed data for all rows is located here.

Field              | Offset         | Type                      | Description                                                                      |
----------------   | ------------   | ----------                | --------------------------------------                                           |
Uncompressed Size  |  `0x00`        | `Int`                     | Size of the uncompressed data in the table (only if compressed) relative to here |
Uncomp. Row Count  |  `0x04`        | `Int`                     | Count of uncompressed rows in this table (only if compressed)                    |

Uncompressed data then starts from here based on the count, and the size of one row defined in the header.

### Huffman Codes

!!! note ""
    This is only present if the database is compressed.

Each row info will point to an unique place in the huffman codes table. The first code to be extracted is the number of codes needed to extract the row.
Following that, the next code to be used will be a header packed in one byte:

- 6 bits: Row Index
- 2 bits: Extraction Type

It determines how a row is compressed:

* Type 0: Row is uncompressed. Use row index to index the uncompressed rows.
* Type 1: Row is compressed, each following code equals one byte in the row data.
* Type 2: Row is compressed, we use an uncompressed row (using row index) and patch bytes into it to have our final row.
  Using the next codes, there will be 1 bit for each row byte, for each toggled bit it tells whether a byte in the uncompressed base row to use needs to be patched.
  After that, aligned to next byte, codes for each byte data to patch appears after.
