# Getting Started

## Prerequisites

* Understanding how [Command Prompt / `cmd`](https://www.makeuseof.com/tag/a-beginners-guide-to-the-windows-command-line/) works and opening it in a folder.
* Windows
* Preferably [PCSX2](https://pcsx2.net/)
* [GT4FS](https://github.com/Razer2015/GT4FS)

!!! warning
    It is recommend to mod Gran Turismo 4 Online Test Version as opposed to retail, as retail uses dual-layer discs which cannot be built easily.

---

## Extracting the game

All PS2's GTs are no exception to the [volume system](../concepts/volume.md), you will need to extract it in order to gain access to game contents.

If you haven't already, extract the `.iso` file using [7-Zip](https://www.7-zip.org/) or by any other means. You should be able to see a `GT4.VOL` file.

Using `GT4FS`, extract the volume file as such

``` markdown title="Extracting GT4.VOL"
GT4FS extract -r GT4.VOL
```

This may take some time, but once that is done, you should be able to see a new `extracted` folder that follows [this file structure].