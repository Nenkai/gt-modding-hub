---
icon: material/database
---

# :material-database: SpecDB - Car Specification Database

!!! tip
    Refer to the [SpecDB](../concepts/specdb.md) concept documentation first.

Gran Turismo 4/5/PSP uses their own formats, which can be edited with the [SpecDB Editor](https://github.com/Nenkai/GT-SpecDB-Editor). It is also possible to convert said databases to SQLite for easier browsing.

!!! note "GT6"
    Gran Turismo 6 uses SQLite which can be edited with any SQLite editor such as [SQLiteStudio](https://sqlitestudio.pl/), it is required to decrypt it before viewing and editing it.

    To decrypt it, use [GTToolsSharp](https://github.com/Nenkai/GTToolsSharp), decrypting **and** re-encrypting the SpecDB is done through one single command:
    ```
    GTToolsSharp cryptsalsa -i DB0106.dat --key 2D9EE83E63120EB25DF4981EE73C3BE194D0F059DE50C8D4FCB66C10D3EDC549
    ```

    This command will decrypt or encrypt the SpecDB file using the specified key. 
    !!! tip 
        This key is normally found in `scripts/gt6/SpecDatabaseUtil.ad`. 

### Important Information
* The model code i.e `00080012` is made up of 2 parts, the first 4 digits being the maker, `0008` being Polyphony Digital, and the last 4 being the car's code.
* To link all part upgrades of a car in GT5, files named `PartsInfo.tbd` and `PartsInfo.tbi` are used. They are important as without them, going into car tuning settings will softlock due to missing parts. The SpecDB Editor will allow you to rebuild it.

### Adding a Car to the game (from an existing model)
TODO

!!! tip "Checklist"
    * `car/race/<model_file>` model must exist or creating a car thumbnail, or going into a race will hard crash the game.
    * Ensure that NumColors in `GENERIC_CAR` matches the amount of linked rows in `VARIATION` or the Dealership will softlock.
    * Ensure that `CHASSIS` is properly linked and has valid data or the garage/race screen will stay black upon loading.
    * Ensure that `WHEEL` has existing model files in the `wheel` folder.
    * Ensure that every part in `DEFAULT_PARTS` actually links to part row that exists.
    * Ensure that the model code in `MODEL_INFO` is correct or the dealership will not display the car and softlock upon exiting.