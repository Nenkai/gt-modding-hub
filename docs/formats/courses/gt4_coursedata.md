---
comments: true
---

# GT4 Course Data

:octicons-cpu-24: *Applies to: GT4, TT, GTHD* · :material-file-question: Extension: **None** :octicons-arrow-right-16: · Endian: Little

!!! tip
    Refer to the [Course Basics](../../concepts/courses/basics.md) for some details about the terms used on this page.

The Course Data file holds all the contents of a track/course. It is split in multiple components making up a track. 

This file is completely loaded into memory, and used in-place. It should not exceed 12mb in size (which is already 1/3 of the PS2's ram on its own!)


---

## Header

Size: Always a fixed `0x100` block.

!!! note 
    Most offsets can be set to 0 so that a component won't be processed.

    Vision lists can be set to 0, everything will be rendered for the specified component at the expense of framerate.

Field                   | Offset         | Type               | Description                                                                         |
----------------        | ------------   | ----------         | --------------------------------------                                              |
Relocation Pointer      |  `0x00`        | `int`              | Relocation Pointer                                                                  |
Main Model Set Offset   |  `0x04`        | `ModelSet2*`       | Main course model set.                                                              |
Main Model Vision List  |  `0x08`        | `VisionList*`      | Vision list for the main model set.                                                 |
Rear View Vision List   |  `0x0C`        | `VisionList*`      | Vision list for the rear view model.                                                |
?                       |  `0x10`        | `VisionList*`      | Unknown Vision List.                                                                |
?                       |  `0x14`        | `ModelSet2*`       | Unknown Model Set.                                                                  |
?                       |  `0x18`        | `VisionList*`      | Unknown Vision List. Seems to control car reflections.                              |
?                       |  `0x1C`        | `VisionList*`      | Unknown Vision List. Seems to control car reflections.                              |
?                       |  `0x20`        | `VisionList*`      | Unknown Vision List.                                                                |
Reflection Model Set    |  `0x24`        | `ModelSet2*`       | Model Set used for car reflections.                                                 |
?                       |  `0x28`        | `VisionList*`      | Unknown Vision List.                                                                |
Padding                 |  `0x2C`        | `byte[8]`          | Unused.                                                                             |
Reflection Mask Model   |  `0x34`        | `ModelSet2*`       | Model Set used for the reflection mask.                                             |
Ref. Mask Vision List   |  `0x38`        | `VisionList*`      | Vision List used for the reflection mask.                                           |
Padding                 |  `0x3C`        | `byte[8]`          | Unused.                                                                             |
"After" Model Set       |  `0x44`        | `ModelSet2*`       | Unknown Model Set.                                                                  |
"After" Vision List     |  `0x48`        | `VisionList*`      | Unknown Vision List.                                                                |
?                       |  `0x4C`        | `VisionList*`      | Unknown Vision List.                                                                |
?                       |  `0x50`        | `VisionList*`      | Unknown Vision List.                                                                |
Skybox Model Set        |  `0x54`        | `ModelSet2*`       | Model Set for the skybox. May not include things like clouds.                       |
"Far" Clouds Model Set  |  `0x58`        | `ModelSet2*`       | Model Set for "far" - the scenery, including fog/clouds.                            |
Fog/Clouds Model Set    |  `0x5C`        | `ModelSet2*`       | Model Set for the scenery, including fog/clouds.                                    |
Rear View Sky Model Set |  `0x60`        | `ModelSet2*`       | Model Set for rear view sky.                                                        |
?                       |  `0x64`        | `?*`               | Unknown.                                                                            |
?                       |  `0x68`        | [`pgluTexSet*`](../texture/img_tex1_textureset.md)   | Unused.                                                                             |
?                       |  `0x6C`        | `ModelSet2*`       | Unknown Model Set.                                                                  |
?                       |  `0x70`        | `DCourseEffect*`   | Unknown. Used for flares.                                                           |
Billboard Sets          |  `0x78`        | `BillboardSet*`    | Billboard sets.                                                                     |
?                       |  `0x7C`        | `int`              | Unused.                                                                             |
Environment Parameters  |  `0x80`        | `CourseEnvPtr*`    | Environment Parameters.                                                             |
Minimap                 |  `0x84`        | `MiniMapSet*`      | Gameplay Minimap.                                                                   |
?                       |  `0x88`        | [`pgluTexSet*`](../texture/img_tex1_textureset.md)   | Unknown.                                                                            |
Course Sounds           |  `0x8C`        | `CourseSound*`     | Course Sounds (audience position, etc).                                             |
Unused                  |  `0x90`        | `int`              | Unused.                                                                             |
?                       |  `0x94`        | `pgluShape*`       | Unknown.                                                                            |
?                       |  `0x98`        | [`pgluTexSet*`](../texture/img_tex1_textureset.md)   | Unknown.                                                                            |
?                       |  `0x9C`        | [`pgluTexSet*`](../texture/img_tex1_textureset.md)   | Unknown.                                                                            |
?                       |  `0xA0`        | [`pgluTexSet*`](../texture/img_tex1_textureset.md)   | Unknown.                                                                            |
?                       |  `0xA4`        | `GT4ReplayData*`   | Unknown/Unused? Refer to 0xB0 instead.                                              |
?                       |  `0xA8`        | [`pgluTexSet*`](../texture/img_tex1_textureset.md)   | Unknown.                                                                            |
?                       |  `0xAC`        | `ModelSet2*`       | Unknown Model Set.                                                                  |
Replay Camera Data      |  `0xB0`        | `GT4ReplayData*`   | Used for the replay cameras.                                                        |
?                       |  `0xB4`        | `GT4ReplayData*`   | Unknown/Unused? Refer to 0xB0 instead.                                              |
?                       |  `0xB8`        | `GT4ReplayData*`   | Unknown/Unused? Refer to 0xB0 instead.                                              |
Gadget List             |  `0xBC`        | `GadgetShapeList*` | Cones/Gadgets on the course.                                                        |
Pre-Race Cameras        |  `0xC0`        | `GT4ReplayData*`   | Defines pre-race cameras.                                                           |
?                       |  `0xC4`        | [`pgluTexSet*`](../texture/img_tex1_textureset.md)   | Unknown.                                                                            |
Road Reflections Model  |  `0xC8`        | `ModelSet2*`       | Road Reflections from Sky model set.                                                |
?                       |  `0xCC`        | `DPhotoMode*`      | Unknown.                                                                            |
?                       |  `0xD0`        | `MotionSetFile*`   | Unknown.                                                                            |
?                       |  `0xD4`        | `MotionSetFile*`   | Unknown.                                                                            |
?                       |  `0xD8`        | `ModelSet2*`       | Unknown Model Set.                                                                  |
Runway                  |  `0xDC`        | `RunwayGT4*`       | Runway for the course. Collision tree, checkpoints, sectors, grid, etc.             |
Padding                 |  `0x2C`        | `byte[0x20]`       | Padding to 0x100.                                                                   |












