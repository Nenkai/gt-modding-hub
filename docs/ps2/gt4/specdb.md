# SpecDB - Car Specification Database

!!! tip
    Refer to the [SpecDB](../../concepts/specdb.md) concept documentation first.

Gran Turismo 4 was the first game to use Polyphony's proprietary format for SpecDB, which can be edited with the [SpecDB Editor](https://github.com/Nenkai/GT-SpecDB-Editor). It is also possible to convert said databases to SQLite for easier browsing.

!!! bug
    All database tables are compressed and stored in memory at boot. When a row is extracted, a row is decompressed, but not in-place. Compression uses a custom algorithm that has not been figured out, so the tool saves **ALL** the tables uncompressed. **GT4 can run out of memory** and display a [blue block](misc/loading_clock_colors.md) error.