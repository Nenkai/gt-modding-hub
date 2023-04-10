# Image Editing

PS3-era and even GTPSP uses [TXS3](../formats/texture/img_txs3_textureset3.md) for its image format, which is pretty much just DDS.

[TXS3Converter](https://github.com/Nenkai/TXS3Converter/releases) can convert standard images (.png, .jpg, etc) into that format. Download it and extract it.

!!! warning "TexConv"
    You'll also need to download and place [TeXConv](https://github.com/microsoft/DirectXTex/releases) in the same folder. It is used by TXS3Converter to convert images into DDS first.

Most of the textures in the game are located in the `piece` global folder, and in [`GPB`](../formats/adhoc/gpb_gpbdata.md) containers.

---

## .img to .png

Open `cmd` in that folder and place your `.img` file in the tool folder and then run the following command

``` markdown title="Converting to PNG"
TXS3Converter convert-png <path_to_your_file>
```

!!! tip
    If you're converting back later on you might want to take note of the image format that the tool prints into the console.

---

## .png/jpg/bmp to .img

Open `cmd` in that folder and place your standard image in the tool folder. You need to know the format before hand. Converting a .img file to a normal image will show that.

``` markdown title="Converting to IMG (aka TXS3)"
TXS3Converter convert-img <path_to_your_file> --pf <DXT3/DXT5/DXT10>
```

