# Movies

Movies in PS3's GTs uses PAMF, a Sony format.

## Movie Playback

### Decryption
Movies are normally encrypted using Salsa20. Assuming you've found the key in Base64 format (or hex), you can use GTToolsSharp to decrypt it.

!!! note
    In GT6, the keys for movies can be found in the `database/gt6/menudb.dat` SQLite database, in the `t_movie` table.

```markdown title="Decrypt command"
GTToolsSharp cryptmovie -i <movie_file_path> -k <key as base64 string, or hex string>
```

If decrypted successfully the file header should show `PAMF`.

### PAMF playback
PAMF Tools from PS3 SDK is required, you will have to find that yourself.

After that, you can use `PS3StreamViewer` to open and play a movie file.

## Movie Creation

### Requirements
- [FFmpeg](https://ffmpeg.org/download.html), used to convert a video to the appropriate pixel format
- PAMF Tools from PS3 SDK (you will have to find that yourself)
- A source video to convert to PAMF.

To convert to PAMF you will need to prepare your input video into specific formats. 

### Video
Video material file should be in `.avi`, in YUV2 format. This can be done in ffmpeg through the following command:

``` markdown title="Converting to YUV2 with FFmpeg"
ffmpeg -i <input_file> -b:v <bit_rate> -pix_fmt yuv420p <output_file>
```

Where:

* `input_file` is your original video file
* `bit_rate` is the target video bit rate, which should match the original video file - this will control the quality of the converted video. `Example: 2200k` for 2200 kbits
  * You can run `ffprobe <input_file>` to find out the original bit rate, example: `"Duration: 00:00:42.66, start: 0.000000, bitrate: 2113 kb/s"`
* `<output_file>` is the output file, **which must ends by .avi**. Example: `output_video.avi`

### Audio Track
You also need to extract the audio track from the original video unless you already have it seperated.
This is done with:

``` markdown title="Extracting the audio track"
ffmpeg -i <input_file> -vn -acodec pcm_s16le -ar 48000 -ac 2 <output_file>
```

Where:

* `input_file` is your original video file
* `<output_file>` is the output file, **which must ends by .wav**. Example: `output_audio.wav`

!!! tip
    You can (and should) also tweak the ffmpeg arguments to your requirements/liking.

### Creating the PAM
Now that you (hopefully) have one AVI, and one WAV file, you can proceed to create the PAM file.

* Open *PS3 Stream Composer*.
* In `File`, click on `New`.
* Fill in `Clip Name` and `Project Name` with anything you want, then press `Next`. Tweak anything if you need to after that, and/or just press `Finish`.
* On the left, you should see a pane named `Clip Setting`. Expand `Video`, then you should be able to see `Stream #1`. Right click on it, then click on `Video Source Setting`.
* Click `Open`, then select the AVI file you made earlier. If everything is correct your should be able to see the video lengths and some other details. Press `OK`.
* Now in the `Clip Setting` pane, Expand `Audio`, right click on `Stream #1` and click on `Audio Source Setting`.
* Same thing here, open then select your WAV file you made earlier, then `OK`.
* Both should now display as `Not Encoded`.
* At the top bar, look for `Run`, then click on `Encode + Multiplex + PAMF Compose`. This will create your `PAMF` file. Depending on your PC specs, this may take a while.
* Once done, PAMF file should be created. In File Explorer, head to Documents, then `PLAYSTATION(R)3 Stream Composer\MuxWork\<project_name>\<project_name>`.  If you see a PAM file, you're done.

### Encrypting the file

TODO