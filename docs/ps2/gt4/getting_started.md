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

All PS2 GT titles use the [volume system](../concepts/volume.md), which will need to be extracted in order to gain access to game contents.

If you haven't already, extract the `.iso` file using [7-Zip](https://www.7-zip.org/) or by any other means. You should be able to see a `GT4.VOL` file.

Using `GT4FS`, extract the volume file as such

``` markdown title="Extracting GT4.VOL"
GT4FS extract -r GT4.VOL
```

This may take a while, but when complete, you should be able to see a new `extracted` folder that follows [this file structure](file_structure.md).

---

## Setting up HostFS (recommended method)

HostFS is a feature normally available on PS2 devkits which allows loading files loose without a volume file. This avoids the need of normally creating a new volume file and ISO file for every change you want to make.

PCSX2 supports HostFS, but games needs to have explicit support for it.

As of 30/09/2023 it is possible to patch GT4 to implement and use HostFS thanks to Nenkai.

### Requirements

* [GT4Hook.elf](https://github.com/Nenkai/GT4Hooks/releases)
* [PS2 Plugin Injector](https://github.com/ermaccer/ps2plugininjector/releases)
* [PDTools.GT4ElfBuilderTool](https://github.com/Nenkai/PDTools/releases)

!!! tip
    Ensure that you have the volume extracted into a `VOL_extract` folder, next to the ISO file before starting this section.

### Creating a patched executable
First, use PDTools.GT4ElfBuilderTool to decrypt and decompress [CORE.GT4](../executables.md) into its own game executable.

``` markdown title="Converting CORE.GT4"
PDTools.GT4ElfBuilderTool.exe CORE.GT4 BASE_SCUS_974.36
```

Then, use PS2 Plugin Injector to inject `GT4Hook.elf` into the game executable as such:

``` markdown title="Injecting GT4Hook.elf"
ps2plugininjector.exe -i GT4Hook.elf -o SCUS_974.36.elf BASE_SCUS_974.36
```

You should now have a file named `SCUS_974.36.elf`. Make sure that it sits next to the main game ISO.

### Setting up PCSX2

#### QT PCSX2

1. Add search directory to the ELF file
2. Actually rename the elf file to have the elf extension to show up i.e SCUS_974.36.elf
3. Right click on the elf entry, properties
4. Summary -> Disc Path -> Browse -> Select ISO file
5. Emulation -> Tick "Enable Host Filesystem"

#### Non-QT PCSX2

Select your ISO file

* CDVD -> ISO Selector -> ...

Then, boot through the ELF file (important!)

* System -> Run ELF... -> SCUS_974.36 (example)

If the game boots, you are good to go and can begin editing files.

!!! warning

    Almost every file should now be available to edit loose, but there are exceptions; you can not edit streamed files such as:

    * `pss` files (videos)
    * `es` files
    * `sqt` files
    * `ins` files
    * `ads` files
    * Anything in `carsound`

    These sound/movie files needs to be streamed from the [PS2 IOP](https://www.retroreversing.com/irx-ps2), they will be specifically loaded from the volume still. Build a volume if you need to edit any.

    Additionally, the [SpecDB](../../concepts/specdb.md) is fully loaded at boot, you will need to restart if you are making any changes there.

---

## Packing a volume

!!! note
    Only use the following sections if you are not using HostFS, if you're making sound modifications, or publishing a mod.

After making edits to game files, you'll need to repack the volume. There are two ways described below, the first being the most convenient.

### Method 1 - Appending to the volume

You can "pack" a new volume containing your new content by appending the changes to your existing volume. This avoids having to wait for a full VOL build for what may only be a few changed files.

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
GT4FS pack-append --read GT4.VOL --append MyMod
```

!!! warning
    __Make a backup__ of your original volume file. It will be edited.

---

### Method 2 - Building a brand new volume

This is the slow method, building an entirely new volume from an extracted folder.

Using `GT4FS`, you can run the following command to build a volume from a game directory:

```markdown title="Building a brand new volume"
GT4FS pack --read <path to extracted volume with edited contents> --output MyNewVolume.VOL
```

---

## Building an ISO

!!! note
    This part covers games that uses one disc layer such as GT4 Online. For building dual-layer isos, use this section then refer to the next section.

For every change to the VOL, the ISO needs to be built. As this can be a lengthy process, building ISOs on a SSD is highly recommended.

As mentioned previously, GT4 Online Test Version is the best candidate for ISO rebuilding, as it is a single-layer disc and is significantly smaller than a retail copy (2.59 GB vs 5.57 GB).

Two methods are provided:

* [`CDVDGen`](#cdvdgen-slow-method) (Slow Method)
* [`UltraISO`](#ultraiso-fast-method) (Fast Method)

---

### CDVDGen (Slow Method)
#### Requirements

* [ISO Tools](../../tools/ISO_Tools.zip), for building ISOs - Should include `cdvd2iml5.30`, `ISOLayerMerge`.
    * Install `cdvd2iml5.30`. This is the tool you will be using to build ISOs.
* `cdvdgen_20` - Cannot be linked directly here. Hint: [archive.org](https://archive.org/) -> "PS2 SDKs", "Show All" look for `CD_DVD-rom Generator ver2.0`.
    * Once you have the zip, extract it, and also download [UniExtract](https://github.com/Bioruebe/UniExtract2). It is required to extract the cdvdgen setup, as the setup file breaks on modern windows.
    * Extract `data1.cab` with it. You can delete UniExtract afterwards.

#### Building an IML
First, open `cdvdgen.exe` (in the `data1/Program_Executable_Files` folder). Create a new project, select `DVD-ROM Master Disc`, and drag the game's files onto it with the following layout:

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

In the `Volume` tab on the top left, set `Disc Name` to the proper game code, i.e `SCUS-97436` for GT4 Online. Fill the rest with whatever you want.

In `File`, press `Export iml file`.

!!! note 
    You will have to remove/re-add GT4.VOL to the project and export an IML each time to rebuild the disc.

!!! tip 
    You should also save the project to speed up future rebuilds.

#### Actually building the ISO

Open `cdvd iml2iso` and open the newly created IML file with it. 

Press `iml2iso` and iso creation should start. It takes one minute or so with GT4 Online on a HDD.

Congratulations! You now have an ISO ready to go.

---

### UltraISO (Fast Method)

You can use [UltraISO](https://www.ultraiso.com/) which natively and properly supports building PS2 ISOs. It is however a paid product, so acquire it however you want.

Open your original ISO (preferably a copy of it, always have a backup of the original) into UltraISO, remove `GT4.VOL`.

At the top left, in `Actions`, go to `Add Files` and select the newly built `GT4.VOL` file. Then simply just save. It'll take a few dozen seconds, but after that, your ISO is ready to go.

---

## Building a Dual-Layered ISO

!!! warning 
    This is untested.

This applies to retail GT4. Read the "Building an ISO" part first. 

The second layer contains all the videos/movies. You are free to extract it with GT4FS if you want to view/edit anything, otherwise leave it as-is.

You will need [Apache3](https://www.romhacking.net/utilities/584/) AND UltraISO to build dual-layered discs. 

* Select the original ISO, and extract all the files. On top of the original file structure, you should also have `GT4L1.VOL` file on top of the original file structure.
* Move `GT4L1.VOL` into it's own folder. Using `UltraISO`, create an ISO of the folder containing it.
* Create the first layer with the process described before.
* Using `ISOLayerMerge`, merge both iso files into one.

