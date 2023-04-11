# Fonts

Fonts use a custom vectored format that needs to be converted from to be usable.

---

## Converting to [`NVEC`](../formats/fonts/vec_nvec.md)

### Required Files
- [NVecBuilder](https://github.com/Nenkai/PDTools/releases/tag/nvecbuilder-1.0.0)
- A `.ttf` font

### Conversion & Usage
Simply run the tool as such:
``` { .yaml .annotate }
nvec_builder.exe <your_ttf_font> <output_vec_font> # (1)!
```

1.  * `<your_ttf_font>` should be replaced by the path to your TTF font 
    * `<output_vec_font>` should be a path for the output `.vec` font, created by the tool.

After that, drop the newly created font to `font/vec/` and edit each `fontset_*.txt` file to add the following entries before `----[END]`:

```
----[MyFont] 360 700 1088
MyFontFile
```
`MyFont` is the name of the font and how it can be accessed from Adhoc or MProjects, while `MyFontFile` is the actual file name for the font.

!!! note
    It is recommended to edit the font before-hand to remove characters that you are unlikely to use - all fonts registered in `fontset_<region>.txt` are loaded at boot and will persist therefore taking up memory. 
    
    [FontForge](https://fontforge.org/) can be used to do so.
