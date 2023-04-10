# SpecDB

The SpecDB is the name of the database that Polyphony Digital uses to store all car specifications, and other critical things like courses in the game. Its structure is the same as an ordinary database.

Most tables represent a distinct car part. Some other tables such as `COURSE` defines the courses available in the games.

## Database Tables

|     Table Name       | Description
| ---------------------| ------------- | 
`AIR_CLEANER`          | Defines all Air Filter tuning parts.
`ARCADEINFO_NORMAL`    | Defines all possible AI arcade entries.
`ASCC`                 | Defines all ASM parts.
`BOOST_CONTROLLER`     | Defines all boost controller parts.
`BRAKE`                | Defines all brake tuning parts.
`CAR_CUSTOM_INFO`      | Unknown.
`CAR_NAME_*`           | Defines all names for cars for each region. The row ID is and should be linked to the ID in `GENERIC_CAR`.
`CAR_VARIATION_*`      | Mainly used for GT4, this defines all car label/model mappings for each region.
`CATALYST`             | Defines all catalyst tuning parts.
`CHASSIS`              | Defines chassis specifications such as dimensions, mass, and weight bias.
`CLUTCH`               | Defines all clutch parts.
`COMPUTER`             | Defines all ECU tuning parts.
`COURSE`               | Defines all courses in the game. In GT5, `courselist.xml`, the arcade and freerun xmls refer to it using their labels. In GT6, menudb refers to it for available arcade courses.
`DEFAULT_PARAM`        | Defines all the default part settings for each car.
`DEFAULT_PARTS`        | Defines all the pre-installed parts for a car. Each column will point to a part table's row ID.
`DISPLACEMENT`         | TODO
`DRIVETRAIN`           | Defines all drivetrain parameters.
`ENGINE`               | Defines all engine display/simulation specfications and assigns sound IDs to engines for `carsound` entries.
`EXHAUST_MANIFOLD`     | Defines all exhaust manifold parts.
`FLYWHEEL`             | Defines all flywheel parts.
`FRONTTIRE`            | Defines all front tire parts.
`GEAR`                 | Defines all transmission parts such as number of gears, gear ratios, and whether or not a given transmission has customisable/auto ratios.
`GENERIC_CAR`          | This is the most important table of the SpecDB. This is where cars are defined as a whole along with their metadata. The default parts column is used to link a car to its default parts installed using the Row ID. You may also find the horn sound ID, price of the car, country, maker (manufacturer) and some car specific flags.
`GENERIC_ITEMS`        | Mainly used for GT5, this defines all the available items in the game, which then the gameitem xmls will use. **Note:** GT5 has a hardcoded limit of 280 horns.
`INDEP_THROTTLE`       | TODO
`INTAKE_MANIFOLD`      | Defines all intake manifold parts.
`INTERCOOLER`          | Defines all intercooler parts.
`LIGHTWEIGHT`          | Defines all lightweight parts.
`LSD`                  | Defines all differential parts.
`MODEL_INFO`           | Defines all the available models for each car. Row ID's are directly linked to the car's row in `GENERIC_CAR`.
`MUFFLER`              | Defines all exhaust upgrade parts. Categories are used to determine which subfolder is searched in `carsound`.

