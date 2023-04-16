# MDL3 / ModelSet3
:octicons-cpu-24: *Applies to: GT5, GTPSP, GT6* · :material-file-question: Extension: `.mdl` / none · :octicons-arrow-left-16: Endian: Big (GT5/GT6) · :octicons-arrow-right-16: Little (GTPSP)

ModelSet3 is a direct upgrade to [MDLS / ModelSet2](mdls_modelset2.md). It still contains models with bytecode to set up which meshes to load and a virtual machine for callbacks. The main upgrade is that meshes now use flexible vertex definitions, bundled shaders and in the case of GT6, tesslated meshes and `PMSH` - packed meshes to save on memory usage.

It is a rather structured, yet complex format.

---

## Header

??? abstract "Structure (click to expand)"
    Size: `0xE4` (Version 14)

    Field                   | Offset         | Type               | Description                                                                         |
    ----------------        | ------------   | ----------         | --------------------------------------                                              |
    `MDL3 or 3LDM`          |  `0x00`        | `Int`              | Magic, (Enforced, cannot be different), depends on endian (Little will be `3LDM`)   |
    File Size               |  `0x04`        | `Int`              | File Size                                                                           |
    Relocation Pointer      |  `0x08`        | `Int`              | Relocation Pointer                                                                  |
    Version Major           |  `0x0C`        | `ushort`           | Version Major for reading the file                                                  |
    Runtime Flags           |  `0x0E`        | `ushort`           | Flags assigned at runtime                                                           |
    Model Count             |  `0x10`        | `ushort`           | Number of models in the set. Note that one model is more like a mesh group.         |
    Model Key Count         |  `0x12`        | `ushort`           | Number of model keys in the set. Models link directly to this. This is optional.    |
    Mesh Count              |  `0x14`        | `ushort`           | Number of meshes in the set.                                                        |
    Mesh Key Count          |  `0x16`        | `ushort`           | Number of mesh keys in the set. Meshes link directly to this. This is optional.     |
    FVF Count               |  `0x18`        | `ushort`           | Number of flexible vertex definitions in the set. Meshes uses this.                 |
    Bones Count             |  `0x1A`        | `ushort`           | Number of bones in the set.                                                         |
    SizeFor0x68             |  `0x1C`        | `ushort`           | Unknown.                                                                            |
    Host Method Count       |  `0x1E`        | `ushort`           | Number of host methods in the set. Linked to the virtual machine.                   |
    VM Stack Size           |  `0x20`        | `ushort`           | Size of the virtual machine stack.                                                  |
    Count 0x5C              |  `0x22`        | `ushort`           | Unknown count for 0x5C.                                                             |
    Unknown                 |  `0x24`        | `ushort`           | Unknown.                                                                            |
    Count 0x78              |  `0x26`        | `ushort`           | Unknown count for 0x78.                                                             |
    Count 0xA4              |  `0x28`        | `ushort`           | Unknown count for 0xA4.                                                             |
    Count 0x54              |  `0x2A`        | `ushort`           | Unknown count for 0x54.                                                             |
    Count 0x88              |  `0x2C`        | `ushort`           | Unknown count for 0x88.                                                             |
    Unknown                 |  `0x2E`        | `ushort`           | Unknown. Rather large value.                                                        |
    Models Pointer          |  `0x30`        | `Model*`           | Pointer to the array of models.                                                     |
    Model Keys Pointer      |  `0x34`        | `ModelKey*`        | Pointer to the array of model keys.                                                 |
    Meshes Pointer          |  `0x38`        | `Mesh*`            | Pointer to the array of meshes.                                                     |
    Mesh Keys Pointer       |  `0x3C`        | `MeshKey*`         | Pointer to the array of mesh keys.                                                  |
    FVF Pointer             |  `0x40`        | `FVF*`             | Pointer to the array of flexible vertex definitions.                                |
    Materials Pointer       |  `0x44`        | `MaterialInfo*`    | Pointer to the material info structure.                                             |
    Texture Set Pointer     |  `0x48`        | [`TXS3*`](../texture/img_txs3_textureset3.md) | Pointer to the texture set. Used by materials.           |
    Shaders Header Pointer  |  `0x4C`        | `ShaderHeader*`    | Pointer to the shader header.                                                       |
    Bones Pointer           |  `0x50`        | `Bone*`            | Pointer to the bone array.                                                          |
    Unk 0x54                |  `0x54`        | `UnkKey0x54*`      | Pointer to unknown keys.                                                            |
    Host Method Pointer     |  `0x58`        | `HostMethod*`      | Pointer to host methods.                                                            |
    Unk 0x5C                |  `0x5C`        | `void*`            | Unknown pointer.                                                                    |
    VM Opcodes Size         |  `0x60`        | `UInt`             | Size of all the virtual machine opcodes.                                            |
    VM Opcodes Offset       |  `0x64`        | `byte*`            | Pointer to the start of the virual machine opcodes.                                 |
    VM Instance Offset      |  `0x68`        | `byte*`            | Pointer to the virtual machine instance. This is pre-allocated depending on combined stack size, used at runtime.|
    Relocation Pointer2     |  `0x6C`        | `Int`              | Unknown. May be a second relocation pointer.                                        |
    Empty                   |  `0x70`        | `Int`              | N/A.                                                                                |
    Runtime Value           |  `0x74`        | `Int`              | Unknown. Set at runtime.                                                            |
    Unk 0x78                |  `0x78`        | `Unk0x78*`         | Pointer to unknown. Stride is 0x14 per entry.                                       |
    Unknown                 |  `0x7C`        | `UInt`             | Unknown.                                                                            |
    Empty                   |  `0x80`        | `Int`              | N/A.                                                                                |
    Unknown Index           |  `0x84`        | `ushort`           | ?                                                                                   |
    Unknown Index           |  `0x86`        | `ushort`           | ?                                                                                   |
    Unk 0x88                |  `0x88`        | `Unk0x88*`         | Pointer to unknown. Some entry in materials point to this aswell.                   |
    Unknown Index           |  `0x8C`        | `ushort`           | ?                                                                                   |
    Texture Type Count      |  `0x8E`        | `ushort`           | Number of texture keys in the set.                                                  |
    Texture Types Pointer   |  `0x90`        | `TextureKey*`      | Pointer to the array of texture type names in the set.                              |
    Empty                   |  `0x94`        | `Int`              | N/A.                                                                                |
    Wing Data Count         |  `0x98`        | `ushort`           | Count of data (related to wings)                                                    |
    Wing Data Key Count     |  `0x9A`        | `ushort`           | Count of wing keys                                                                  |
    Wing Data Pointer       |  `0x9C`        | `WingData*`        | Pointer to wing data                                                                |
    Wing Data Keys Pointer  |  `0xA0`        | `WingDataKey*`     | Pointer to wing keys                                                                |
    Unk 0xA4                |  `0xA4`        | `Unk0xA8*`         | Pointer to unknown. 0x04 Stride.                                                    |
    Empty                   |  `0xA8`        | `Int`              | N/A.                                                                                |
    Shape Streaming Pointer |  `0xAC`        | `ShapeStreamInfo*` | Pointer to shape streaming info for courses.                                        |
    Unk 0xB0                |  `0xB0`        | `Unk0xB0*`         | Pointer to unknown. 0x40 Stride.                                                    |
    Unk 0xB4                |  `0xB4`        | `Int`              | Unknown                                                                             |
    Unk 0xB8                |  `0xB8`        | `void*`            | Unknown pointer.                                                                    |
    VM Context Pointer      |  `0xBC`        | `void*`            | VM Context pointer, 0x20 stride                                                     |
    Unk 0xC0                |  `0xC0`        | `void*`            | Unknown pointer.                                                                    |
    Count 0xC0              |  `0xC4`        | `ushort`           | Count for 0xC0                                                                      |
    Empty                   |  `0xC6`        | `ushort`           | N/A                                                                                 |
    Unk 0xC8                |  `0xC8`        | `short`            | -1                                                                                  |
    Packed Mesh Key Count   |  `0xCA`        | `ushort`           | Count of keys for packed mesh                                                       |
    Packed Mesh Keys Pointer|  `0xCC`        | `PackedMeshKey*`   | Pointer to packed mesh keys                                                         |
    Packed Mesh Hedr Pointer|  `0xCC`        | `PackedMeshHeader*`| Pointer to packed mesh header `PMSH`                                                |
    Empty                   |  `0xD4`        | `ushort`           | N/A                                                                                 |
    Empty                   |  `0xD8`        | `ushort`           | N/A                                                                                 |
    Separate Data Info Ptr  |  `0xDC`        | `SepDataInfo*`     | Pointer to separate data info - for car streaming in GT6                            |

