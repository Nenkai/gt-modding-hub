---
comments: true
icon: material/database-search
---

# :material-database-search: PS3 Volume/PDIPFS
:octicons-cpu-24: *Applies to: GT5, GT6* · :material-file-question: Extension: `.VOL` · :octicons-arrow-left-16: Endian: Big

The PS3 Volume is made with patching/updates in mind. It has also fast lookup times as it uses [b-trees](https://en.wikipedia.org/wiki/B-tree) where names and extensions are split. The TOC is tightly bit-packed and ordered for [binary searching](https://en.wikipedia.org/wiki/Binary_search_algorithm), while also reusing the index pages for quick searching that the GT4 volume introduced.

The file system *may* be split into two PFS components - the **volume**, which houses all the game base data into one big PFS container, and PDIPFS which can act as an overlay on top of the volume. **One or the other may exist**.

!!! example
	
	* GT5 1.00 only has a volume container, as it does not have update content.
	* GT5 >1.00 has a volume container, and PDIPFS which contains update content. The PDIPFS overrides the volume's ToC, but may use file data out of the volume still.
	* GT6 PSN only has a PDIPFS. A volume is not necessary in this case.


---

## PDIPFS Path Scrambling

PDIPFS scrambled path names are generated using an unique number, an index.

<label>Input Seed: </label>
<input type="number" id="seed" name="seed" required min="0" maxlength="8" size="10" style="border-color; color:black;" onchange="onChangeFunction()"/>
<label name="pdipfs-path" id="pdipfs-path"> - Path: N/A</label>

<script>
function onChangeFunction()
{
    document.getElementById("pdipfs-path").innerHTML = "- Path: " + GetPathFromSeed(document.getElementById("seed").value);
}

var Charset = "K59W4S6H7DOVJPERUQMT8BAIC2YLG30Z1FNX";

function GetPathFromSeed(seed, oldStyle = false)
{
    var t = "";
    if (seed < 0x400)
    {
    	t += 'K';
    	var s = XorShift(0x499, 10, seed);
    	t += GetSubPathName(s, 2, oldStyle);
    }
    else if (seed - 0x400 < 0x8000)
    {
    	t += '5';
    	var s = XorShift(0x8891, 15, seed - 0x400);
    	t += GetSubPathName(s, 3, oldStyle);
    }
    else if (seed - 0x8400 < 0x100000)
    {
    	t += '9';
    	var s = XorShift(0x111889, 20, seed - 0x8400);
    	t += GetSubPathName(s, 4, oldStyle);
    }
    else if (seed - 0x108400 < 0x2000000)
    {
    	t += 'W';
    	var s = XorShift(0x2242211, 25, seed - 0x108400);
    	t += GetSubPathName(s, 5, oldStyle);
    }
    else if (seed + 0xfdf7c00 >= 0)
    {
    	t += '4';
    	var s = XorShift(0x8889111, 32, seed + 0xFDEFC00);
    	t += GetSubPathName(s, 6, oldStyle);
    }
    return t;
}

function XorShift(x, rounds, startingValue)
{
	for (var i = 0; i < rounds; i++)
	{
		startingValue <<= 1;
		var hasUpperBit = (1 << rounds & startingValue) != 0;
		if (hasUpperBit)
			startingValue ^= x;
	}

	return startingValue;
}

function GetSubPathName(seed, subpathLength, oldStyle)
{
	var pathName = "";

	// Max 16 chars
	var chars = new Array(subpathLength.length);

	if (subpathLength != 0)
	{
		for (var i = 0; i < subpathLength; i++)
		{
			var c = Charset[(seed % 36) | 0];
			seed = (seed / 36) | 0;
			chars[i] = c;
		}

		if (oldStyle) // GT5P Demo
		{
			// 1 letter per folder
			for (var pos = subpathLength - 1; pos >= 0; pos--)
			{
				pathName += '/';
				pathName += chars[pos];
			}
		}
		else
		{
			// 2 letters per folder
			var pos = subpathLength - 1;
			if (subpathLength % 2 == 0)
			{
				pathName += '/';
				pathName += chars[pos];
				pos--;
			}

			while (true)
			{
				pathName += chars[pos];
				if (pos == 0)
					break;
				pathName += '/';
				pathName += chars[pos - 1];
				pos -= 2;
			}
		}
	}

	return pathName;
}
</script>

??? note "Algorithm for generating a path from a number"

    `oldStyle` is used for GT5P volumes.

    === "C#"

        ``` csharp

        private const string Charset = "K59W4S6H7DOVJPERUQMT8BAIC2YLG30Z1FNX";

        public static string GetPathFromSeed(uint seed, bool oldStyle = false)
		{
			string t = string.Empty;
			if (seed < 0x400)
			{
				t += 'K';
				uint s = XorShift(0x499, 10, seed);
				t += GetSubPathName(s, 2, oldStyle);
			}
			else if (seed - 0x400 < 0x8000)
			{
				t += '5';
				uint s = XorShift(0x8891, 15, seed - 0x400);
				t += GetSubPathName(s, 3, oldStyle);
			}
			else if (seed - 0x8400 < 0x100000)
			{
				t += '9';
				uint s = XorShift(0x111889, 20, seed - 0x8400);
				t += GetSubPathName(s, 4, oldStyle);
			}
			else if (seed - 0x108400 < 0x2000000)
			{
				t += 'W';
				uint s = XorShift(0x2242211, 25, seed - 0x108400);
				t += GetSubPathName(s, 5, oldStyle);
			}
			else if (seed + 0xfdf7c00 >= 0)
			{
				t += '4';
				uint s = XorShift(0x8889111, 32, seed + 0xFDEFC00);
				t += GetSubPathName(s, 6, oldStyle);
			}


			return t;
		}

		private static uint XorShift(uint x, int rounds, uint startingValue)
		{
			for (int i = 0; i < rounds; i++)
			{
				startingValue <<= 1;
				bool hasUpperBit = (1 << (int)rounds & startingValue) != 0;
				if (hasUpperBit)
					startingValue ^= x;
			}

			return startingValue;
		}


		private static string GetSubPathName(uint seed, int subpathLength, bool oldStyle)
		{
			string pathName = string.Empty;

			// Max 16 chars
			char[] chars = new char[subpathLength];

			if (subpathLength != 0)
			{
				for (int i = 0; i < subpathLength; i++)
				{
					char c = Charset[(int)(seed % 36)];
					seed /= 36;
					chars[i] = c;
				}

				if (oldStyle) // GT5P Demo
				{
					// 1 letter per folder
					for (int pos = subpathLength - 1; pos >= 0; pos--)
					{
						pathName += '/';
						pathName += chars[pos];
					}
				}
				else
				{
					// 2 letters per folder
					int pos = subpathLength - 1;
					if (subpathLength % 2 == 0)
					{
						pathName += '/';
						pathName += chars[pos];
						pos--;
					}

					while (true)
					{
						pathName += chars[pos];
						if (pos == 0)
							break;
						pathName += '/';
						pathName += chars[pos - 1];
						pos -= 2;
					}
				}
			}

			return pathName;
		}
        ```

---

## Header

The header is expected to be encrypted. It is decrypted using an index, and the volume keyset (seed/key) which is normally located in the executable boot parameters. [Encryption Routine](https://github.com/Nenkai/GTToolsSharp/blob/9000ed0815650e98a7959a6028565aefc66a2aeb/GTToolsSharp/Volumes/GTVolumePFS.cs#L205)

The index for the header is always `1`, which translates to `K/4D`, if reading from PDIPFS and not a volume. Otherwise it is at the very beginning of `GT.VOL`.

Size: `0x20`

Field                | Offset         | Type        | Description                                          |
----------------     | ------------   | ----------  | --------------------------------------               |
`5B 74 51 62`        |  `0x00`        | `UInt`      | Magic, (Enforced, can not be different)              |
TOC Node Index       |  `0x04`        | `Int`       | Node Index of the Table of Contents (for PDIPFS)     |
Compressed TOC Size  |  `0x08`        | `Int`       | Compressed size of the TOC or TOC file (if PDIPFS)   |
Uncompressed TOC Size|  `0x0c`        | `Int`       | Uncompressed size of the TOC or TOC file (if PDIPFS) |
Serial Number        |  `0x10`        | `ULong`     | Unique serial number of the volume based on time     |
Total Volume Size    |  `0x18`        | `ULong`     | Complete size of the volume                          |
TitleID/Description  |  `0x20`        | `char[0x80]`| Description, not used                                |

---

## Table of Contents

Once the header has been decrypted, the ToC (table of contents) is expected to be encrypted (if the game has registered a keyset, which by default the games do). Node index is then used to decrypt the ToC contents. The TOC is also expected to be compressed (inflate) after that.

The TOC is read from the first sector of the volume (`0x800`) or a path derived from the index from the header (if PDIPFS).

Field                      | Offset         | Type                    | Description                                          |
----------------           | ------------   | ----------              | --------------------------------------               |
`5B 74 51 6E`              |  `0x00`        | `UInt`                  | Magic, (Enforced, can not be different)              |
Name BTree Pointer         |  `0x04`        | `BTree<StringNode>*`    | BTree for all the file names                         |
Extensions BTree Pointer   |  `0x08`        | `BTree<StringNode>*`    | BTree for all the file extensions                    |
Node BTree Pointer         |  `0x0C`        | `BTree<FileInfoNode>*`  | BTree for all the files in the volume                |
Directory BTree Count      |  `0x10`        | `Int`                   | Number of btrees for each folder                     |
Directory BTree Pointers   |  `0x14`        | `BTree<FileNode>**`     | Pointers to each BTree for each folder in the volume |

---

## BTrees

BTrees occur immediately after the TOC's header.

### BTree Header

Size: `0x06`

The header fits within a page.

Field                      | Offset         | Type                | Description                                           |
----------------           | ------------   | ----------          | --------------------------------------                |
Index Page Count           |  `0x00`        | `byte`              | Number of pages used to index pages containing entries|
Name BTree Pointer         |  `0x01`        | `Int24`             | Offset to the index block. If there is no index block, this will just point to the start of the entries for this page, which should be `0x06` |
Page Count                 |  `0x04`        | `short`             | Number of pages containing nodes                      |
First Page data            |  `0x06`        | `...`               | Contents of the first page                            |

### BTree Page

Pages fits within `0x1000`. A new one starts once the entries go past that.

This is bit-packed.

Field                      | Bit Offset      | Description                                           |
----------------           | ------------    | --------------------------------------                |
Has Nodes                  | `0 (1 bit)`     | Whether this page contains nodes                      |
Page Node Count            | `1-10 (11 bits)`| Number of nodes in this page                          |
Node Data Offsets          | `Each 11 bits`  | Offset to node data, relative to start of this page   |
Node Data                  | `...`           | Node Data (until last one for this page that fits the page) |
Offset to next page        | `12 bits`       | Relative to the start of the page                     |

#### String Node

Node that represents a string.

Field                      | Bit Offset      | Description                                           |
----------------           | ------------    | --------------------------------------                |
String Value               | `VarIntString`  | String Value, prefixed by a 7bit variable int         |

For reading var ints:

=== "C#"

    ``` csharp
    
    public ulong ReadVarInt()
    {
        ulong value = ReadByte();
        ulong mask = 0x80;

        while ((value & mask) != 0)
        {
            value = ((value - mask) << 8) | (ReadByte());
            mask <<= 7;
        }

        return value;
    }
    ```

#### File Node

Node that represents a file, which points to an extension, name and file info node.

Field                      | Bit Offset      | Description                                           |
----------------           | ------------    | --------------------------------------                |
Flags                      | `byte`          | Node flags (`1` = Directory, `2` = File)              |
Name Index                 | `VarInt`        | File Name node index this entry points to             |
Extension Index            | `VarInt`        | Extension node index this entry points to             |
File Info                  | `VarInt`        | File info node index this entry points to             |

#### File Info Node

Represents a file data node.

Field                      | Bit Offset      | Description                                           |
----------------           | ------------    | --------------------------------------                |
Flags                      | `byte`          | Node flags (`0` = Uncompressed, `1` = Compressed, `2` = Custom Salsa Crypt (GT5P))     |
Node Index                 | `VarInt`        | Node index for this file                                                               |
Compressed Size or Size    | `VarInt`        | Compressed size (if compressed) or just size - compression algorithm is inflate.       |
Uncompressed Size          | `VarInt`        | If compressed only                                                                     |
Sector Index               | `VarInt`        | Sector offset to the start of data (multiply by `0x800` for actual offset)             |

!!! note
    Sector Index doesn't really matter if PDIPFS. The path location is simply derived from the node index scrambled.

    Otherwise, the sector index in the volume is relative to (`0x800` + TOC's Compressed Size) aligned to the nearest `0x800`.

    The file is encrypted using the node index aswell.
