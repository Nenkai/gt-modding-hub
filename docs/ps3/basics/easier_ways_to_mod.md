---
icon: material/plus
---

# :material-plus: Easier ways to mod

Ways to avoid PDIPFS exist to allow modding game files more easily.

## Raw Reading Patch (GT5 2.11)
GT5 can be patched to read files loose to help testing mods faster. To publish mods continue on with the packing section of [Volume System](../basics/volume_system.md).

=== "RPCS3 Patch"
    Edit `RPCS3\patches\patch.yml`, add the following under the correct PPU hash entry (indentation matters!). Also change the game code accordingly!
    
    * :flag_eu: EU: `PPU-7a5ee7bc2fef9566dd80e35893fe2c5571197726`
    * :flag_us: US: `PPU-d73f342bf28ee016ef3d0ccb309b1acb03d8ecce`

    ??? abstract "BCES00569"

        ```yaml
        PPU-7a5ee7bc2fef9566dd80e35893fe2c5571197726:
          "Raw Reading Patch":
            Games:
              "Gran Turismo 5":
                BCES00569: [ 02.11 ]
            Author: "Nenkai"
            Patch Version: 1.0
            Group: ""
            Notes: ""
            Patch:
              - [ be32, 0x000120a0, 0x386004A0 ] # Adjust sizeof(PDIPS3::FileDevicePFSGameData) to sizeof(PDIPS3::FileDeviceCellFS) for new
              - [ be32, 0x000120d8, 0x3888E308 ] # Adjust parameters PDIPS3::FileDeviceGameData(device, param1, param2, param3)
              - [ be32, 0x000120dc, 0x38A8E330 ] # Change pointer to a vtable name
              - [ be32, 0x000120e0, 0x7D064378 ] # Change pointer to a vtable name
              - [ be32, 0x00a73160, 0x48004ED5 ] # Rectify pointer offset to device list field
              - [ be32, 0x00a7316c, 0x941D0498 ] # Change PDIPS3::FileDevicePFSGameData device to PDIPS3::FileDeviceCellFS
              - [ utf8, 0x013dde10, /dev_hdd0\0 ] # param_1
              - [ be16, 0x013dde19, 0x0000 ] # Null terminate
              - [ utf8, 0x013dde38, /game/BCES00569/USRDIR/direct ] # <-- Change BCES00569 accordingly!
              - [ be16, 0x013dde55, 0x0000 ] # Null terminate
        ```

    ??? abstract "BCUS98114"

        ```yaml
        PPU-d73f342bf28ee016ef3d0ccb309b1acb03d8ecce:
          "Raw Reading Patch":
            Games:
              "Gran Turismo 5":
                BCUS98114: [ 02.11 ]
            Author: "Nenkai"
            Patch Version: 1.0
            Group: ""
            Notes: ""
            Patch:
              - [ be32, 0x000120a0, 0x386004A0 ] # Adjust sizeof(PDIPS3::FileDevicePFSGameData) to sizeof(PDIPS3::FileDeviceCellFS) for new
              - [ be32, 0x000120d8, 0x3888E308 ] # Adjust parameters PDIPS3::FileDeviceGameData(device, param1, param2, param3)
              - [ be32, 0x000120dc, 0x38A8E330 ] # Change pointer to a vtable name
              - [ be32, 0x000120e0, 0x7D064378 ] # Change pointer to a vtable name
              - [ be32, 0x00a73160, 0x48004ED5 ] # Rectify pointer offset to device list field
              - [ be32, 0x00a7316c, 0x941D0498 ] # Change PDIPS3::FileDevicePFSGameData device to PDIPS3::FileDeviceCellFS
              - [ utf8, 0x013dde70, /dev_hdd0 ] # param_1
              - [ be16, 0x013dde79, 0x0000 ] # Null terminate
              - [ utf8, 0x013dde98, /game/BCUS98114/USRDIR/direct ]
              - [ be16, 0x013ddeb5, 0x0000 ] # Null terminate
        ```
        
    ??? abstract "BCJS30001"

        ```yaml
        PPU-26c56a42dbc303893506c4b76b496780f204d329:
          "Raw Reading Patch":
            Games:
              "Gran Turismo 5":
                BCJS30001: [ 02.11 ]
            Author: "chmcl95"
            Patch Version: 1.0
            Notes:
            Patch:
              - [ be32, 0x0001209c, 0x386004A0 ] # Adjust sizeof(PDIPS3::FileDevicePFSGameData) to sizeof(PDIPS3::FileDeviceCellFS) for new
              - [ be32, 0x000120d4, 0x3888E338 ] # Adjust parameters PDIPS3::FileDeviceGameData(device, param1, param2, param3)
              - [ be32, 0x000120d8, 0x38A8E360 ] # Change pointer to a vtable name
              - [ be32, 0x000120dc, 0x7D064378 ] # Change pointer to a vtable name
              - [ be32, 0x00a73160, 0x48004ED5 ] # Rectify pointer offset to device list field
              - [ be32, 0x00a7316c, 0x941D0498 ] # Change PDIPS3::FileDevicePFSGameData device to PDIPS3::FileDeviceCellFS
              - [ utf8, 0x013dde10, /dev_hdd0 ] # param_1
              - [ be16, 0x013dde19, 0x0000 ] # Null terminate
              - [ utf8, 0x013dde38, /game/BCJS30001/USRDIR/direct ]
              - [ be16, 0x013dde55, 0x0000 ] # Null terminate
        ```

    Enable the patch in the game patches menu by right clicking on the game and clicking on `Manage Game Patches`.

