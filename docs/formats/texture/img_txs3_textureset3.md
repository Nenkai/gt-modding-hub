---
comments: true
---

# TXS3 - TextureSet3

:octicons-cpu-24: *Applies to: GT5, GTPSP, GT6, GT Sport, GT7* · :material-file-question: Extension: `.img`, `.txs`, `.tex`, none :octicons-arrow-right-16: · Endian: Platform Dependent

TXS3 is an evolution of the [`Tex1`](../texture/img_tex1_textureset.md) format that GT3 and GT4 uses. It now allows being linked to a "streaming" texture file, which holds compressed textures to be streamed - mostly used for courses.

The `3` in TextureSet3 represents PS**3**.

---

## Converting from/to TXS3

*Refer to [Image Editing](../../ps3/textures.md)*.

---

## Header

The header may be present in all sorts of files like models.

Note that the header varies between PS3-era Gran Turismos and PS4-era, pointers are 64 bit instead of 32 bit.

Size: `0x40`

Field                   | Offset         | Type               | Description                                                                         |
----------------        | ------------   | ----------         | --------------------------------------                                              |
`TXS3` or `3SXT`        |  `0x00`        | `Int`              | Magic, (Enforced, cannot be different), depends on endian (Little will be `3SXT`)   |
File Size               |  `0x04`        | `Int`              | File Size                                                                           |
Relocation Pointer      |  `0x08`        | `Int`              | Relocation Pointer                                                                  |
Unknown                 |  `0x0C`        | `Int`              | N/A                                                                                 |
Unknown                 |  `0x10`        | `Int`              | Sometimes 1                                                                         |
PGLUTextureInfo Count   |  `0x14`        | `short`            | Number of platform-specific texture parameters.                                     |
Image Info Count        |  `0x16`        | `short`            | Number of image infos.                                                              |
PGLUTextureInfo Pointer |  `0x18`        | `PGLUTextureInfo*` | Offset to platform-specific texture parameters.                                     |
Image Info Count        |  `0x1C`        | `ImageInfo*`       | Offset to image infos.                                                              |
Padding                 |  `0x20`        | `byte[0x20]`       | N/A                                                                                 |

### PGLUTextureInfo

This **depends** on the platform. These are normally direct platform texture registers/parameters.

