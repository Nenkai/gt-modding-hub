---
comments: true
---

# Pat0 / Color Patch
:octicons-cpu-24: *Applies to: GT4* · :material-file-question: Extension: `.pat` / none · :octicons-arrow-right-16: Endian: Little

Color Patches are responsible for holding a car model's data for each paint color. More precisely - these files contain *data patches* that will changes bytes within a [texture set](../texture/img_tex1_textureset.md), in this case, located inside the car model's [model set](mdls_modelset2.md) structure.

As model sets are fully loaded in memory as the actual runtime buffers, patching a model set's texture bytes on the fly is what allows seamless color switching in car/paint selections. It is a smart way of doing color transitions, but remains complicated to construct - texture buffers especially inside car models can be swizzled.

---

## Header

The header may be present in all sorts of files like models.

Size: `0x20`

Field                   | Offset         | Type        | Description                                        |
----------------        | ------------   | ----------  | --------------------------------------             |
`Pat0`                  |  `0x00`        | `int`       | Magic, (not enforced)                              |
Relocation Pointer      |  `0x04`        | `int`       | Relocation Pointer                                 |
Emptu                   |  `0x08`        | `byte[0x08]`| Empty/Not used                                     |
Paint/Variation Count   |  `0x10`        | `short`     | Number of paints for the target car model          |
Patch Count             |  `0x12`        | `short`     | Number of patches to be made per paint             |
Empty                   |  `0x14`        | `byte[0x0C]`| Empty/ Not used                                    |
Patch List              |  `0x20...`     | [`Patch*`](#patch)    | Patch Offsets                                      |

## Patch

Field                   | Offset         | Type              | Description                           |
----------------        | ------------   | ----------        | --------------------------------------|
Patch Target Offset     |  `0x00`        | `int`             | Offset within the Model Set to patch  |
Patch Size              |  `0x04`        | `int`             | Size of the patch                     |
Buffer Width            |  `0x08`        | `byte[...]`       | Patch data                            |
