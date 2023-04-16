---
comments: true
---

# PS2 GT4 RoFS

The PS2 Volume is the first volume to under-go major changes to focus on file lookup speeds. It now uses a b-tree, and the headers are now encrypted.

---

## Fake and Real Table of Contents

The volume may appear based on the GT3 header, but it's incorrect, the volume **has a fake table of contents from GT3 at the beginning of it**. This is supposedly to throw off any curious person and crash existing GT3 VOL tools back in the day from extracting GT4 files.

The real ToC is located further in the actual file - addressed by a page number (`0x800` for each page)

* GT4: `0x2159`
* GT4 MX-5 Demo: `0x2159`
* GT4 First Preview: `0x2159`
* Tourist Trophy Demo: `0x2231`
* Tourist Trophy: `0x2231`
* GT4 Online: `0x22B7`

---

## Header

Size: `0x40`

Field                      | Offset         | Type                    | Description                                          |
----------------           | ------------   | ----------              | --------------------------------------               |
`AC B9 90 AD` or `RoFS`    |  `0x00`        | `UInt`                  | Magic, Enforced. Negated value = `RoFS`. If negated magic instead, volume is not encrypted |
Version Major              |  `0x04`        | `ushort`                | Should be `3`                                        |
Version Minor              |  `0x06`        | `ushort`                | Should be `1`                                        |
Compressed Toc Length      |  `0x08`        | `int`                   | Size of the compressed toc (inflate algorithm)       |
Total Page Count           |  `0x0C`        | `int`                   | Total pages taken by the header + toc to the data. `HeaderOffset + (Pages * Length)` = Data Start Offset |
Page Length                |  `0x10`        | `ushort`                | Size of one page. Should be 0x800                    |
ToC Page Count             |  `0x12`        | `ushort`                | Actual page count for the toc where entries are stored. |
Padding                    |  `0x14`        | `byte[0x2C]`            | N/A                                                  |
Page Offsets               |  `0x40`        | `int[Page Count + 1]`   | Page Offsets within compressed page - always plus one to account for the end, size one page is calculated with `(next - current)` |

## Page Offsets

Next are page offsets - they are encrypted.

=== "C# Snippet"

    ``` csharp
    public const int OffsetCryptKey = 0x14ac327a;

    public int GetEntryOffsetSecure(int pageIndex)
    {
        VolumeStream.Position = TocOffset + TocHeader.HeaderSize + (pageIndex * 4);
        return VolumeStream.ReadInt32() ^ pageIndex * Volume.OffsetCryptKey + Volume.OffsetCryptKey;
    }
    ```

### Page Encryption/Decompression

Each ToC page is compressed and encrypted (only if the magic is also encrypted). It's a really cheap encryption (the key is `0x55` which is equal to `0b1010101`, essentially just flipping every bit of the data).

=== "C# Snippet"

    ``` csharp
    public static readonly byte[] DataCryptKey = new byte[] { 0x55 };

    public static byte[] XorEncript(byte[] data, byte[] key) {
        byte[] buffer = new byte[data.Length];
        int index = 0;
        for (int i = 0; i < data.Length; i++) {
            if (index < key.Length) {
                index++;
            }
            else {
                index = 1;
            }
            buffer[i] = (byte)(data[i] ^ key[index - 1]);
        }
        return buffer;
    }
    ```

## Page

Pages may be an indexing page, or entry page. Nodes are **always ordered** for binary searching.

Field                      | Offset         | Type                    | Description                                          |
----------------           | ------------   | ----------              | --------------------------------------               |
IsIndexPage                |  `0x00`        | `short`                 | Whether this is an indexing page                     |
Entry Count                |  `0x02`        | `ushort`                | Number of entries in this page (should be divided by two) |
Next Page Index            |  `0x04`        | `int`                   | The index of the next page after this one            |
Previous Page Index        |  `0x08`        | `int`                   | The index of the previous page from this one         |

There is a ToC at the end of each page, read in reverse order. It contains the offset and length of each entry along with a terminator.

Structure as it would be difficult to document:
```c
struct
{
    int IndexEnd; // Final index/delimiter
    struct
    {
        short EntryMetaOffset; // From start of this page
        short EntryMetaLength; // int + string

        if (IsIndexingBlock)
            int BlockIndexForEntry;
        else
        {
            short EntryTypeMetaOffset; // From start of this page
            short EntryTypeMetaLength;
        }
    } TocBlockTableEntry[(EntryCount / 2)]; // Table is in reverse order
} TocEntryInfos; // Main TOC for this page, always at the bottom of each page in reverse order (for seeking purposes)
```

---

### Entry Pages

Entry pages store the information for each files that it holds, __nodes__.

Each node are uniquely identified by a *Node ID*. Information concerning each node such as file size, compressed file size, modified date, and their location in the volume are included. A new page starts once the total of nodes in the page exceeds one page length (`0x800` or the value in the header).

#### Nodes

Field                      | Type                    | Description                                               |
----------------           | ----------              | --------------------------------------                    |
Node Type                  | `byte`                  | Node Type. `0` = Directory, `1` = File, `2` = Compressed File  |

If directory:

* Node ID (`int`) - Only if this is a directory

If file:

* Page Offset (`int`) - Location of this file as page index
* Modified Date (`time_t`) - Modified date of the file
* Real Size (`int`) - Size of the file

If compressed file:

* Page Offset (`int`) - Location of this file as page index
* Modified Date (`time_t`) - Modified date of the file
* Compressed Size (`int`) - Compressed size of the file
* Real Size (`int`) - Size of the file

---

### Indexing Pages

Indexing pages are used for searching. They contain the node IDs concatenated by names of each node that separates an entry page from another - the names are cut to the first difference between the two nodes. Index pages may also be used to separate other index pages, in that case you would have a master index page linking to index pages which then links to entry pages. In theory the hierarchy's depth can be more than that (GT4FS will support only one master index page), but should be more than enough to cover thousands upon thousands of nodes until this becomes a problem.


    