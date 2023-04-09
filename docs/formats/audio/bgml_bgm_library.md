# BGML - Background Music Library

:octicons-cpu-24: *Applies to: GT5, GTPSP, GT6, GT Sport, GT7* · :material-file-question: Extension: `.lib` · :octicons-arrow-right-16: Endian: Little

BGML files holds the tracks and playlist listings for each game. In GT Sport and GT7, they also hold the headers of the tracks.

!!! tip
    "Groups" are the sets of music that plays during a certain menu. The chance of a track to play is evenly distributed.

### Header

Size: `0x20`

Field              | Offset         | Type       | Description                                        |
----------------   | ------------   | ---------- | --------------------------------------             |
`BGML`             |  `0x00`        | `Int`      | Magic, (Not enforced, can be different)            |
Relocation Pointer |  `0x04`        | `Int`      | Relocation Pointer                                 |
File Size          |  `0x08`        | `Int`      | File size                                          |
Empty              |  `0x0C`        | `Int`      | N/A                                                |
Track Count        |  `0x10`        | `Int`      | Track Count                                        |
Tracks Pointer     |  `0x14`        | `Track*`   | Track Definitions Pointer                          |
Group Count        |  `0x18`        | `Int`      | Group/Playlist Count                               |
Groups Pointer     |  `0x1C`        | `Group**`  | Group/Playlist Pointers                            |

### Track

Size: `0x30`

Field                   | Offset         | Type         | Description                                                     |
----------------        | ------------   | ----------   | --------------------------------------                          |
Track File Name Pointer |  `0x00`        | `char*`      | Name of the track file (Zero-terminated)                        |
Flags/Format            |  `0x04`        | `Int`        | Format of the track and/or flags                                |
ID Pointer              |  `0x08`        | `char*`      | ID of the track (Zero-terminated)                               |
Empty                   |  `0x0C`        | `Int`        | N/A                                                             |
Stream Header Pointer   |  `0x10`        | `void*`      | Pointer to the header of the stream file, bundled in the BGML   |
Track Name Pointer      |  `0x14`        | `char*`      | Name of the track (Zero-terminated)                             |
Artist Name Pointer     |  `0x18`        | `char*`      | Name of the artist (Zero-terminated)                            |
Genre Name Pointer      |  `0x1C`        | `char*`      | Name of the genre (Zero-terminated)                             |
Padding                 |  `0x20`        | `byte[0x10]` | Padding                                                         |

### Group

Field                    | Offset         | Type         | Description                                                     |
----------------         | ------------   | ----------   | --------------------------------------                          |
Playlist Label Pointer   |  `0x00`        | `char*`      | Label of the group file (Zero-terminated)                       |
Padding                  |  `0x04`        | `byte[0x0C]` | Padding                                                         |
Track Count in Playlist  |  `0x10`        | `char*`      | Number of tracks in this group                                  |
Track Indices            |  `0x10`        | `int[]`      | Track Indices in use for this group                             |

!!! info
    This is aligned to the nearest `0x10`.

    String tables do not need to be ordered (nor are they aligned).