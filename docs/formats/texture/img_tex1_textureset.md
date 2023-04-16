# Tex1 - TexSet

:octicons-cpu-24: *Applies to: GT3, GT4* · :material-file-question: Extension: `.img` / none :octicons-arrow-right-16: · Endian: Little

The `Tex1` is a texture format that can hold multiple formats. It is essentially a wrapper around the PS2 Tex registers.

---

## Header

The header may be present in all sorts of files like models.

Size: `0x30`

Field                   | Offset         | Type               | Description                                                                         |
----------------        | ------------   | ----------         | --------------------------------------                                              |
`Tex1`                  |  `0x00`        | `Int`              | Magic, (Enforced only in debug?)                                                    |
Relocation Pointer      |  `0x04`        | `Int`              | Relocation Pointer                                                                  |
Unknown Pointer         |  `0x08`        | `Int`              | Normally 0?                                                                         |
File Size               |  `0x0C`        | `Int`              | File Size                                                                           |
Base TBP Offset         |  `0x10`        | `short`            | Remapped at runtime. TBP register base                                              |
Total Blocks            |  `0x12`        | `short`            | Total blocks taken by all textures in this texture set                              |
PGLUTexture Count       |  `0x14`        | `short`            | Number of textures (or mipmaps) in this texture set                                 |
Texture Buffer Count    |  `0x16`        | `short`            | Number of texture buffers in this texture set                                       |
PGLUTextures Pointer    |  `0x18`        | `PGLUTexture*`     | Pointer to PGLUTexture infos                                                        |
Texture Buffer Info Pointer |  `0xC`        | `TextureBufferInfo*`     | Pointer to texture buffer info                                             |
Unknown Pointer         |  `0x20`        | `void*`            | N/A                                                                                 |
Clut Animation Pointer  |  `0x24`        | `void*`       | Unknown. Remapped by `pgluMapClutAnimation`                                              |
Unknown Pointer         |  `0x28`        | `void*`            | N/A                                                                                 |

### PGLUTexture

Size: `0x28`

Direct GS Registers go here:

* sceGsTex0 aka [`TEX0`](https://psi-rockin.github.io/ps2tek/#gstextures)
* sceGsTex1 aka [`TEX1`](https://psi-rockin.github.io/ps2tek/#gstextures)
* sceGsMiptbp1 aka [`MIPTBP1`](https://github.com/PCSX2/pcsx2/blob/ada291c0f663ea63a9fdc57453c84613fbcb3635/pcsx2/GS/GSRegs.h#L681)
* sceGsMiptbp2 aka [`MIPTBP2`](https://github.com/PCSX2/pcsx2/blob/ada291c0f663ea63a9fdc57453c84613fbcb3635/pcsx2/GS/GSRegs.h#L691)
* sceGsClamp aka [`CLAMP`](https://github.com/PCSX2/pcsx2/blob/ada291c0f663ea63a9fdc57453c84613fbcb3635/pcsx2/GS/GSRegs.h#L566)

--- 

### Texture Buffer

Normally there is one for the image and one for the palette if applicable.

For tightly packed texture sets for things like car textures, there can be many of them.

Size: `0x0C`

Field                   | Offset         | Type                      | Description                                                                         |
----------------        | ------------   | ----------                | --------------------------------------                                              |
Image Data Pointer      |  `0x00`        | `void*`                   | Pointer to the image data.                                                          |
TBP                     |  `0x04`        | `short`                   | Block offset of the image data.                                                     |
Buffer Width            |  `0x06`        | `byte`                    | Buffer width of the texture buffer.                                                 |
PSM                     |  `0x07`        | `byte`                    | Pixel surface format.                                                               |
Width                   |  `0x08`        | `byte`                    | Width of the texture buffer.                                                        |
Height                  |  `0x0A`        | `byte`                    | Height of the texture buffer.                                                       |

## Texture Blocks

Refer to the PS2 GS's Users Manual - Page 161 to 170.