### ENGINE
|     Column          |  Data Type    | Description
| --------------------| ------------- | ----------- | 
`Label`               | String | The human-readable reference name for the part. Matching this to the GENERIC_CAR label isn't mandatory, but keeps things simple.
`Displacement`        | String | The engine's displacement capacity. Formatted as cubic capacity (e.g. `4965cc`) for piston-driven engines, and (cc * rotors) (e.g. `654x2cc`) for rotor-driven engines. Blank/hidden values are `- cc`.
`EngineType`          | String | The engine's layout, used for dealership stat displays (e.g. `L4` for inline 4, `Boxer6` for flat 6, `Rotor2` for 2-rotor, `V6`, `V10`, etc. and `-` for blank/hidden).
`Cam`                 | String | The camshaft/valve type if applicable. Overhead cams and valves are listed as their abbreviation, e.g. `DOHC` or `OHV`. `Rotary` is listed in full, and blank/hidden is `-`.
`Aspiration`          | String | The aspiration type of the engine, used for dealership stat displays and possibly event restrictions. `NA`, `TURBO` (and `TUBRO` for the Lancer Evolution III), `SuperCharger`, and `-` are used. Twincharged cars are not supported, so cars such as the Lancia Delta S4 are listed as turbo.
`psrpm`               | String | Display stat. The RPM at which peak power is achieved.
`torquerpm`           | String | Display stat. The RPM at which peak torque is achieved. As this is a string value, ranges such as `2500-6000` are supported where required (e.g. turbo cars)
`soundNum`            | UShort | The ID for this engine's sound, mapped to files like `carsound\xxxx\12345`, where xxxx is the folder for normal or turbo engines split by exhaust upgrade level.
`psvalue`             | Short  | Display stat. The engine's peak mechanical horsepower (PS). Converted to other units in-game depending on region/language settings. Combines with `psrpm` to produce readouts such as `Power:301HP/5600rpm`.
`torquevalue`         | Short  | Display stat. The engine's peak torque (kgm*100). Converted to other units in-game depending on region/language settings. Combines with `torquerpm` to produce readouts such as `Torque:339.22ft.lb/2700-4250rpm`.
`torque(A through X)` | Short  | Simulation stat. Each lettered column is mapped to a `rpm(A through X)` column to produce this amount of torque (kgm^100) at a given RPM, building the torque curve of the engine (e.g. `torqueE` is the torque produced at `rpmE`).
`Category`            | Byte   | Unknown.
`dpsflag`             | Byte   | Unknown. Possibly related to downshift protection.
`shiftlimit`          | Byte   | The RPM at which the automatic transmission assist will shift up under full throttle. Values for this and all other RPM-related sim values are multiplied by 100 in game, so a `shiftlimit` of `65` means the redline starts at 6500rpm.
`revlimit`            | Byte   | The RPM at which the engine hits the rev limiter and will not rev any further. Also multiplied by 100 in game, so `70` means the rev limiter is hit at 7000rpm.
`Unk`                 | Byte   | Unknown. Possibly RPM related.
`clutchmeetrpm`       | Byte   | Not fully known. Seems to be `250` for almost every car except for some historic cars and the Tank Car.
`torquepoint`         | Byte   | How many `rpm/torque` points are used to build the torque curve. Maximum of 24 as each only goes from A to X.
`rpm(A through X)`    | Byte   | RPM values divided by 100 corresponding to `torque(A through X)` values. Can start from any value and jump up in any (or even inconsistent) intervals, but base game cars typically start at 10 or 15 (1000rpm and 1500rpm) and increase in intervals of 5 (500rpm).
`RedLine`             | Byte   | The RPM at which UI redline starts.
`MeterScale`          | Byte   | Unknown. All values are set to `0` in GT4.
`torquevol`           | Byte   | Unknown. Possibly a multiplier related to the engine's torque curve.
`GasConsumptionRate`  | Byte   | Unknown. As the name suggests this is related to fuel consumption, but every engine in GT4 has a value of `0` for this column, and the units/effects are unknown. Possibly unused.

### GEAR
|     Column                  |  Data Type    | Description
| ----------------------------| ------------- | ----------- |
`Label`                       | String        | The human-readable reference name for the part. Matching this to the GENERIC_CAR label isn't mandatory, but keeps things simple.
`Gear(1st through 11th)`      | Short         | The gear ratio for a given gear. Multiplied by 100, so a specdb value of `3595` is a ratio of `3.595`.
`GearReverse`                 | Short         | The reverse gear ratio. Multiplied by 100.
`finalgearMIN`                | Short         | The minimum value allowed for the final drive ratio when tuning gear ratios.
`finalgearMAX`                | Short         | The maximum value allowed for the final drive ratio when tuning gear ratios.
`finalgearDF`                 | Short         | The default value for the final drive ratio when tuning gear ratios.
`ExtraFinalGearRatio`         | Short         | Specifies an alternative final drive ratio where applicable (for cars with two output shafts such as the 2005 Volkswagen Golf GTI).
`Price`                       | Short         | How much the part costs to buy if not stock.
`category`                    | Byte          | The upgrade level of a transmission part.
`geartype`                    | Byte          | Which type of gearbox behaviour to use. `0` and `1` are both used on manual transmissions but the difference between the two is unknown. `2` is used to apply realistic smooth shifting to cars with torque converter automatics. `3` and `4` are unknown but may be related to hybrid cars as they are used on the Toyota Priuses and Triathlon car respectively. `7` is scooters. `0` or `2` means `CanShowGearChart` is true. `2` and `3` may be CVT. `1`, `3`, `4` and `7` are considered automatic only.
`Nshift`                      | Byte          | Number of gears (forward). This also reflects how the driver shifting animations operate.
`gearflag`                    | Byte          | Determines whether or not to calculate the gear ratios automatically. `0` is used for road cars with specified real-world ratios, `1` is used for most race cars and upgraded gearboxes. `2` is unknown and only used on the 1954 Chevrolet Corvette which has two gears and real-world defined ratios. `AutoGearRatio_Generate` is called if the flag is not `0`.
`maxspeedMIN`                 | Byte          | The minimum value allowed for the `Auto` adjustment slider when tuning gear ratios.
`maxspeedMAX`                 | Byte          | The maximum value allowed for the `Auto` adjustment slider when tuning gear ratios.
`maxspeedDF`                  | Byte          | The default value for the `Auto` adjustment slider when tuning gear ratios.
`ExtraFinalGearUsage`         | Byte          | Subtracted from `Nshift` to determine which gear the `ExtraFinalGearRatio` is used for. For example, `ExtraFinalGearUsage` set to `2` and `Nshift` set to `6` means that the ratio specified in `ExtraFinalGearRatio` will apply from 4th gear onwards.
`LowGearPos`                  | Byte          | Used for rendering the driver animations. Likely related to shift animations, as it appears to only be set to `1` for convertibles with a manual gearbox and `0` for everything else.
`ReverseGearPos`              | Byte          | Used for rendering the driver animations. Similar assignments to `LowGearPos`, but has a larger range of possible values (`0`, `6`, `8`, and `255`).
`GearPattern`                 | Byte          | Used for rendering the driver animations. Likely related to shifting animations but the actual nature of each value is unknown.

