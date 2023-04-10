# Music Tracks

Gran Turismo 5 and 6 store track streams in Sony [SGXD](../formats/audio/sgd_sgh_sgx_data.md) containers.

---

## Playback
[Foobar2000](https://www.foobar2000.org/) with the [VGMStream](https://github.com/vgmstream/vgmstream-releases/releases) plugin can be used to stream and play contents of a SGD file.

---

## Creating a music track

### Requirements

* [SGXDataBuilder](https://github.com/Nenkai/SGXDataBuilder) to create SGXD containers
* [GTMusicLibraryEditor](https://github.com/Nenkai/GTMusicLibraryEditor) to edit BGML files
* (Optional) [VagConvSharp](https://github.com/Nenkai/SGXDataBuilder/releases) to create Sony/PS-ADPCM `.vag` audio streams for sound effects

### Building an SGX Audio Container
First, open `SGXDBuilder.GUI.exe`. From here, you can import an audio source from standard formats (refer to the [format specification](../../formats/audio/sgd_sgh_sgx_data/#sgdhb-sgx-data) for the supported formats).

!!! tip
	An SGX container can contain multiple audio streams (of different formats too!) that the game can then address.

Once you've added your audio sources, you can hit `Export to SGD` to output SGX aka `.sgd` files.

#### SFX
If you are creating SFX, it is recommended that you use `.vag` as the file format as it is the most suited both in compression and file size. You can use [VagConvSharp](https://github.com/Nenkai/SGXDataBuilder/releases) to create such files.

You can convert as such:

``` markdown title="Converting WAV to VAG"
VagConvSharp.exe <input_vag> <output_vag> [--name <optional, name>] [--loop <optional, whether to loop>]
```

### Registering tracks into the game

Fire up the BGML editor (`GTBGMLibraryEditor.exe`) and open `sound_gt\library\<lib_file>.lib`. 

From here, you can edit track listings, add or remove tracks and playing groups. From here you would add a new entry with the file name of your newly created SGX file.

Once that's done, just save the library file.

!!! warning
	Your newly added track may not show up in the track list in-game, that's because the initial list is created when the game is booted and stored in the save. It is not yet known how to alert the game to update the list.




