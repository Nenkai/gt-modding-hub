## Gran Turismo 5 Prologue Free Trial Version (October 20th, 2007)

![aa](../images/covers/gt5p_demo.png){ width=250 }

:material-shovel: *Dumped*: {++Yes++} - available on [PSN](http://zeus.dl.playstation.net/cdn/JP9001/NPJA90061_00/9SOewVRkmHmJ3aUbsGtNkf8R8Jd5dMEnQinATnvNugIyeNcd6QM3m3FyhyIqJeWKICrSMXPEaTd0LAVCUqHoGYBvTyuiixLV5jp6i.pkg)

Japan only release. Game Code: `NPJA-90061`

??? note "Build Info"
    * Adhoc Version: `10`
    * Supports up to instruction: `40 - SYMBOL_CONST`
    * VersionBranch: `trial2007`
    * PDIVersion: `1.01`
    * SpecDB Version: `GT5_TRIAL2007_2730`
    * Volume Seed: `PDIPFS-071020-02`
    * Volume Key: **NONE** (Old PDIPFS Version)
    * KeyLicensee: `0xe55542933436efd7f22cf61b9c3940b1`
    * Grim URL: `https://gt5ptrial.ps3.online.jp.gran-turismo.com`
    * GT5P_TVBASEKEY: `z+GpfENhXfpTo/CJ9UjbgX0H9siurJ8PAe0/mm1MOBc=`
    * One executable `EBOOT.BIN`

??? note "Veiled Cars"
    Some car files were encrypted - waiting to be unveiled in real-life before being playable ingame. These files also had a custom [volume](../concepts/volume.md) flag that is tied to the [`MBufferDecryptManager`](https://nenkai.github.io/GTAdhocAPI/html/classpdiext_1_1_m_buffer_decrypt_manager.html) adhoc object.
    
    In order for the car files to be decrypted, the [Grim](../concepts/grim.md) server returned decryption keys on release day. These keys were stored in the save, and `MBufferDecryptManager.addKey()` would be called, making these files available.

    If an unlocked game save wasn't backed up from back in the day, these files would've been permanently inaccessible.

    ##### Nissan GT-R '07
    * `car/lod/00030131` -> `SoyoGvyMYKCCjcYBCI8rY3GMy9eQlvy3KpEfuL2qZE4oAo5c`
    * `car/menu/00030131` -> `SoyoGvyMYKCCjcYBCI8rY3GMy9eQlvy3KpEfuL2qZE6GuajW`
    * `car/interior/00030131` -> `SoyoGvyMYKCCjcYBCI8rY3GMy9eQlvy3KpEfuL2qZE5JUizQ`
    * `car/meter/00030131` -> `SoyoGvyMYKCCjcYBCI8rY3GMy9eQlvy3KpEfuL2qZE5iDFjf`
    * `piece/car_thumb_M/gtr_07_01.img` -> `cjg1NDJzZDVmNGgyNXM0cnQ2eTJkcjg0Z3pkZmJ3ZmEtdwwS`

    ##### Subaru Impreza WRX STI '07
    * `car/lod/00200032` -> `KeaQvtvmSURh566l5+kUB1DmtHtv8OVbCesIXJ0ETPI1QYGR`
    * `car/menu/00200032` -> `KeaQvtvmSURh566l5+kUB1DmtHtv8OVbCesIXJ0ETPJS5l7P`
    * `car/interior/00200032` -> `KeaQvtvmSURh566l5+kUB1DmtHtv8OVbCesIXJ0ETPKP9PTn`
    * `piece/car_thumb_M/impreza_wrx_sti_07_03.img` -> `cTM0NWgzNTZ5djJoZzRmMTIzNDQ1NjQ1ajZqMjRoNWY4Rqik`

---

## GT5 Prologue JP (December 1st, 2007)

![aa](../images/covers/gt5p_jp.jpg){ width="250" }

:material-shovel: *Dumped*: {++Yes++} - available on archive (playstation 3 - redump collection - needs ird decryption) · :material-disc: [Redump Info](http://redump.org/disc/34549/)

Game Code: `BCJS-30017`

??? note "Build Info"
    * Adhoc Version: `10`
    * Supports up to instruction: `48 - SYMBOL_CONST`
    * VersionBranch: `gt5p`
    * VersionTarget: `ps3`
    * VersionEnvironment: `product-common-key`
    * VersionBuild: `release`
    * VersionUser: `build`
    * VersionApplication: `gt`
    * PDIVersion: `1.03`
    * SpecDB Version: `GT5_PROLOGUE2813`
    * CompileDateTime: `2007/12/01 01:17:48`
    * CompileVMKVersion: `gt.gt5p.jp.ps3.product-common-key.release.build`
    * CompileSVNRevision: `26426`
    * Volume Seed: `PDIPFS-071201-11`
    * Volume Key: `79764919, 79764919, 79764919, 79764919`
    * Volume Serial: `218164878`
    * KeyLicensee: `0xdfaae1a969af32b72a87e3e53e0f7737`
    * Grim URL: `https://gt5prologue.ps3.online.jp.gran-turismo.com`
    * GT5P_TVBASEKEY: `z+GpfENhXfpTo/CJ9UjbgX0H9siurJ8PAe0/mm1MOBc=`
    * Split executables (EBOOT + EMAIN)
    * `TV.DAT` (museum images + movies + XML + movie img files + strobes)

??? note "Video Keys"
    * tv_4_364222191.pam key: `c/20HUw5Hit6KWbweKnOirKI0GZx7MQCW6jRA+1b790=` (LANCER EVOLUTION X)
    * tv_5_843298190.pam key: `sLWWAJgcxEgV+FIuWUUypSZ7D3xos+knlmTuaMSICCE=` (TOKYO MOTORSHOW 2007)
    * tv_8_280528187.pam key: `IgCub2PBagBN7bi5SxsXXbvWWBvOejk1/Ng+qVWTArY=` (デイトナ・インターナショナル・スピードウェイ)
    * tv_9_759604186.pam key: `VD7GwRdpX1HzTHIq1gx3OzFJNgQwbx+BlKIpWs1CQ7I=` (アイガー北壁コース)
    * tv_10_759604186.pam key: `nEhnJFlE/Mablm/yMvjqSabq3+BGyglN86LSCvyikt4=` (富士スピードウェイ)
    * tv_11_436743641.pam key: `OgfReEOdx3idSCHMYZ5w1tJuuLLWnwcq/DDMzp+CflE=` (ロンドン市街地コース)
    * tv_12_957666642.pam key: `56dtpix1GqgJKWBVHZHw+4pLTDGIWC0AtlZgcxAYUmA=` (鈴鹿サーキット)
    * tv_13_478590643.pam key: `4PVDlQImtNlNAbGfaEWJYn5/YQBoVKYiSX8iLE1dKD8=` (OPENING)
    * tv_14_999513644.pam key: `a6sDVkOLo+xPX71VSeku35F6m6MiqpMTodlqzvqNGkI=` (「GT5 プロローグ」エンディング / ENDING)
    * tv_15_520437645.pam key: `3KegYN94Qfb0ialUYNf/Q1xTMAgMXaWfwADz4mEAVCo=` (The GT-R Legend Inside Story I)
    * tv_113_485895642.pam key: `zVxc6HuHt/MHU4LeM3+pZckok1eF8c9s3TDtuZF32VM=` (Long 1)
    * tv_176_016350468.pam key: `GUNgC5hkpwgPkyiLJRpp10bxieOkCKJMlYgThxosXio=` (「GT5 プロローグ」オープニング)

---

## GT5 Prologue Special Event Version GT by Citroën (October 11th, 2008)

![aa](../images/covers/gt5p_citroen.jpg){ width="250" }

:material-shovel: *Dumped*: {++Yes++} - available on [archive](https://archive.org/details/GranTurismo5PrologueEuropeDemoSpecialEventVersionGTByCitron) · :material-disc: [Redump Info](http://redump.org/disc/59988/)

Game Code: `BCED-00393` / `PKJM00393`

??? note "Build Info"
    * Adhoc Version: `12`
    * Supports up to instruction: `60 - DOUBLE_CONST`
    * VersionBranch: `citroen`
    * VersionTarget: `ps3`
    * VersionEnvironment: `product-common-key`
    * VersionBuild: `release`
    * VersionUser: `build`
    * VersionApplication: `gt`
    * ProductVersion: `1.00`
    * PDIVersion: `0.10`
    * SpecDB Version: `GT5_PROLOGUE2813`
    * CompileDateTime: `2008/09/11 15:14:21`
    * CompileVMKVersion: `gt.citroen.uk.ps3.product-common-key.release.build`
    * CompileSVNRevision: `29533`
    * Volume Seed: `KARAKUM-176730298`
    * Volume Key: `2572490225, 3350870255, 2843966437, 1623495263`
    * KeyLicensee: `0x550bea788734e91e0128cd59755c5753`
    * Grim URL: `https://gt5p-citroen.ps3.online.uk.gran-turismo.com`
    * GT5P_TVBASEKEY: `z+GpfENhXfpTo/CJ9UjbgX0H9siurJ8PAe0/mm1MOBc=`
    * Split executables (EBOOT + EMAIN)
    * `TV.DAT` (only XML + img files)

??? note "Video Keys"
    * 163.pam key: `MB48bmS6rUgvjjM0795qgdk9cIwJppYdBwGIGowWDts=`

---

## GT5 Prologue JP Spec III (November 1st, 2008)

![aa](../images/covers/gt5p_jp_s3.jpg){ width="250" }

:material-shovel: *Dumped*: {++Yes++} - available on archive (playstation 3 - redump collection) · :material-disc: [Redump Info](http://redump.org/disc/34549/)

Game Code: `BCJS-30017`

??? note "Build Info"
    * Adhoc Version: `12`
    * Supports up to instruction: `60 - DOUBLE_CONST`
    * VersionBranch: `gt5p`
    * VersionTarget: `ps3`
    * VersionEnvironment: `product-common-key`
    * VersionBuild: `release`
    * VersionUser: `build`
    * VersionApplication: `gt`
    * ProductVersion: `3.00`
    * PDIVersion: `3.00`
    * SpecDB Version: `GT5_PROLOGUE2813`
    * CompileDateTime: `2008/10/01 16:40:03`
    * CompileVMKVersion: `gt.gt5p.jp.ps3.product-common-key`
    * CompileSVNRevision: `29768`
    * Volume Seed: `PDIPFS-071201-11`
    * Volume Key: `79764919, 79764919, 79764919, 79764919`
    * KeyLicensee: `0xdfaae1a969af32b72a87e3e53e0f7737`
    * Grim URL: `https://gt5prologue.ps3.online.jp.gran-turismo.com`
    * GT5P_TVBASEKEY: `z+GpfENhXfpTo/CJ9UjbgX0H9siurJ8PAe0/mm1MOBc=`
    * Split executables (EBOOT + EMAIN + ESP)
    * `TV.DAT` (museum images + movies + XML + movie img files)

??? note "Video Keys"
    * tv_8_280528187.pam key: `IgCub2PBagBN7bi5SxsXXbvWWBvOejk1/Ng+qVWTArY=` (デイトナ・インターナショナル・スピードウェイ)
    * tv_9_759604186.pam key: `VD7GwRdpX1HzTHIq1gx3OzFJNgQwbx+BlKIpWs1CQ7I=` (アイガー北壁コース)
    * tv_10_759604186.pam key: `nEhnJFlE/Mablm/yMvjqSabq3+BGyglN86LSCvyikt4=` (富士スピードウェイ)
    * tv_11_436743641.pam key: `OgfReEOdx3idSCHMYZ5w1tJuuLLWnwcq/DDMzp+CflE=` (ロンドン市街地コース)
    * tv_12_957666642.pam key: `56dtpix1GqgJKWBVHZHw+4pLTDGIWC0AtlZgcxAYUmA=` (鈴鹿サーキット)
    * tv_14_999513644.pam key: `a6sDVkOLo+xPX71VSeku35F6m6MiqpMTodlqzvqNGkI=` (「GT5 プロローグ」エンディング)
    * tv_15_520437645.pam key: `3KegYN94Qfb0ialUYNf/Q1xTMAgMXaWfwADz4mEAVCo=` (The GT-R Legend Inside Story I)
    * tv_113_485895642.pam key: `zVxc6HuHt/MHU4LeM3+pZckok1eF8c9s3TDtuZF32VM=` (Long 1)
    * tv_176_016350468.pam key: `GUNgC5hkpwgPkyiLJRpp10bxieOkCKJMlYgThxosXio=` (「GT5 プロローグ」オープニング)