??? abstract "PS3 (Cell)"

    All of the following macros take up 1 `Int`.

    ##### CELL_GCM_METHOD_HEADER_TEXTURE_OFFSET

    Field         | Bits            |  Description                                                                         |
    --------------| ------------    |  --------------------------------------                                              |
    num           |  `0-13`         |  Number                                                                              |
    method        |  `14-31`        |  Method                                                                              |

    ##### CELL_GCM_METHOD_DATA_TEXTURE_OFFSET

    Field         | Bits            |  Description                                                                         |
    --------------| ------------    |  --------------------------------------                                              |
    offset        |  `0-31`         |  Offset                                                                              |

    ##### CELL_GCM_METHOD_DATA_TEXTURE_BORDER_FORMAT

    Field         | Bits            |  Description                                                                         |
    --------------| ------------    |  --------------------------------------                                              |
    pad           |  `0-7`          |  N/A                                                                                 |
    mipmap        |  `8-15`         |  N/A                                                                                 |
    format        |  `16-23`        |  N/A                                                                                 |
    dimension     |  `24-27`        |  CELL_GCM_TEXTURE_DIMENSION                                                          |
    border        |  `28`           |  CELL_GCM_TEXTURE_BORDER                                                             |
    cubemap       |  `29`           |  CELL_CGM_BOOL                                                                       |
    location      |  `30-31`        |  CELL_GCM_LOCATION                                                                   |

    ##### CELL_GCM_METHOD_DATA_TEXTURE_ADDRESS

    Field         | Bits            |  Description                                                                         |
    --------------| ------------    |  --------------------------------------                                              |
    zfunc         |  `0-3`          |  CELL_GCM_TEXTURE_ZFUNC_NEVER                                                        |
    gamma         |  `4-11`         |  N/A                                                                                 |
    wrap_r        |  `12-15`        |  CELL_GCM_TEXTURE_WRAP                                                               |
    unsignedRemap |  `16-19`        |  CELL_GCM_TEXTURE_UNSIGNED_REMAP                                                     |
    wrap_t        |  `20-23`        |  CELL_GCM_TEXTURE_WRAP                                                               |
    anisoBias     |  `24-27`        |  N/A                                                                                 |
    wrap_s        |  `28-31`        |  CELL_GCM_TEXTURE_WRAP                                                               |

    ##### CELL_GCM_METHOD_DATA_TEXTURE_CONTROL0_ALPHA_KILL

    Field         | Bits            |  Description                                                                         |
    --------------| ------------    |  --------------------------------------                                              |
    enable        |  `0`            |  CELL_GCM_FALSE                                                                      |
    minlod        |  `1-12`         |  N/A                                                                                 |
    minlod        |  `13-24`        |  N/A                                                                                 |
    maxAniso      |  `25-27`        |  CELL_GCM_TEXTURE_MAX_ANIS                                                           |
    pad           |  `28`           |  N/A                                                                                 |
    alphakill     |  `29`           |  CELL_GCM_FALSE                                                                      |
    pad           |  `30-31`        |  N/A                                                                                 |

    ##### CELL_GCM_METHOD_DATA_TEXTURE_CONTROL1

    Field         | Bits            |  Description                                                                         |
    --------------| ------------    |  --------------------------------------                                              |
    pad           |  `0-14`         |  N/A                                                                                 |
    remapOrder    |  `15`           |  CELL_GCM_TEXTURE_REMAP_ORDER                                                        |
    OutB          |  `16-17`        |  CELL_GCM_TEXTURE_REMAP                                                              |
    OutG          |  `18-19`        |  CELL_GCM_TEXTURE_REMAP                                                              |
    OutR          |  `20-21`        |  CELL_GCM_TEXTURE_REMAP                                                              |
    OutA          |  `22-23`        |  CELL_GCM_TEXTURE_REMAP                                                              |
    InB           |  `24-25`        |  CELL_GCM_TEXTURE_REMAP                                                              |
    InG           |  `26-27`        |  CELL_GCM_TEXTURE_REMAP                                                              |
    InR           |  `28-29`        |  CELL_GCM_TEXTURE_REMAP                                                              |
    InA           |  `30-31`        |  CELL_GCM_TEXTURE_REMAP                                                              |

    ##### CELL_GCM_METHOD_DATA_TEXTURE_CONTROL1

    Field         | Bits            |  Description                                                                         |
    --------------| ------------    |  --------------------------------------                                              |
    bs            |  `0`            |  CELL_GCM_FALSE                                                                      |
    gs            |  `1`            |  CELL_GCM_FALSE                                                                      |
    rs            |  `2`            |  CELL_GCM_FALSE                                                                      |
    qs            |  `3`            |  CELL_GCM_FALSE                                                                      |
    mag           |  `4-7`          |  CELL_GCM_TEXTURE_MAG                                                                |
    mag           |  `8-11`         |  CELL_GCM_TEXTURE_MIN                                                                |
    convultion    |  `12-14`        |  CELL_GCM_TEXTURE_CONVOLUTION                                                        |
    bias          |  `15-27`        |  N/A                                                                                 |

    ##### CELL_GCM_METHOD_DATA_TEXTURE_IMAGE_RECT

    Field         | Bits            |  Description                                                                         |
    --------------| ------------    |  --------------------------------------                                              |
    width         |  `0-15`         |  N/A                                                                                 |
    height        |  `16-31`        |  N/A                                                                                 |

    ##### CELL_GCM_METHOD_DATA_TEXTURE_BORDER_COLOR

    Field         | Bits            |  Description                                                                         |
    --------------| ------------    |  --------------------------------------                                              |
    borderColor   |  `0-31`         |  N/A                                                                                 |

    ##### CELL_GCM_METHOD_HEADER_TEXTURE_CONTROL3

    Field         | Bits            |  Description                                                                         |
    --------------| ------------    |  --------------------------------------                                              |
    num           |  `0-13`         |  Number                                                                              |
    method        |  `14-31`        |  Method                                                                              |

    ##### CELL_GCM_METHOD_DATA_TEXTURE_IMAGE_RECT

    Field         | Bits            |  Description                                                                         |
    --------------| ------------    |  --------------------------------------                                              |
    depth         |  `0-11`         |  N/A                                                                                 |
    pitch         |  `12-31`        |  N/A                                                                                 |

    ##### CELL_GCM_METHOD_HEADER_TEXTURE_CONTROL2

    Field         | Bits            |  Description                                                                         |
    --------------| ------------    |  --------------------------------------                                              |
    0x2D          |  `0-23`         |  0x2D                                                                                |
    aniso         |  `24`           |  CELL_GCM_TEXTURE_ANISO                                                              |
    iso           |  `25`           |  CELL_GCM_TEXTURE_ANISO                                                              |
    slope         |  `26-31`        |  N/A                                                                                 |

