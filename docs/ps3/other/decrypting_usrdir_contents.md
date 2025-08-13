# Encrypting/Decrypting USRDIR/dev_hdd1 contents

Files written to `USRDIR` (aka `APP_DATA` for `USRDIR` or `APP_CACHE` aka `dev_hdd1` from the game/adhoc) are automatically encrypted using a variant of the volume encryption.

!!! note

    This does NOT apply to the `PDIPFS` folder or `eboot.bin`. Files written/read using the `APP_DATA_RAW` or `APP_CACHE_RAW` path are also NOT encrypted.

Using `GTToolsSharp`, you can encrypt/decrypt most of these files using the following command:

```
GTToolsSharp crypt -i <input_file> -g <key_game_code>
```

* Change `<input_file>` to the path of the file
* Change `<key_game_code>` to one of the games available in the `keys.txt` file from GTToolsSharp.

!!! tip

    Movies that would have been downloaded from GTTV are effectively encrypted twice (volume file layer + movie crypt layer). In that case, run the `crypt` command first, then the `cryptmovie` command with the movie's encryption key (most are listed in the [Builds](../builds/game_builds.md) pages).
 
## GT5P Variant

GT5P Games (and likely older) use a different twist to the algorithm and use the game code as a seed to generate a key instead.

Use this command instead:

```
crypt -i `<input_file>` -g <key_game_code> --keyset-seed-override <game_code> --alternative
```

Along with the first two arguments, replace `game_code` with the game code of the **physical** release.

So for instance, the GT5P EU Spec III version would be `BCES-00104`. If you use the PSN version (NPUA-00050), you **also** use `BCES-00104`.

!!! example "Example: Decrypting a movie from GT5P EU Spec III"

    `crypt -g GT5P_DISC_EU -i grim\file\tv_de_15.xml --keyset-seed-override BCES-00104 --alternative`