---

## Model

Represents a model. Meshes linked to it are setup from the commands.

Size: `0x30`

Field                   | Offset         | Type               | Description                                                                         |
----------------        | ------------   | ----------         | --------------------------------------                                              |
Unknown                 |  `0x00`        | `float`            | ?                                                                                   |
Origin                  |  `0x04`        | `Vector3`          | Origin position of this model                                                       |
Unknown                 |  `0x10`        | `byte`             | ?                                                                                   |
Unknown                 |  `0x11`        | `byte`             | ?                                                                                   |
Bounds Count            |  `0x12`        | `ushort`           | Number of vec3 components for the bounds                                            |
Bounds Pointer          |  `0x14`        | `Vector3`          | Pointer to the bounds of this model                                                 |
Setup Commands Pointer  |  `0x18`        | `void*`            | Pointer to the setup opcodes for this model.                                        |
Setup Commands Size     |  `0x1C`        | `Int`              | Size of the setup opcodes/commands.                                                 |
VM Pointers             |  `0x20`        | `Int[3]`           | Current VM pointers for each type.                                                  |
Unknown                 |  `0x2C`        | `short`            | Unknown. Maybe an index.                                                            |
Unknown                 |  `0x2E`        | `ushort`           | Unknown. Maybe flags.                                                               |

