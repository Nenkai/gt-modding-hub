# SpecDB - Car Specification Database
The SpecDB is the name of the database that Polyphony Digital uses to store all car specifications, and other extra things. 
Its structure is the same as an ordinary database.

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

## Database Tables

|     Table Name       | Description
| ---------------------| ------------- | 
`AIR_CLEANER`          | Defines Air Cleaning tuning parts.
`ARCADEINFO_NORMAL`    | Defines possible AI arcade entries.
`ASCC`                 | Defines ASM parts.
`BOOST_CONTROLLER`     | Defines all boost controller parts.
`BRAKE`                | Defines all brake tuning parts.
`CAR_CUSTOM_INFO`      | Unknown.
`CAR_NAME_*`           | Defines all names for cars for each region. The row ID is and should be linked to the ID in `GENERIC_CAR`.
`CAYALYST`             | Defines all catalyst tuning parts.
`CHASSIS`              | Defines chassis specifications.
`CLUTCH`               | Defines all clutch parts.
`COMPUTER`             | Defines all ECU tuning parts.
`COURSE`               | Defines all courses in the game. In GT5, `courselist.xml`, the arcade and freerun xmls refer to it using their labels. In GT6, menudb refers to it for available arcade courses.
`DEFAULT_PARAM`        | Defines all the default part settings for each car.
`DEFAULT_PARTS`        | Defines all the pre-installed parts for a car. Each column will point to a part table's row ID.
`DISPLACEMENT`         | TODO
`DRIVETRAIN`           | Defines all drivetrain parameters.
`ENGINE`               | Define engine specifications, and the sound number for that engine, which is then refered to the `carsound` folder.
`EXHAUST_MANIFOLD`     | Defines exhaust manifold parts.
`FLYWHEEL`             | Defines flywheel parts.
`FRONTTIRE`            | Defines all front tire parts.
`GEAR`                 | Defines all transmission parts.
`GENERIC_CAR`          | This is the most important table of the SpecDB. This is where cars are defined as a whole along with their metadata. The default parts column is used to link a car to its default parts installed using the Row ID. You may also find the horn sound id, price of the car, country, maker (manufacturer) and some car specific flags.
`GENERIC_ITEMS`        | Mainly used for GT5, this defines all the available items in the game, which then the gameitem xmls will use. Note for anyone who tries to add more horns, GT5 has an hardcoded limit of 280 on the EBOOT side.
`INDEP_THROTTLE`       | TODO
`INTAKE_MANIFOLD`      | Defines intake manifold parts.
`INTERCOOLER`          |  Defines all intercooler parts.
`LIGHTWEIGHT`          | Defines all lightweight parts.
`LSD`                  | Defines all differential parts.
`MODEL_INFO`           | Defines all the available models for each car. Row ID's are directly linked to the car's row in `GENERIC_CAR`.

TODO cover more tables

### Important Information
* Car codes are the car's row ID in `GENERIC_CAR`.
* `label` is what the game uses to identify a car.
* `category` column is the part's upgrade level. 
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
