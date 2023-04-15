# MDL3 / ModelSet3

ModelSet3 is a direct upgrade to [MDLS / ModelSet2](mdls_modelset2.md). It still contains models with bytecode to set up which meshes to load and a virtual machine for callbacks. The main upgrade is that meshes now use flexible vertex definitions, bundled shaders and in the case of GT6, tesslated meshes and `PMSH` - packed meshes to save on memory usage.

It is a rather structured, yet complex format.

## Header

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














