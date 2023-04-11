# ESGX - Engine SGX

:octicons-cpu-24: *Applies to: GT5, GTPSP, GT6* · :material-file-question: Extension: `.esgx` / none · :octicons-arrow-right-16: Endian: Big (GT5/GT6), Little (GTPSP)

An ESGX is merely a wrapper around a Sony SGD file, with extra parameters setting an engine sound's parameters.

---

## Header

Size: `0x24`

Field                     | Offset         | Type               | Description                                        |
----------------          | ------------   | ----------         | --------------------------------------             |
`ESGX`                    |  `0x00`        | `Int`              | Magic, (Enforced, can not be different)            |
Relocation Pointer        |  `0x04`        | `Int`              | Relocation Pointer                                 |
Header Size               |  `0x08`        | `Int`              | Header Size                                        |
Sample Count              |  `0x0C`        | `Int`              | Number of samples in this engine sound             |
Sample Parameters Pointer |  `0x10`        | `SampleParameter*` | Track Count                                        |
Unk/Empty                 |  `0x14`        | `Int`              | N/A                                                |
Unk/Empty                 |  `0x18`        | `Int`              | N/A                                                |
Volume Left               |  `0x1C`        | `short`            | 0x1000                                             |
Padding                   |  `0x1E`        | `short`            | N/A                                                |
Volume Right              |  `0x20`        | `short`            | 0x1000                                             |
Padding                   |  `0x22`        | `short`            | N/A                                                |

### Sample Parameter

Size: `0x10`

Field                   | Offset         | Type         | Description                                                     |
----------------        | ------------   | ----------   | --------------------------------------                          |
RPM Pitch               |  `0x00`        | `short`      | Pitch of the sample                                             |
RPM Start               |  `0x02`        | `short`      | Which RPM this sample starts playing                            |
RPM End                 |  `0x04`        | `short`      | Which RPM this sample stops playing                             |
RPM Volume              |  `0x06`        | `short`      | Volume of the sample                                            |
RPM Frequency           |  `0x08`        | `int`        | Frequency of the sample                                         |
SGD Pointer             |  `0x0C`        | `SGD*`       | SGD Container for this sample                                   |