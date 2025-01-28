# Getting Started

These pages currently cover **GT PSP**. 

!!! tip 

    GT PSP more or less runs on the same engine as GT5/6, so some [PS3](../ps3/getting_started.md) pages & tools may also be useful. Textures/Models are different, but things like Adhoc, RText, SpecDB are the same.

# Requirements

* Understanding how [Command Prompt / `cmd`](https://www.makeuseof.com/tag/a-beginners-guide-to-the-windows-command-line/) works and opening it in a folder.
* Windows
* Preferably [PPSSPP](https://www.ppsspp.org/)
* [GTPSPVolTools](https://github.com/Nenkai/GTPSPVolTools)

---

## Extracting the game

GT PSP uses the [volume system](../concepts/volume.md), which will need to be extracted in order to gain access to game contents.

If you haven't already, extract the `.iso` file using [7-Zip](https://www.7-zip.org/) or by any other means. You should be able to see a `GT3.VOL` file.

Using `GTPSPVolTools`, unpack the volume file as such

``` markdown title="Extracting GT.VOL"
GTPSPVolTools unpack -i <path to GT.VOL>
```

This may take a while, but when complete, you should be able to see a new folder.

## Packing

Same deal, use `GTPSPVolTools` as such

``` markdown title="Extracting GT.VOL"
GTPSPVolTools pack -i <path to extracted volume folder>
```

You should have PPSSPP set up in a such a way that it starts the game from the game folder rather than the ISO. This way you don't have to deal with creating an iso file.