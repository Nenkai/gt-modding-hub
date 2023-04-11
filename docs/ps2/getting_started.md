# Getting Started

## Requirements

* Understanding how [Command Prompt / `cmd`](https://www.makeuseof.com/tag/a-beginners-guide-to-the-windows-command-line/) works and opening it in a folder.
* Windows
* Preferably [PCSX2](https://pcsx2.net/)
* [GT4FS](https://github.com/Razer2015/GT4FS)

!!! warning
    It is recommend to mod Gran Turismo 4 Online Public Beta as opposed to retail, as retail uses dual-layer discs which cannot be built easily.

---

## Extracting the game

All PS2's GTs are no exception to the [volume system](../concepts/volume.md), you will need to extract it in order to gain access to game contents.

If you haven't already, extract the `.iso` file using [7-Zip](https://www.7-zip.org/) or by any other means. You should be able to see a `GT4.VOL` file.

Using `GT4FS`, extract the volume file as such

``` markdown title="Extracting GT4.VOL"
GT4FS extract -r GT4.VOL
```

This may take some time, but once that is done, you should be able to see a new `extracted` folder that follows [this file structure](file_structure.md).

---

## Packing a volume

Assuming you've made an edit, you can now proceed to repack a volume. There are two ways which will be described below, the first one being the more convenient one.

### Method 1 - Appending to the volume

You can "pack" a new volume using your new content, by appending your existing volume. This avoid having to wait to pack the entire game's content just for a few files.

You would need to create a new folder with the edited files, **while preserving the original paths**. An example:

!!! example "Packing Example"

    ```{ .sh .no-copy }
    .
    ├─ MyMod/ # Always preserve game paths
    │  └─ rtext/
    │     └─ US.rt2
    │
    ├─ GT4.VOL
    ├─ GT4FS.exe
    ...
    ```

Using `GT4FS`, you would then run the following command:

```markdown title="Appending to the Volume"
GT4FS --read GT4.VOL --append MyMod
```

!!! warning
    __Make a backup__ of your original volume file. It will be edited.

---

### Method 2 - Building a brand new volume

This is the slow method, building an entirely new volume from an extracted folder.

Using `GT4FS`, you can run the following command to build a volume from a game directory:

```markdown title="Appending to the Volume"
GT4FS --read <path to extracted volume with edited contents> --output MyNewVolume.VOL
```

---

## Building an ISO

!!! warning
    This part does not cover building GT4 retail yet, only GT4O.

This is the annoying part as of writing this, for every change an ISO needs to be built. It is therefore recommended to do this on an SSD to speed up the process.

As stated earlier, it is best done on GT4 Online Test Version, as not only it is one-layered, it is also twice as small (2.59 GB vs 5.57 GB).

### Requirements

* [ISO Tools](../tools/ISO_Tools.zip), for building ISOs - Should include `cdvd2iml5.30`, `ISOLayerMerge`.
    * Install `cdvd2iml5.30`. This is the tool you will be using to build ISOs.
* `cdvdgen_20` - You'll have to find that on your own. Hint: [archive.org](https://archive.org/) -> "PS2 SDKs", "Show All" look for `CD_DVD-rom Generator ver2.0`.
    * Once you have the zip, extract it, and also download [UniExtract](https://github.com/Bioruebe/UniExtract2). It is required to extract the cdvdgen setup, as the setup file breaks on modern windows.
    * Extract `data1.cab` with it. You can delete UniExtract afterwards.

---

### Building an IML
First, open `cdvdgen.exe` (in the `data1/Program_Executable_Files` folder). Create a new project, Select `DVD-ROM Master Disc`, and drag files to it with the following layout:

```markdown title="File order"
SYSTEM.CNF     # System Configuration file
SCUS_974.36    # Bootstrap executable, may differ per game!
CORE.GT4       # Main game executable, always after bootstrap executable
DNAS310.IMG    # Only if present, GT4 Online versions
IRX            # Folder
NET            # Folder
EPSON          # Folder, optional unless you're.. printing
GT4.VOL        # Always last!
```

In the `Volume` tab on the top left, fill `Disc Name` with the proper game code, i.e `SCUS-97436` for GT4 Online. Fill the rest with whatever you want.

In `File`, press `Export iml file`.

!!! note 
    You will have to remove and add GT4.VOL to the project everytime you've rebuilt it, and export an IML again aswell.

!!! tip 
    You should also save the project, to get set up more quickly on the next times.

---

### Actually building the ISO

Open `cdvd iml2iso` and open the newly created IML file with it. 

Press `iml2iso` and iso creation should start. It takes one minute or so with GT4 Online on an HDD.

Congratulations! You now have an ISO ready to go.