# Volume

Volumes are an important part of how Gran Turismos are built - it usually is a single file hosting all of the games's contents. It is usually compressed, but also encrypted and has been present in various forms since GT1.

Building game contents into volumes/file system allows control over files are read. It is more performance efficient to seek throughout the file to access contents than make a request to the console's [kernel](https://en.wikipedia.org/wiki/Kernel_(operating_system)) to open a file.

As of GT7, tools to extract volumes exist for all games:

* GT2 (`GT2.VOL`): 
    * [GTVolTools](https://github.com/adeyblue/GTVolTools/releases) by [adeyblue](https://github.com/adeyblue)

* GT3 (`GT3.VOL`): 
    * [GTVolTools](https://github.com/adeyblue/GTVolTools/releases) by [adeyblue](https://github.com/adeyblue)
    * [GTVolExtractor](https://github.com/pez2k/gt2tools/tree/master/GT3VOLExtractor/GT3VOLExtractor) by [pez2k](https://github.com/pez2k)

* GT4 (`GT4.VOL`):
    * [GT4FS](https://github.com/Razer2015/GT4FS) by [Razer2015](https://github.com/Razer2015), [Nenkai](https://github.com/Nenkai), [pez2k](https://github.com/pez2k) & others

* GT5/GT6 (`GT.VOL/PDIPFS`)
    * [GTToolsSharp](https://github.com/Nenkai/GTToolsSharp) by [Nenkai](https://github.com/Nenkai)
    * [gttool](https://github.com/flatz/gttool) by [flatz](https://github.com/flatz) (no PDIPFS support)

* GT Sport (`gt.idx`)
    * [GTToolsSharp](https://github.com/Nenkai/GTToolsSharp) by [Nenkai](https://github.com/Nenkai)
    * [gttool](https://github.com/flatz/gttool) by [flatz](https://github.com/flatz)

* GT7 (`gt.idx`, 1.00 Only)
    * [GTToolsSharp](https://github.com/Nenkai/GTToolsSharp) by [Nenkai](https://github.com/Nenkai)
    * [gttool](https://github.com/flatz/gttool) by [flatz](https://github.com/flatz)