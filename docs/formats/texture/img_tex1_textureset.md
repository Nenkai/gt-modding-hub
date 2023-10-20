---
comments: true
---

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
GS Transfer Count       |  `0x16`        | `short`            | Number of GS transfers to be made                                                   |
PGLUTextures Pointer    |  `0x18`        | [`PGLUTexture*`](#pglutexture)     | Pointer to PGLUTexture infos                                                        |
GS Transfers Pointer    |  `0x1C`        | [`GSTransfer*`](#gs-transfers)      | Pointer to GS Transfers                                                             |
Unknown Pointer         |  `0x20`        | `void*`            | N/A                                                                                 |
Clut Animation Pointer  |  `0x24`        | `void*`       | Unknown. Remapped by `pgluMapClutAnimation`                                              |
Unknown Pointer         |  `0x28`        | `void*`            | N/A                                                                                 |

### PGLUTexture

Represents a texture in the texture set.

Size: `0x28`

Direct GS Registers go here:

* sceGsTex0 aka [`TEX0`](https://psi-rockin.github.io/ps2tek/#gstextures)
* sceGsTex1 aka [`TEX1`](https://psi-rockin.github.io/ps2tek/#gstextures)
* sceGsMiptbp1 aka [`MIPTBP1`](https://github.com/PCSX2/pcsx2/blob/ada291c0f663ea63a9fdc57453c84613fbcb3635/pcsx2/GS/GSRegs.h#L681)
* sceGsMiptbp2 aka [`MIPTBP2`](https://github.com/PCSX2/pcsx2/blob/ada291c0f663ea63a9fdc57453c84613fbcb3635/pcsx2/GS/GSRegs.h#L691)
* sceGsClamp aka [`CLAMP`](https://github.com/PCSX2/pcsx2/blob/ada291c0f663ea63a9fdc57453c84613fbcb3635/pcsx2/GS/GSRegs.h#L566)

--- 

### GS Transfers

Defines the transfers to be made to [GS](https://www.psdevwiki.com/ps2/Graphics_Synthesizer).

Transfers may be swizzled from `PSMT4/8` into `PSMCT32` for faster upload speed.

Size: `0x0C`

Field                   | Offset         | Type      | Description                                |
----------------        | ------------   | ----------| --------------------------------------     |
Image Data Pointer      |  `0x00`        | `void*`   | Pointer to the image data.                 |
TBP                     |  `0x04`        | `short`   | Block target of the transfer's image data. |
Buffer Width            |  `0x06`        | `byte`    | Buffer width of the transfer.              |
PSM                     |  `0x07`        | `byte`    | Pixel surface format.                      |
Width                   |  `0x08`        | `byte`    | Width of the transfer.                     |
Height                  |  `0x0A`        | `byte`    | Height of the transfer.                    |

## Technical documentation

*Taken from PDTools*

!!! quote
     So. Tex1 might seem like a simple format, but it can get complicated really quick.
     If you wanna follow along, grab 010 Editor and [this template](https://github.com/Nenkai/GT-File-Specifications-Documentation/blob/master/Formats/GT4/GT4_Tex1_TexSet.bt)
     
     [PGLUTextures](#pglutexture) defines the textures in the set, and passes GS registers for each one. 
     Any tbp field (including mipmap) is remapped at runtime. 
     
     The [GS Transfers](#gs-transfers) are the hard part. 
     
     But before explaining the transfers, it's important to be familiar with the GS's block/page system,
     so refer to Page 161<->175 of the GS's Users Manual (Docs&Training\HardwareManuals in PS2 SDK).
     
     The important registers to keep in mind are `TBP` and `CBP` (in `tex0`). These are block pointers/offsets.
     
     Blocks kinda work as a separate coordinate system. For texture sets, some optimization is made as to where the textures go.
     When you have a texture that's for instance `350x350`, the height and width are raised to the next power of 2, so `512x512`.
     That leaves a space with what's rendered and what isn't, so extra data can be put there, it can be the image's palette, or another texture
     So don't be surprised if you see the CBP register of a texture in the middle of what would appear to be the main texture's.
     
     Now, for GS transfers.
     
     Suppose you have one basic texture with a palette, PDI's builder simply builds two transfers - one with the image data, the other with the palette.
     Simple enough, right?
     The problem is when larger textures or more than one texture exists within the set.
     
     They're swizzled into buffers converted from i.e 4bit/8bit to PSMCT32 (32 bit) so the GS can load them faster.
     To read them (and convert to png), I used GSTextureConvert.

     * [GSTextureConvert - EzSwizzle - TextureSwizzling.pdf](https://ps2linux.no-ip.info/playstation2-linux.com/projects/ezswizzle/)
     
     For more documentation:

     * Docs&Training\Starting Guides\Graphics Synthesizer Starting Guide.pdf (PS2 SDK)
     * Source in Shell\Tools\shellTexture\
     * ee\sample\graphics\textrans\bitconv
     
     For an example, look at `advertise/us/premium.img` (GT4 Online).
     There's 3 transfers, `64x1216`, `32x16` and `8x8`.
     
     So summarize, tex1 allows for 4 rather complex optimizations:

     - Textures, or palettes, can be inside the non-rendered area of other textures, to save on blocks
     - Multiple texture buffers of different formats swizzled into `PSMCT32` for faster upload to GS
     - Texture data is sometimes reused when a different palette is used, to save on size
     - When a different palette is used for certain textures, the `CSA` register is set, which presumably avoids using an extra block for a palette.