=== "EBOOT Patch"

    TrueAncestorSELFResigner is required. decrypt `EBOOT.BIN` with `1. Decrypt EBOOT.BIN Only`.

    With a hex editor, edit `EBOOT.ELF` and place bytes at the following offsets:

    ??? abstract "BCES00569"

        ```
        000020a0 - 38 60 04 a0
        000020d8 - 38 88 E3 08
        000020dc - 38 A8 E3 30
        000020e0 - 7D 06 43 78
        00a63160 - 48 00 4E D5
        00a6316c - 94 1D 04 98
        013cde10 - /dev_hdd0
        013cde19 - 00
        013cde38 - /game/BCES00569/USRDIR/direct
        013cde55 - 00 00
        ```

    ??? abstract "BCUS98114"
    
        ```
        000020a0 - 38 60 04 a0
        000020d8 - 38 88 E3 08
        000020dc - 38 A8 E3 30
        000020e0 - 7D 06 43 78
        00a63160 - 48 00 4E D5
        00a6316c - 94 1D 04 98
        013cde70 - /dev_hdd0
        013cde79 - 00
        013cde98 - /game/BCUS98114/USRDIR/direct
        013cdeb5 - 00 00
        ```

    ??? abstract "BCJS30001"
    
        ```
        0000209c - 38 60 04 a0
        000020d4 - 38 88 E3 38
        000020d8 - 38 A8 E3 60
        000020dc - 7D 06 43 78
        00a63160 - 48 00 4E D5
        00a6316c - 94 1D 04 98
        013cde10 - /dev_hdd0
        013cde19 - 00
        013cde38 - /game/BCJS30001/USRDIR/direct
        013cde55 - 00 00
        ```

    Then resign it using the `2. Resign to NON-DRM EBOOT` option.