!!! tip "Commands"
    Commands setup what meshes are linked to a model, but can also directly set RSX parameters (on PS3).

    While PSP and PS3 GTs supports most opcodes, they also have their own (assigned with their unique opcode).

    Refer to [PDTools.Files](https://github.com/Nenkai/PDTools/tree/master/PDTools.Files/Models/ModelSet3/Commands) for the commands.

---

## Model Key

This is purely for debugging, they are not necessary. Keys contain the source path for the model.

Size: `0x08`

Field                   | Offset         | Type               | Description                                                                         |
----------------        | ------------   | ----------         | --------------------------------------                                              |
Name Pointer            |  `0x00`        | `char*`            | Pointer to the name of the key (Zero-terminated)                                    |
Model ID                |  `0x04`        | `Int`              | Model ID.                                                                           |

---

## Mesh

Field                   | Offset         | Type               | Description                                                                         |
----------------        | ------------   | ----------         | --------------------------------------                                              |
Unknown                 |  `0x00`        | `ushort`           | Flags                                                                               |
FVF Index               |  `0x02`        | `short`            | Flexible vertex definition to use for the mesh data. If empty, check PMSH.          |
Material Index          |  `0x04`        | `short`            | Material index to use for this mesh.                                                |
Unknown                 |  `0x06`        | `byte`             | Unknown/Empty.                                                                      |
Unknown                 |  `0x07`        | `byte`             | Unknown/Empty.                                                                      |
Vertex Count            |  `0x08`        | `uint`             | Number of verts in this mesh. If empty, check PMSH.                                 |
Vertex Pointer          |  `0x0C`        | `byte*`            | Pointer to the vertices. Must be read according to flexible vertices (if present).  |
Unknown                 |  `0x10`        | `uint`             | ?                                                                                   |
Tri Length              |  `0x14`        | `uint`             | Size of the tris. If empty, check PMSH.                                             |
Tri Pointer             |  `0x18`        | `short*`           | Pointer to the tris. If empty, check PMSH.                                          |
Unknown                 |  `0x1C`        | `Int`              | Unknown/Empty.                                                                      |
Unknown                 |  `0x20`        | `Int`              | Unknown/Empty.                                                                      |
Unknown                 |  `0x24`        | `short`            | Unknown/Empty.                                                                      |
Tri Count               |  `0x26`        | `short`            | Number of tris. If empty, check PMSH.                                               |
Boundary Box Pointer    |  `0x28`        | `Vector3*`         | Pointer to the boundary box. If empty, check PMSH.                                  |
PMSH Reference Pointer  |  `0x2C`        | `PMSHRef*`         | Pointer to some PMSH indicator.                                                     |

### PMSH Ref

Size: `0x34`

Field                   | Offset         | Type               | Description                                                                         |
----------------        | ------------   | ----------         | --------------------------------------                                              |
Unknown/Empty           |  `0x00`        | `Int[12]`          | N/A                                                                                 |
PMSH Index              |  `0x30`        | `Int`              | Packed Mesh entry to use.                                                           |

---

## Model Key

This is purely for debugging, they are not necessary. Keys contain the source path for the mesh.

Size: `0x08`

Field                   | Offset         | Type               | Description                                                                         |
----------------        | ------------   | ----------         | --------------------------------------                                              |
Name Pointer            |  `0x00`        | `char*`            | Pointer to the name of the key (Zero-terminated)                                    |
Mesh ID                 |  `0x04`        | `Int`              | Mesh ID.                                                                            |

---

## FVF / Flexible Vertex Definition

Addressed by meshes.

Size: `0x78`

Field                   | Offset         | Type               | Description                                                                         |
----------------        | ------------   | ----------         | --------------------------------------                                              |
Name Pointer            |  `0x00`        | `char*`            | Name/Type of FVF. Important - usually "Flex".                                       |
Shader Related Index    |  `0x04`        | `short`            | Partially known to be an index to shaders.                                          |
Field Def Offset        |  `0x08`        | `FVFField*`        | Pointer to the FVF fields composing this FVF. i.e describes `map12` which is UVs.   |
Unknown Index           |  `0x0C`        | `short`            | Some index assigned at runtime.                                                     |
Empty                   |  `0x0E`        | `short`            | N/A                                                                                 |
Unknown                 |  `0x10`        | `Int`              | Unknown/Empty.                                                                      |
Unk 0x14                |  `0x14`        | `Unk0x14*`         | Pointer to unknown.                                                                 |
Field Def Count         |  `0x18`        | `byte`             | Number of fields in this FVF structure.                                             |
FVF Structure Size      |  `0x19`        | `byte`             | Size of the FVF structure with all the fields combined essentially the size of one vert.|
Empty                   |  `0x1A`        | `short`            | N/A                                                                                 |
Empty/Runtime Data      |  `0x1C`        | `byte[0x58]`       | N/A                                                                                 |
Field Array Pointer     |  `0x74`        | `FVFArrayDef*`     | Array definition pointer                                                            |

---

## Materials




















