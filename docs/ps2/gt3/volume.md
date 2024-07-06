# Getting Started

## Requirements

* Understanding how [Command Prompt / `cmd`](https://www.makeuseof.com/tag/a-beginners-guide-to-the-windows-command-line/) works and opening it in a folder.
* Windows
* Preferably [PCSX2](https://pcsx2.net/)
* [GT3VOLExtractor](https://github.com/Nenkai/gt2tools/releases) - **make sure you use this version, it is a fork**

---

## Extracting the game

All PS2 GT titles use the [volume system](../../concepts/volume.md), which will need to be extracted in order to gain access to game contents.

If you haven't already, extract the `.iso` file using [7-Zip](https://www.7-zip.org/) or by any other means. You should be able to see a `GT3.VOL` file.

Using `GT3VOLExtractor` (forked version above), extract the volume file as such

``` markdown title="Extracting GT3.VOL"
GT3VOLExtractor -e GT3.VOL data --decompress-all
```

This may take a while, but when complete, you should be able to see a new `data` folder.

---

## Setting up HostFS (recommended method)

Unlike GT4, GT3 has leftover code for loading files from HostFS. HostFS is a feature normally available on PS2 devkits which allows loading files loose without a volume file. This avoids the need of normally creating a new volume file and ISO file for every change you want to make.

!!! tip
    Ensure that you have the volume extracted into a `data` folder, next to the ISO file before starting this section.

### Setting up PCSX2

Refer to the HostFS patches in the [patches](patches.md#hostfs) section. Use the one that matches your region.

##### QT PCSX2

1. Add search directory to the ELF file
2. Actually rename the elf file to have the elf extension to show up i.e `SCES_502.94.elf`
3. Right click on the elf entry, properties
4. Summary -> Disc Path -> Browse -> Select ISO file
5. Emulation -> Tick "Enable Host Filesystem"

##### Non-QT PCSX2

Select your ISO file

* CDVD -> ISO Selector -> ...

Then, boot through the ELF file (important!)

* System -> Run ELF... -> SCES_502.94 (example)

After that, you should be done. Enjoy editing files and fast load speeds.

---

## Building a Volume

TODO