# Filesystem Mount Paths

Starting from GT5, some folders are accessed using shortcuts/mount paths for specific access.

* `APP_DATA` - writing to the data folder (`dev_hdd0/game/USRDIR` on PS3, encrypted).
* `APP_DATA_RAW` - same as above, decrypted. Not used in GT7.
* `APP_CACHE` - writing to the cache directory (`dev_hdd1` on PS3, encrypted).
* `APP_CACHE_RAW` - same as above, decrypted. Not used in GT7.
* `APP_CONTENT` - Unknown
* `APP_CONTENT_RAW` - Unknown, seen in GT Sport, not used in GT7
* `SYSTEM_ROOT` - Unknown, seen in GT Sport
* `SYSTEM_ROOT_RAW` - Unknown, seen in GT Sport, not used in GT7
* `APP_MS` - Memory Stick device (`dev_ms` on PS3), not used in later games
* `APP_USB` - USB device (`dev_usb` on PS3), not used in later games

## PS3 (GT6? specifics):

* `/app_home` - maps to `/`
* `/app_home/preview` - maps to `/preview`
* `/dlcontents` - ?
* `/viewer` - maps to `/programmer/ps3/viewer`

If `/home` is provided as fsroot argument on GT6, `/gt/gt6/target/ps3/current-debug%s` where `%s` is one of the following volume/game paths are mapped:

* `/car`
* `/carparts`
* `/carsound`
* `/character`
* `/crowd`
* `/effect`
* `/motion`
* `/movie`
* `/movies`
* `/scene`
* `/sky`
* `/sound_gt`
* `/specdb`
* `/tire`
* `/viewer`
* `/wheel`