=== "Raw Patch"

    ??? abstract "BCES00569"

        ```
        Original
        000120a0 38 60 02 40     li         param_1,0x240
        000120d8 7f 44 d3 78     or         param_2=>PTR_s_KALAHARI-37863889_017cc738,r26,r26
        000120dc 7f 85 e3 78     or         param_3=>s_BCES-00569_013dee60,r28,r28
        000120e0 7f 26 cb 78     or         param_4=>s_PDIPFS_013dfb00,r25,r25
        00a73160 4b ff fe ed     bl         FUN_00a7304c
        00a7316c 94 1d 02 38     stwu       r0,0x238(r29)
        13dde10 - "N6PDISTD24RuntimeResourceInstanceTIPvEE" (null terminated)
        13dde38 - "N6PDISTD21RuntimeResourceValueTIPvEE" (null terminated)

        Edited:
        000120a0 38 60 04 a0     li         param_1,0x4a0
        000120d8 38 88 e3 08     subi       param_2,param_6,0x1cf8
        000120dc 38 a8 e3 30     subi       param_3,param_6,0x1cd0
        000120e0 7d 06 43 78     or         param_4,param_6,param_6

        00a73160 48 00 4e d5     bl         PDIPS3::FileDeviceCellFS::FileDeviceCellFS
        00a7316c 94 1d 04 98     stwu       r0,0x498(r29)

        13dde10 - "/dev_hdd0" (null terminated)
        13dde38 - "/game/BCES00569/USRDIR/direct" (null terminated)
        ```

    ??? abstract "BCUS98114"
    
        ```
        Original
        000120a0 38 60 02 40     li         param_1,0x240
        000120d8 7f 44 d3 78     or         param_2=>PTR_s_KALAHARI-37863889_017cc738,r26,r26
        000120dc 7f 85 e3 78     or         param_3=>s_BCES-00569_013dee60,r28,r28
        000120e0 7f 26 cb 78     or         param_4=>s_PDIPFS_013dfb00,r25,r25
        00a73160 4b ff fe ed     bl         FUN_00a7304c
        00a7316c 94 1d 02 38     stwu       r0,0x238(r29)

        Edited:
        000120a0 38 60 04 a0     li         param_1,0x4a0
        000120d8 38 88 e3 08     subi       param_2,param_6,0x1cf8
        000120dc 38 a8 e3 30     subi       param_3,param_6,0x1cd0
        000120e0 7d 06 43 78     or         param_4,param_6,param_6

        00a73160 48 00 4e d5     bl         PDIPS3::FileDeviceCellFS::FileDeviceCellFS
        00a7316c 94 1d 04 98     stwu       r0,0x498(r29)

        13dde70 - "/dev_hdd0" (null terminated)
        13dde98 - "/game/BCUS98114/USRDIR/direct" (null terminated)
        ```

    ??? abstract "BCJS30001"

        ```
        Original
        0001209c 38 60 02 40     li         param_1,0x240
        000120d4 7f 44 d3 78     or         param_2=>PTR_s_KALAHARI-37863889_017cc738,r26,r26
        000120d8 7f 85 e3 78     or         param_3=>s_BCES-00569_013dee60,r28,r28
        000120dc 7f 26 cb 78     or         param_4=>s_PDIPFS_013dfb00,r25,r25
        00a73160 4b ff fe ed     bl         FUN_00a7304c
        00a7316c 94 1d 02 38     stwu       r0,0x238(r29)
        13dde10 - "N6PDISTD24RuntimeResourceInstanceTIPvEE" (null terminated)
        13dde38 - "N6PDISTD21RuntimeResourceValueTIPvEE" (null terminated)

        Edited:
        0001209c 38 60 04 a0     li         param_1,0x4a0
        000120d4 38 88 e3 38     subi       param_2,param_6,0x1cc8 // param_6 stores 0x13dfad8h
        000120d8 38 A8 e3 60     subi       param_3,param_6,0x1ca0 // param_6 stores 0x13dfad8h
        000120dc 7d 06 43 78     or         param_4,param_6,param_6

        00a73160 48 00 4e d5     bl         PDIPS3::FileDeviceCellFS::FileDeviceCellFS
        00a7316c 94 1d 04 98     stwu       r0,0x498(r29)

        13dde10 - "/dev_hdd0" (null terminated)
        13dde38 - "/game/BCJS30001/USRDIR/direct" (null terminated)
        ```

Extracted game files go under `USRDIR` as such that `/dev_hdd0/game/BCES00569/USRDIR/direct/font/vec/fontset_US.txt` is valid. Base game contents must be extracted (GT.VOL), then update contents (PDIPFS) extracted ontop of it. 

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

[FSRoot](../other/fsroot.md) is a method of running the game that allows editing the game files in real time by streaming files from your PC, And drastically helps modding and testing much more quickly. To publish mods continue on with the packing section of [Volume System](../basics/volume_system.md).

Requirements:

* GT6 (FSRoot is only supported in GT6)
* A PS3 with the REBUG 4.84 D-REX CFW is required
* Kernel converted to DEX
* EBOOT converted to Debug 
* PS3 SDK available and installed on your PC (if no emulator).

The requirements are a bit tedious to set-up, but all the more worth it.