# SDB - String Storage/Database
:octicons-cpu-24: *Applies to: GT4, GT5, GTPSP* · :material-file-question: Extension: `.sdb`

SDB, String databases are used to link row data and columns to localized strings. Multiple string databases may exist within the games for multiple locales (which is determined at boot).

Strings are directly indexed from the Database Table by index.

!!! note
    GT6 and above have moved away from this format, using SQLite instead.

### Header

Size: `0x10`

Field              | Offset         | Type                | Description                                                           |
----------------   | ------------   | ----------          | --------------------------------------                                |
`GTST`             |  `0x00`        | `Int`               | Magic, (Enforced, cannot be different)                                |
String Count       |  `0x04`        | `Int`               | Strings in the database                                               |
Unknown            |  `0x08`        | `Int`               | 1 in GT5, maybe endianess                                             |
Empty              |  `0x0C`        | `Int`               | N/A                                                                   |
Keys               |  `0x10`        | `String[]`          | Keys start here.                                                      |

### String
Field              | Offset         | Type                | Description                                                                    |
----------------   | ------------   | ----------          | --------------------------------------                                         |
String Name Offset |  `0x00`        | `Int`               | Pointer to this key's name. Points to a string 2-byte prefixed for its length. |

!!! tip
    The strings are aligned to the nearest `0x02`.