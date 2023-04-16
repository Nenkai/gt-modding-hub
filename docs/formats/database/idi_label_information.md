---
comments: true
---

# IDI - ID/Label Information
:octicons-cpu-24: *Applies to: GT4, GT5, GTPSP* · :material-file-question: Extension: `.idi` · Endian: Platform Dependent

IDI files links database rows to an ID and Label. This format mostly used for quickly searching a row by ID or Label, and is directly linked to DBT, Database Table.

!!! note
    GT6 and above have moved away from this format, using SQLite instead.

---

## Header

Size: `0x10`

Field              | Offset         | Type                | Description                                                           |
----------------   | ------------   | ----------          | --------------------------------------                                |
`GTID`             |  `0x00`        | `Int`               | Magic, (Enforced, cannot be different)                                |
Key Count          |  `0x04`        | `Int`               | Keys in the table                                                     |
Empty              |  `0x08`        | `Int`               | N/A                                                                   |
Table ID           |  `0x0C`        | `Int`               | Table ID. Each table (except optional ones) has an unique identifier. |
Keys               |  `0x10`        | `Key[]`             | Keys start here.                                                      |

### Key
Field              | Offset         | Type                | Description                                                                    |
----------------   | ------------   | ----------          | --------------------------------------                                         |
Key Name Offset    |  `0x00`        | `Int`               | Pointer to this key's name. Points to a string 2-byte prefixed for its length. |
Row ID             |  `0x04`        | `Int`               | Row ID of this Key                                                             |

!!! tip
    This table and string table must be ordered by key name alphanumerically (length first then contents) for binary search.

    The strings are aligned to the nearest `0x02`.