### GENERIC_CAR

??? info "GT4 Table (click to expand)"
    |     Column                  |  Data Type    | Description
    | ----------------------------| ------------- | ----------- | 
    `Label`                       | String        | The internal name for a car. Used throughout the game engine and Adhoc scripts to refer to a specific car.
    `DefaultParts`                | Int           | The row index for a car's DEFAULT_PARTS entry. Essentially used to actually build a car by assigning it to a bundle     of parts.
    `Price`                       | Int           | How much a car costs to buy. A value of 0 doesn't mark the car as free, but rather flags it as unbuyable. Also used     for internal calculations of sell price and mileage-based price reduction for cars available in the UCD.
    `Year`                        | Short         | The year a car was built. Used for event regulations.
    `RegulationDisplacementFlags` | Short         | Used for event regulations, values/units unknown.
    `Maker`                       | Byte          | The manufacturer of a car. Used for manufacturer-specific event regulations.
    `Category`                    | Byte          | Assigns cars to a certain "type". `0` = `NORMAL`, `1` = `RACING`, `2` = `TUNING`, `3` = `CONCEPT`. Equal or above to `100` is a car that is considered "strange" (e.g. Formula GT, Ford Model T, Nike One) - They have no body/engine/oil degradation and cannot be used in certain parts of the game (`You cannot advance past this point because <car> is a special car.`)
    `GeneralFlags`                | Byte          | Bit-level flags assigning certain characteristics to cars, used in bitwise operations. 
    `ConceptCarType`              | Byte          | Unknown. `Category` is used for concept car event restrictions, and `ConceptCarType` has some strange assignments, such as the Ford Model T being set to `4`. Appears to be completely unused/unread.
    `OpenModel`                   | Byte          | The convertible type of a car. Cars set to `1` have a closed top variant that allows them to enter regular 6-car races. Cars set to `2` do not, and can only enter 2-car races or time trials.
    `NoChangeWheel`               | Bool          | Restricts the ability to buy wheels in GT Auto.
    `NoChangeWing`                | Bool          | Restricts the ability to change wings in GT Auto.
    `SuperchargerOriginally`      | Bool          | Whether or not this car has a supercharger as standard. Likely used in tandem with aspiration flags to restrict entry to NA races.

    ??? info "GenericFlags bits (click to expand)"
        | Bit | Behavior if toggled
        | ----| ---------|
        `0`   | Makes a car unbuyable (`NotForSell`).
        `1`   | Hides the last `VARIATION` (colour) entry. Used for special colour cars and the black race cars.
        `2`   | Makes a car unable to enter races (`RaceForbidden`).
        `3`   | Hides a car's specs (`HideRealSpec`).
        `4`   | Marks a car as open top-only, meaning it has no closed roof variant and cannot enter typical races (`OpenCar`).
        `5`   | Marks a car as a test car, meaning it can only drive on the Nürburgring Nordschleife, Test Course, and Las Vegas drag strip (`TestCar`).