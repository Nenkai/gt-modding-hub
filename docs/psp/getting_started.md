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

## Repacking

!!! tip 

    You can also run the game unpacked if you are testing, see the section below.

Same deal, use `GTPSPVolTools` as such

``` markdown title="Extracting GT.VOL"
GTPSPVolTools pack -i <path to extracted volume folder>
```

You should have PPSSPP set up in a such a way that it starts the game from the game folder rather than the ISO. This way you don't have to deal with creating an iso file.

---

## Running the game unpacked

You can also run the game unpacked which may help for modding faster. **NOTE: This method may make memory stick file operations fail**.

!!! warning

    This is currently limited to GTPSP EU 2.00. Feel free to port the patch to other regions.

Requirements:

* Game is registered as a folder game rather than iso.
* Proper file structure as shown below. Volume contents must be extracted directly at the root.
* [Patch](patches/UCES01245.ini) (currently GTPSP EU 2.00 only). **Right-click save to**

Once that is done:

1. Save the file to `<ppsspp folder>/memstick/PSP/Cheats`.
2. Enable Cheats in PPSSPP.
3. Select the game, go to 'Cheats'.
4. Have the following file structure.
5. Optionally enable file logs by hitting CTRL+L on Windows (or enable 'Log console') and then by going in `Tools -> Developer Tools -> Logging Channels -> Set SCEIO to DEBUG`. That will allow to see files that get loaded in real time.

!!! example

    Make sure you copy the `PRX` from `PSP_GAME/USRDIR` folder to the root.

    ```{ .sh .no-copy }
    .
    ├─ GTPSP/  # This is the game folder.
       ├─ PRX/ # < Copy the folder from PSP_GAME/USRDIR/PRX!
       ├─ advertise/
       ├─ car/
       ├─ ...
       ├─ PSP_GAME/
       |  └─ ...
       └─ UMD_DATA.BIN
    ...
    ```

!!! abstract "How does it work?"

    GT games simply mount different file devices to folders. GT PSP is no different.

    GT PSP mounts in this respective order:

    * A *volume* device from `disc0:/PSP_GAME/USRDIR/GT.VOL` as `/`,
    * *Module* device from `disc0:/PSP_GAME/USRDIR/MODULE` as `/`
    * *Raw/kernel file* device from `ms0:` as `/ms0`.

    Changing the third device to mount from `disc0:/` as `/` takes priority over the other devices while loading files raw.

    This is useful if you want to port the patch to another region.