## Understanding PDIPFS

[PDIPFS](../../formats/volume/ps3_volume.md) stands for Polyphony Digital Patch File System.

The Gran Turismo 5 & 6 and above uses a file system that allows editing existing files while keeping the actual original files intact. This allows for extremely easy modding and easy revert method.
It was created with ease of file updating in mind.

First off, the **disc** version of both games contain a `GT.VOL` file that is several gigabytes big, it contains all of the game's assets compressed and encrypted into one single file. This file is within the disc, and is essentially all the base content of the games without its updates.

The `PDIPFS` folder contains all the contents of the game updates, It is always located within the same game folder: `/dev_hdd0/game/<GAME_CODE>/PDIPFS/`

!!! warning "PSN Versions"
    On PSN versions, PDIPFS it will contain **all** the unified game contents, there is no `GT.VOL` file.

You might notice that the folder contains hundreds and thousands of randomly named two chars file names. They are obfuscated so that you cannot figure out what a file really is as-is.

---

## Unpacking the game files

You can unpack this file located in your game disc, and your whole `PDIPFS` to have a completely extracted game. It is recommended to have **both** extracted if applicable.

* Transfer `PDIPFS` and `GT.VOL` to your PC.

!!! tip "About transfering"
    You are recommended to do it through USB if possible, especially for the PDIPFS. If you are doing it through FTP, the connection may drop, so you may have to edit some settings on your FTP client:

    * Set simultaneous connections to 1
    * Set transfer type to Binary
    * Lower transfer speed by setting a limit. Setting it to full speed has high chances of dropping the connection.
* Download [GTToolsSharp](https://github.com/Nenkai/GTToolsSharp/releases), The .NET version specified and extract the zip file. Once that is done, open `cmd` in the folder where you've extracted it.
* Place your `PDIPFS` folder or `GT.VOL` file in that folder. 
* Run the tool as such:
```
GTToolsSharp unpack -i <PDIPFS/GT.VOL> -o <output_folder>
``` 
Where `output_folder` is the folder that the game files will be extracted to. 

* You will get a message that the key file to decrypt the files was not found and a default one was created. **Just run the command again**.
* It will take some time to extract everything.

---

## Packing

Assuming you've unpacked the game, you also need to know how to repack files. This is where the Patch File System shines.

As said previously, `PDIPFS` allows editing existing files while keeping the actual original files intact so that you can easily revert back to original.

You will need:

   * The tool above (see: Unpacking).
   * Your **non-extracted** `PDIPFS` folder
   * Your game files that you've edited in their **original** paths. For example: `MyMod/textdata/gt5/aspec_event/r100.xml`
   * (Recommended) a backup of the file `K/4D` in your `PDIPFS` folder. It can be used to easily revert to vanilla.

!!! note "Packing Example"

    Let's say you wanted to update tsukuba's course logo, your folder structure should be looking like this
    ```{ .sh .no-copy }
    .
    ├─ MyMod/ # Always preserve game paths
    │  └─ piece/
    │     └─ gt6/
    │        └─ course_logo_L/
    │           └─ tsukuba.img # Your modded file
    │
    ├─ PDIPFS # (the original!)
    ├─ GTToolsSharp.exe
    ...
    ```
    You would then run this command:
    ```
    GTToolsSharp pack -i PDIPFS -p MyMod -o MyModPacked
    ```

!!! warning "Warning"
    You should never be repacking the whole entire game's contents to edit one single file!

Once that is done, your mod ready to be transfered to your console will be at `MyModPacked` folder or whatever you've specified.

If you wish to revert your mod simply transfer your backed up `K/4D` file into your console's game folder PDIPFS.

---

## Removing Files from the Game

Sometimes you might want to remove files from the game completely so that the game doesn't read them. GTToolsSharp supports this use case.

In your mod's main folder next to GTToolsSharp, create a file named `files_to_remove.txt`. Each line has to be a path of a game path to remove. 

If you wanted to remove `textdata/gt5/aspec_event/r100.xml` from the game, you would just put it there as one line:

``` markdown title="Sample file"
textdata/gt5/aspec_event/r100.xml
```

---

## Technical Details about PDIPFS (Advanced/Technical)
*From [GTToolsSharp's Readme](https://github.com/Nenkai/GTToolsSharp#advanced-packing-notes-modders-read)*

Important things to know

* *Main Volume Header File* - **Always** `PDIPFS/K/4D`
* Table of Contents file (*TOC*) which contains all of file entries (each having an *entry number*) that indicates where an original file is located in the scrambled PDIPFS - location of TOC determined by the master file.
* The *entry number* is used to determine the PDIPFS scrambled path.

Files packed as new with means that new entries numbers are appended to last one in *TOC* which are the same original paths, but with new entry numbers thus new files are generated, and the older file entries used for these paths are unused. That means that upon packing, new scrambled file names are generated, and do not interfere with any of the other original game files. The only file that is edited is the *Main Volume Header File* which is always located at `PDIPFS/K/4D`.

The advantage of doing this is that players of your mods only have to backup this one file when applying your mods instead of all the files which would overwrite. To revert, players can simply revert their original `PDIPFS/K/4D` file. You can provide the original `PDIPFS/K/4D` file inside your mod as a way for them to revert if they did not back it up.

If you want to use an existing mod as a base mod use the base mod's `PDIPFS` since it will contain the newer files, TOC, and header.

* First pack: `GTToolsSharp pack -i PDIPFS -p MyModdedFiles -o PDIPFS_MOD`
* Next packs: `GTToolsSharp pack -i PDIPFS_MOD -p MyModdedFiles -o PDIPFS_MOD2 (for a new folder again)`

Unless you are using a mod as base (and don't have the source files of the mod), keep it one packing only, from your original PDIPFS to your final pack folder.

If you would like your mod to actually overwrite *TOC* entries and original files, use `--pack-as-overwrite`.
