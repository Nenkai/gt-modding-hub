*These pages cover various file formats used throughout the games. It is still under progress.*

# Abstract

Most file formats in Gran Turismo are proprietary and if not, will use platform provided formats. This is especially the case for games older than Gran Turismo 5. 

The following pages are essentially a human readable mirror of [the 010 templates for 010 Editor](https://github.com/Nenkai/GT-File-Specifications-Documentation/tree/master/Formats) for each format described - which is still recommended to easily visualize game files.

---

## Similarities between formats

GT formats make heavy use of offsets - usually in an ordered way.

### Magics

It's no surprise that most files uses proprietary [magic numbers](https://en.wikipedia.org/wiki/File_format#Magic_number). Sometimes there is no magic at all.

### Mapping

When a file is opened, the buffer that serves for reading the file is often the structure itself that stays in memory. Offsets are therefore rewritten into memory addresses to each part of the structure. They call this process *mapping*. It is similar to [pointer swizzling](https://en.wikipedia.org/wiki/Pointer_swizzling).

This process happens immediately after the file was opened, for each single structure containing offsets. 

!!! tip
    Finding the function handling mapping for each format greatly helps narrowing down the structure.

!!! note
    In some cases the magic itself is changed, for instance, [`TXS3`](../formats/texture/img_txs3_textureset3.md) becomes `tXS3` once loaded.
    
### Relocation

Most formats will have an empty field of zeros (and sometimes a file size) right after the [magic](https://en.wikipedia.org/wiki/File_format#Magic_number) - this field is usually used to "relocate" the structure - the pointer to the same file will be put there. Its purpose is unknown.

### Versioning

Versioned files usually contain a major, and minor version. Normally `ushort`, but can differ.

### PS4-era formats with floats

Floats can be vector encoded (with pack/unpack intrinsics) in PS4 GT's formats.