# SG(D/H/B) - SGX Data

:octicons-cpu-24: *Applies to: GT5, GTPSP, GT6* · :material-file-question: Extension: `.sgd`/`.sgh`/`.sgb` / none · :octicons-arrow-right-16: Endian: Little

SGX is an audio playing library and format created by Sony used in a few games that have been developed, or published by them. PS3-era GTs and GTPSP makes use of them. 

There are 3 distinct formats:

``` { .yaml .annotate }
.sgd - SGX Sound container. Always starts with the `SGXD` magic.
.sgh - SGX Sound container header. This is the header only. # (1)!
.sgb - SGX Sound container data. This is the data only.
```

1.  These may be present inside [BGML files](bgml_bgm_library.md).

Multiple audio formats are supported in a SGX container:

* `.vag` - PS-ADPCM [PS3/PSP]
* `.ac3` - [AC3](https://en.wikipedia.org/wiki/Dolby_Digital) [PS3]
* `.at3` - [ATRAC3plus](https://en.wikipedia.org/wiki/ATRAC#ATRAC3plus) [PSP]
* `.wav` - [PCM 16 LE](https://en.wikipedia.org/wiki/WAV) [PS3]

---

## Playback
[Foobar2000](https://www.foobar2000.org/) with the [VGMStream](https://github.com/vgmstream/vgmstream-releases/releases) plugin can be used to stream and play contents of a SGD file.

---

## Building SGX files
[SGXDataBuilder](https://github.com/Nenkai/SGXDataBuilder) can be used to build these sort of files.

---

## Header

As this is a Sony format and not a PDI format, it has been mostly documented through a [010 Editor template :octicons-link-external-16:](https://github.com/Nenkai/SGXDataBuilder/blob/master/SGXLib.Shared/SGXD.bt) outside this repository.

!!! tip
    The header has been documented using debug symbols from Folklore PS3.
