---
icon: material/database
---

# Getting Started

## Requirements

* Understanding how [Command Prompt / `cmd`](https://www.makeuseof.com/tag/a-beginners-guide-to-the-windows-command-line/) works and opening it in a folder.
* Windows
* Preferably [PCSX2](https://pcsx2.net/)
* [GT4FS](https://github.com/Razer2015/GT4FS)

!!! warning
    It is recommend to mod [Gran Turismo 4 Online Public Beta](../../builds/gt4.md#gt4-online-public-beta-june-6th-2006) as opposed to retail, as retail uses dual-layer discs which cannot be built easily.

---

## Extracting ISO

Refer to the [ISO Extraction/Building](../iso_extraction_building.md) guide first.

## Extracting the game

All PS2 GT titles use the [volume system](../../concepts/volume.md), which will need to be extracted in order to gain access to game contents.

If you haven't already, extract the `.iso` file using [7-Zip](https://www.7-zip.org/) or by any other means. You should be able to see a `GT4.VOL` file.

Using `GT4FS`, extract the volume file as such

``` markdown title="Extracting GT4.VOL"
GT4FS extract -r GT4.VOL
```

This may take a while, but when complete, you should be able to see a new `extracted` folder that follows [this file structure](file_structure.md).

---

## Setting up HostFS (recommended method)

!!! warning
    This section currently only applies to GT4 Online US (SCUS-97436).

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

Once you're done, you can build your iso file (refer to the [ISO building guide](../iso_extraction_building.md#building)).