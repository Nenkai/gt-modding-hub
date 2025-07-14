---
comments: true
---

# Gran Turismo 5/6 - AppOpt System/Command
Command line arguments are parameters that controls how a program should behave.

Both games allow command-line arguments to be provided to control the game at will.

Arguments are also passed to the Adhoc system through the `AppOpt` object.

## Requirements
- DEX FW Console with PS3 SDK installed (TMAPI) - Rebug D-REX 4.84 works, or RPCS3
- GT5/6
- PS3 Connected to PC via Ethernet (if no RPCS3)
- Debug Converted EBOOT

## Console Setup
!!! note
    Skip this if you are using RPCS3.

Ensure that in Rebug Toolbox:

- Debug Menu Type = `DEX`
- QA Flag = `ON`

Ensure that in Debug Settings (XMB):

- Game Output Resolution: Set to whatever you want
- Release Check Mode: `Development Mode`
- Boot Mode: `System Software Mode`
- Network Settings for Debug: `Single Settings`

## Setup Target Manager (PS3)

!!! warning
    For RPCS3, you do not need to do any of the following. Simply start RPCS3 using the command prompt and pass the arguments after the EBOOT path.

* Start Target Manager.
* Right click `My Targets`, click `Add Target`.
* Put whatever in Name, select `Debugging Station`, press `Next`.
* In `IP address or host name`, put the IP of the PS3, then `Next` again, then `Finish`.
* Double click the target that was added to connect to it.
* Right click the target, go into `Properties`.
* In `Target`->`TM Properties`, look for `File Serving`, and `File server directory`. here, you want to put the parent directory of the game.
  Preferably the `USRDIR` directory, i.e: "C:\Games\BCES01893\USRDIR" where `BCES01893` is the game folder from /dev_hdd0/game/.


## Arguments 
Arguments are inserted by `<keyName>=<value>`, with a space between each additional argument.

!!! note

    This list is taken from GT6, not all may be available in GT5.


### General

Argument| Type | Description
------------ | ------------- | -----------
`fsroot` | `0/1` | Loads from a custom path remotely, volume-less. (GT6)
`patchdemo` | `0/1` | ?
`language` | `string (32 chars max)` | Sets the game language
`player_name` | `string` | Sets the player name in events
`specdb` | `string` | Sets the SpecDB path

### Debug
Argument| Type | Description
------------ | ------------- | -----------
`no_meter` | `0/1` | Whether to disable debug meters (debug build only)
`grp_debug` | `0/1` | Whether to enable model/course/camera debug (debug build only)
`sound_debug` | `0/1` | Whether to enable a quick menu race option to test sounds (debug build only, broken on release)
`chromakey` | `0/1` | Green screen in races

### Skipping
Argument| Type | Description
------------ | ------------- | -----------
`disable_savedata` | `0/1` | Whether to disable saving completely
`skip_tutorial` | `0/1` | Whether to skip tutorial on new saves
`skip_op` | `0/1` | Whether to skip intro
`no_autodemo` | `0/1` | Whether to disable demos
`skip_present` | `0/1` | Whether to disable reward checks

### Patching
Argument| Type | Description
------------ | ------------- | -----------
`patch` | `0/1` | ?
`patch_root` | `string` | ?
`storagePatch` | `0/1` | ?

### Internal
Argument| Type | Description
------------ | ------------- | -----------
`branch` | `string` | Sets the game branch, can be `gt6/runviewer/academy/behavior`. Note that if you use `runviewer` in GT6, it will boot into `dev_runviewer` - a `PREVIEW` specdb is required, copy `GT6` as `PREVIEW` in the `specdb` folder.
`gt5` | `0/1` | Whether to load projects with the gt5 product name rather than gt6
`project_prefix` | `string` | ?
`adhoc_trace_object` | `0/1` | ? (Possibly debug only)
`design_work` | `0/1` | Whether to boot directly into design_work instead of dev_runviewer when branch is runviewer
`no_package` | `0/1` | Whether to load projects from their ADC files rather than MPackage

### Network
Argument| Type | Description
------------ | ------------- | -----------
`grim` | `string` | ?
`server_special_value` | `string` | Header Value for `X-gt-special` for the game to use
`online_lounge` | `0/1` | Whether online lounge is available as runviewer
`eula` | `0/1` | Whether EULA is forced to show
`lanmode` | `0/1` | Whether LAN Mode is enabled
`copudp` | `0/1` | ?
`network_available` | `0/1` | Whether network is available, mainly for runviewer
`matching_num` | `1-16?` | Value to overrides the `racers_max` for any Quick Match event.

### Events
Argument| Type | Description
------------ | ------------- | -----------
`expand_memory` | `0/1` | Whether to expand memory for races?
`lap1` | `0/1` | All events are 1 lap
`autorun_viewchange` | `0/1` | ?
`result` | `?` | Result for events?
`bspec` | `0/1` | Forces allowed bspec (?)
`omedeto` | `0/1` | ?

### Bot

nobot - sets bot_on to False
bot - sets bot_on to True
nobothost - ?
bottype - ?
botgroup - ?
botroom - ?
botcrs - ?
botstart - ?

### Quickmatch

matching_num - ?
quickmatch (index) - ?
quickmatch_index - ?
quickmatch_old  - ?

### Other

Argument| Type | Description
------------ | ------------- | -----------
`demo_idx` | `int` | Auto demo index to play


