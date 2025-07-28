---
icon: material/animation-play
---

# :material-animation-play: Strobe (STRB) Flash Animation

:octicons-cpu-24: *Applies to: >=GT4* · :material-file-question: Extension: `.strb` · :octicons-arrow-right-16: Endian: Little

Strobe Files are [Flash Player](https://en.wikipedia.org/wiki/Adobe_Flash_Player) (yes..) animations that was introduced in GT4. In GT4, they are primarily used for car dealership background animations, championship menu background fade-in/out animations. In GT5 and above, they are used for car interior dashboards (including 7!).

Strobe files are executed by a custom flash runtime (with the `strobe` namespace internally) and supports most of the original flash features (albeit with a subset of the scripting functions). It follows most of the general [SWF Specification](https://open-flash.github.io/mirrors/swf-spec-19.pdf) ([archived](https://web.archive.org/web/20250404201814/https://open-flash.github.io/mirrors/swf-spec-19.pdf)) in terms of functionality, though the file layout itself is reshaped to be more inline with Polyphony Digital's general format standards. Regular image references are TextureSets for example.

Strobe files were likely authored using ActionScript 2.0 with Macromedia Flash 8 during GT4's development (and Adobe Flash >CS3 / Adobe Animate in newer games). Hints in GT4's [GpbData](adhoc/gpb_gpbdata.md) contain file paths with their original `.swf` extension. This is enough information to speculate that `.swf`'s were directly converted to `.strb` with a post-processing tool.

Links for the aforementioned tools can be accessed [here](https://www.reddit.com/r/flash/comments/1i77raq/official_direct_download_links_for_flash_cs3_to/). Adobe takes extensive measures to take down installers hosted on archive.org, despite being total abandonware (and without serials even).

:material-arrow-right: [010 Editor Template](https://github.com/Nenkai/GT-File-Specifications-Documentation/blob/master/Formats/Shared/STRB_Strobe.bt)