# Easier ways to mod

Ways to avoid PDIPFS exist to allow modding game files more easily.

## Raw Reading Patch (GT5 2.11)
GT5 can be patched to read files loose to help testing mods faster. To publish mods continue on with the packing section of [Volume System](./basics/volume_system.md).

=== "RPCS3 Patch"
    Edit `RPCS3\patches\patch.yml`, add the following under the correct PPU hash entry (indentation matters!), while also changing the game code accordingly:
    
    * :flag_eu: EU: `PPU-7a5ee7bc2fef9566dd80e35893fe2c5571197726`
    * :flag_us: US: `PPU-d73f342bf28ee016ef3d0ccb309b1acb03d8ecce`

    ```yaml
    "Raw Reading patch":
      Games:
        "Gran Turismo 5":
          BCES00569: [ 02.11 ] # Change the game code accordingly
      Author: "Nenkai"
      Patch Version: 1.0
      Group: ""
      Notes: ""
      Patch:
        - [ be32, 0x000120a0, 0x38600548 ] # Adjust sizeof(PDIPS3::FileDevicePFSGameData) to sizeof(PDIPS3::FileDeviceGameData) for new
        - [ be32, 0x000120d8, 0x7F84E378 ] # Adjust parameters PDIPS3::FileDeviceGameData(device, gamecode, "/", 0)
        - [ be32, 0x000120dc, 0x7D054378 ]
        - [ be32, 0x000120e0, 0x38C00000 ]
        - [ be32, 0x00a7316c, 0x941D0540 ] # Rectify pointer offset to device list field
        - [ be32, 0x00a73160, 0x480047C9 ] # Change PDIPS3::FileDevicePFSGameData device to PDIPS3::FileDeviceGameData
    ```
    
    Extracted game files go under `USRDIR` as such that `/dev_hdd0/game/BCES00569/USRDIR/font/vec/fontset_US.txt` is valid. Base game contents must be extracted (GT.VOL), then update contents (PDIPFS) extracted ontop of it. 
    
    Enable the patch in the game patches menu by right clicking on the game and clicking on `Manage Game Patches`.

=== "EBOOT Patch"

    TrueAncestorSELFResigner is required. decrypt `EBOOT.BIN` with `1. Decrypt EBOOT.BIN Only`.

    With a hex editor, edit `EBOOT.ELF` and place bytes at the following offsets:
    ```
    000020a0 - 38 60 05 48
    000020d8 - 7f 84 e3 78
    000020dc - 7d 05 43 78
    000020e0 - 38 c0 00 00
    00a6316c - 94 1d 05 40
    00a63160 - 48 00 47 c9
    ```

    Then resign it using the `2. Resign to NON-DRM EBOOT` option.

=== "Raw Patch"

    ```
    Original
    000120a0 38 60 02 40     li         param_1,0x240
    000120d8 7f 44 d3 78     or         param_2=>PTR_s_KALAHARI-37863889_017cc738,r26,r26
    000120dc 7f 85 e3 78     or         param_3=>s_BCES-00569_013dee60,r28,r28
    000120e0 7f 26 cb 78     or         param_4=>s_PDIPFS_013dfb00,r25,r25
    00a7316c 94 1d 02 38     stwu       r0,0x238(r29)
    00a73160 4b ff fe ed     bl         FUN_00a7304c 

    Edited:
    000120a0 38 60 05 48     li         param_1,0x548
    000120d8 7f 84 e3 78     or         param_2,r28,r28
    000120dc 7d 05 43 78     or         param_3,param_6,param_6
    000120e0 38 c0 00 00     li         param_4,0x0
    00a7316c 94 1d 05 40     stwu       r0,0x540(r29)
    00a73160 48 00 47 c9     bl         FUN_00a77928 
    ```

!!! warning
    You may need to move some files from `specdb/GT5_JP3009` to `specdb/GT5_JP3010` if you get a crash.

    Files that need to be copied:
    ```
    specdb/GT5_JP3010/GENERIC_CAR_INFO.dbt
    specdb/GT5_JP3010/BRAKECONTROLLER.dbt
    specdb/GT5_JP3010/ASCC.dbt
    specdb/GT5_JP3010/TCSC.dbt
    specdb/GT5_JP3010/DISPLACEMENT.dbt
    specdb/GT5_JP3010/INTERCOOLER.dbt
    specdb/GT5_JP3010/NOS.dbt
    specdb/GT5_JP3010/BOOST_CONTROLLER.dbt
    specdb/GT5_JP3010/INDEP_THROTTLE.dbt
    specdb/GT5_JP3010/TIRESIZE.dbt
    specdb/GT5_JP3010/TIREFORCEVOL.dbt
    specdb/GT5_JP3010/GENERIC_ITEMS.idi
    specdb/GT5_JP3010/ALLOW_ENTRY.dbt
    ```

---

## FSRoot (GT6)

[FSRoot](other/fsroot.md) is a method of running the game that allows editing the game files in real time by streaming files from your PC, And drastically helps modding and testing much more quickly. To publish mods continue on with the packing section of [Volume System](./basics/volume_system.md).

Requirements:

* GT6 (FSRoot is only supported in GT6)
* A PS3 with the REBUG 4.84 D-REX CFW is required
* Kernel converted to DEX
* EBOOT converted to Debug 
* PS3 SDK available and installed on your PC (if no emulator).

The requirements are a bit tedious to set-up, but all the more worth it.