##### Remaining Values

Field                | Type       | Description                                                                         |
---------------      | ---------- | --------------------------------------                                              |
Unknown              | `Int`      | ?                                                                                   |
Unknown ID           | `UInt`     | ?                                                                                   |
Texture ID           | `UInt`     | Image ID. Used for models.                                                          |
Texture Name Pointer | `char*`    | Not used, optional. Just debug info.                                                |

### Image Info

Size: `0x20`

Field                   | Offset         | Type                      | Description                                                                         |
----------------        | ------------   | ----------                | --------------------------------------                                              |
Image Data Pointer      |  `0x00`        | `void*`                   | Pointer to the image data. This is empty if the data is from a side streamed file.  |
Image Data Size         |  `0x04`        | `void*`                   | Image data size. This is empty if the data is from a side streamed file.            |
Unknown                 |  `0x08`        | `byte`                    | ?                                                                                   |
Image Format            |  `0x09`        | `ImageFormat`             | Format of the image.                                                                |
Mipmap Count            |  `0x0A`        | `byte`                    | Number of mipmaps                                                                   |
Unknown                 |  `0x0B`        | `byte`                    | ?                                                                                   |
Image Width             |  `0x0C`        | `ushort`                  | Image Width.                                                                        |
Image Height            |  `0x0E`        | `ushort`                  | Image Height.                                                                       |
Unknown                 |  `0x10`        | `ushort`                  | Sometimes 1.                                                                        |
Unknown                 |  `0x12`        | `ushort`                  | ?                                                                                   |
Pad                     |  `0x14`        | `int`                     | N/A                                                                                 |
Stream Info             |  `0x18`        | `TextureStreamInfo*`      | Pointer to streamed image information. Optional.                                    |
Pad                     |  `0x1C`        | `int`                     | N/A                                                                                 |

#### Texture Stream Info

These represent a texture in a streamed file, which may host multiple mipmaps for each texture. They are compressed using the inflate algorithm.

!!! example
    `sky/sky.tex` streams textures from `sky/sky.texstream`. Course file packs may also link to a `.texstream` file.

Field                              | Offset         | Type           | Description                                                  |
----------------                   | ------------   | ----------     | --------------------------------------                                              |
Texture Stream Mipmap Info Pointer |  `0x00`        | `TextureStreamMipmapInfo*`        | Pointer to the image data. This is empty if the data is from a side streamed file.  |
Texture Stream Mipmap Info Count   |  `0x04`        | `Int`          | Image data size. This is empty if the data is from a side streamed file.            |
Unknown                            |  `0x08`        | `Int`          | ?                                                                                   |
Total Uncompressed Size            |  `0x0C`        | `Int`          | Uncompressed data for this texture and its mipmaps                                  |
Unknown                            |  `0x12`        | `ushort`       | Sometimes 1                                                                         |
Width                              |  `0x12`        | `ushort`       | Width of the texture                                                                |
Height                             |  `0x14`        | `ushort`       | Height of the texture                                                               |
Unknown                            |  `0x16`        | `ushort`       | Sometimes 1.                                                                        |
Pad                                |  `0x18`        | `byte[0x08]`   | N/A                                                                                 |

#### Texture Stream Mipmap Info

Size: `0x10`

Field                              | Offset         | Type           | Description                                                  |
----------------                   | ------------   | ----------     | --------------------------------------                                              |
Unknown                            |  `0x00`        | `Int`          | ?                                                                                   |
Stream Offset                      |  `0x04`        | `Int`          | Offset of the data in the compressed stream `.texstream`.                           |
Compressed Size                    |  `0x08`        | `Int`          | Compressed size of the image in the compressed stream                               |
Uncompressed size                  |  `0x0C`        | `Int`          | Uncompressed size of the image in the compressed stream                             |
