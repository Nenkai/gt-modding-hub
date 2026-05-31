---
icon: material/disc
---

# :material-disc: ISO Extraction/Building

## Requirements

* [mkps2iso](https://github.com/N4gtan/mkps2iso/releases/)

## :material-database-export-outline: Extraction

* Download and extract `mkps2iso` for your platform.
* Run the following command using a command prompt/terminal:

```
dumps2iso <path to .iso file>
```

Replace `<path to .iso file>` with the actual iso file path (you can also drag and drop a file on windows).

**This command will extract all the iso contents into a folder aswell as create an `.xml` file that you will be using for rebuilding.**

## :material-database-import: Building

To go the other way around, run the following command

```
mkps2iso <path to .xml file>
```

Replace `<path to .xml file>` with the path created by `dumps2iso` earlier.

!!! note
    The `.xml` file contains the disc layout for the iso. Upon rebuild, the lbas (where files go) are automatically recalculated, you do not need to worry about adding or resizing new files. Just make sure they are present.

    If you want to remove or add a new file however, you may want to at least add them to the `.xml` file.