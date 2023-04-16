---
comments: true
---

# NVEC
:octicons-cpu-24: *Applies to: GT5, GT6* · :material-file-question: Extension: `.vec` · :octicons-arrow-left-16: Endian: Big

NVEC is a font format converted from `.ttf`, friendly for the PS3 and rendered through SPUs. It uses `UTF-16`.

!!! note
    NVEC files are also present in PS4 GTs, but they are not read nor can be used.


---

## Header

Size: `0x20`

Field                      | Offset         | Type                | Description                                                                      |
----------------           | ------------   | ----------          | --------------------------------------                                           |
`NVEC`                     |  `0x00`        | `Int`               | Magic, (Not enforced, can be different)                                          |
Unknown                    |  `0x04`        | `byte`              | Unknown byte. It is not read.                                                    |
Unknown                    |  `0x05`        | `byte`              | Unknown byte. It is not read.                                                    |
Unknown                    |  `0x06`        | `byte`              | Unknown byte. It is not read.                                                    |
Unknown                    |  `0x07`        | `byte`              | Unknown byte. It is not read.                                                    |
Character Count            |  `0x08`        | `short`             | Number of UTF-16 characters this font defines.                                   |
Unknown                    |  `0x0A`        | `short`             | Unknown byte. It is not read.                                                    |
Unknown                    |  `0x0C`        | `short`             | Unknown byte. It is not read.                                                    |
Empty                      |  `0x0E`        | `short`             | N/A.                                                                             |
UTF-16 Char Table  Pointer |  `0x10`        | `wchar_t*`          | Offset to the table of UTF-16 characters.                                        |
Glyph Info Table Pointer   |  `0x14`        | `GlyphInfo*`        | Offset to the table of glyph infos.                                              |
Glyph Data Pointer         |  `0x18`        | `byte*`             | Offset to the start of the encoded glyph data.                                   |
Unknown CVS Pointer        |  `0x1C`        | `byte*`             | Unknown. This is its own file with the `.cvs` extension in older GT5 builds. Always `0x2284` in size.    |

### Glyph Info

Size: `0x14`

Field                      | Offset         | Type                | Description                                                                      |
----------------           | ------------   | ----------          | --------------------------------------                                           |
Char                       |  `0x00`        | `wchar_t`           | UTF-16 character for this glyph.                                                 |
Flags                      |  `0x02`        | `ushort`            | Appears unused.                                                                  |
Position Bits              |  `0x04`        | `uint`              | Offset bits. `0-10`: Unknown, `11-21`: XOffset, `22-31`: YOffset.                |
Data Length                |  `0x08`        | `int`               | Length of the glyph data.                                                        |
Width/Height Bits          |  `0x0C`        | `int`               | `0-11`: Width, `12-23`: Height Offset, `24-31`: Stride count (0x10 each)         |
Height Offset              |  `0x0E`        | `short`             | Height offset of the glyph.                                                      |
Data Offset                |  `0x10`        | `int`               | Data offset. It is relative to the data pointer in the header.                   |

### Glyph Data

It is bit-packed, here is a sample on how to read it (snippet from [PDTools.Files](https://github.com/Nenkai/PDTools/blob/master/PDTools.Files/Fonts/GlyphShapes.cs))

=== "C#"

    ``` csharp
    
     public static GlyphShapes Read(BinaryStream bs, int size)
    {
        var data = new GlyphShapes();
        byte[] bytes = bs.ReadBytes(size);
        BitStream bitStream = new BitStream(BitStreamMode.Read, bytes);

        ulong xMinBits = bitStream.ReadBits(12);
        data.XMin = BitValueToFloat((long)xMinBits, 12);

        ulong yMinBits = bitStream.ReadBits(12);
        data.YMin = BitValueToFloat((long)yMinBits, 12);

        while (true)
        {
            int flags = (int)bitStream.ReadBits(6);
            if (flags == 0)
                break;

            if ((flags & 0x20) != 0)
            {
                int elemSize = (flags & 0x0F) + 2;
                if ((flags & 0x10) != 0)
                {
                    bool isPoint = bitStream.ReadBoolBit();
                    if (isPoint)
                    {
                        GlyphPoint point = new GlyphPoint();

                        int x = (int)bitStream.ReadBits(elemSize);
                        point.X = BitValueToFloat(x, elemSize);

                        int y = (int)bitStream.ReadBits(elemSize);
                        point.Y = BitValueToFloat(y, elemSize);

                        data.Data.Add(point);
                    }
                    else
                    {
                        GlyphLine line = new GlyphLine();

                        line.Axis = bitStream.ReadBoolBit() ? GlyphAxis.Y : GlyphAxis.X;
                        int dist = (int)bitStream.ReadBits(elemSize);
                        line.Distance = BitValueToFloat(dist, elemSize);

                        data.Data.Add(line);

                    }
                }
                else
                {
                    GlyphQuadraticBezierCurve curve = new GlyphQuadraticBezierCurve();
                    int x1 = (int)bitStream.ReadBits(elemSize);
                    curve.P1_DistX = BitValueToFloat(x1, elemSize);

                    int y1 = (int)bitStream.ReadBits(elemSize);
                    curve.P1_DistY = BitValueToFloat(y1, elemSize);

                    int x2 = (int)bitStream.ReadBits(elemSize);
                    curve.P2_DistX = BitValueToFloat(x2, elemSize);

                    int y2 = (int)bitStream.ReadBits(elemSize);
                    curve.P2_DistY = BitValueToFloat(y2, elemSize);

                    data.Data.Add(curve);
                }
            }
            else if ((flags & 0x01) != 0)
            {
                GlyphStartPoint startPoint = new GlyphStartPoint();

                int elemSize = (int)bitStream.ReadBits(5);
                int x = (int)bitStream.ReadBits(elemSize);
                startPoint.X = BitValueToFloat(x, elemSize);

                int y = (int)bitStream.ReadBits(elemSize);
                startPoint.Y = BitValueToFloat(y, elemSize);

                if ((flags & 0x02) != 0)
                    startPoint.Unk = bitStream.ReadBoolBit();

                if ((flags & 0x04) != 0)
                    startPoint.Unk2 = bitStream.ReadBoolBit();

                data.Data.Add(startPoint);
            }
        }

        return data;

    }
    ```

