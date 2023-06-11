# FSRoot

!!! warning 
    This is for GT6 Only. Read the [Command Line Arguments](command_line_args.md) section first!

FSRoot allows you to stream game contents from your PC, without a volume file.

## Setting up GT6 for FSRoot
The `USRDIR` folder should contain ALL of the game's data - the contents of both GT.VOL and PDIPFS in one. 

Extract `GT.VOL` in one folder, extract the `PDIPFS` into another, then all extracted PDIPFS contents should go into the extracted GT.VOL folder. Name this folder `EXTRACTED`.

!!! tip
    Copy all files from where `USRDIR` is (i.e `TROPDIR`, `PARAM.SFO`) into `USRDIR`, create `PS3_GAME`in `USRDIR`, copy the `PARAM.SFO` there. It's weird but yeah.
In the end, you should end up with something like:
``` markdown title="Folder Structure for FSRoot"
.
└─ BCES00569/
   ├─ LICDIR/
   ├─ TROPDIR/
   └─ USRDIR/ (which is /app_home)
      ├─ EXTRACTED/ (extracted game contents)
      │  ├─ advertise/
      │  ├─ car/
      │  ├─ carsound/
      │  ├─ character/
      │  ...
      │
      ├─ LICDIR/
      ├─ PS3_GAME/
      │  └─ PARAM.SFO/
      ├─ TROPDIR/
      └─ EBOOT.BIN/
 
...
```
## Booting the game
* Right click the target in Target Manager, set Reset Mode to `Debug Mode`, then click `Reset`.
* Right click the target again, click "Load and Run Executable".
* At the bottom, in Command-line parameters, set: `fsroot=EXTRACTED`.
* Make sure only `Clear console output streams` is checked.
* Check only `Load from device`, select `/app_home`. Navigate to the game's folder, in USRDIR, then open it.

Game should now boot.

!!! note "RPCS3"
    Boot RPCS3 as such with `cmd`:
    ```
    rpcs3.exe <path to EBOOT> fsroot=EXTRACTED
    ```

!!! tip "Wrapping-up"
    This will create a `PDEV88888` folder in `dev_hdd0`. Files downloaded from your PC will be stored there, and only replaced when the remote files are different.
    On RPCS3 however the same process will occur, effectively storing extracted files twice.

    To boot back into XMB set Reset Mode to `System Software Mode`.