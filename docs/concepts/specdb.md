# SpecDB

The SpecDB is the name of the database that Polyphony Digital uses to store all car specifications, and other critical entities such as courses. Its structure is the same as an ordinary database.

Most tables represent a distinct car part. Some other tables such as `COURSE` defines the courses available in the games.

## Important Information
* Car codes are the car's row ID in `GENERIC_CAR`.
* `label` is what the game uses to identify a car.
* `category` column is the part's upgrade level. 


### Torque Modifiers
`torquemodifier`s determine how much a part increase the torque output of a car in %. 100/1000 is 100%, no changes.

For each table that the game reads the multiplier is applied to the car's value as such `CurrentTorqueMultiplier = (CurrentTorqueMultiplier * TableTorqueMultiplier) / 100`

??? tip "Table row load order for setting up a car (for GT4, crossed tables do not have a torque modifier)"
    * ~~`BRAKE`~~
    * ~~`BRAKECONTROLLER`~~
    * ~~`STEER`~~
    * ~~`CHASSIS`~~
    * `ENGINE`
    * ~~`DRIVETRAIN`~~
    * ~~`GEAR`~~
    * ~~`SUSPENSION`~~
    * ~~`LSD`~~
    * ~~`FRONTTIRE`~~ + (TIRECOMPOUND, TIRESIZE & TIREFORCEVOL)
    * ~~`REARTIRE`~~ + (TIRECOMPOUND, TIRESIZE & TIREFORCEVOL)
    * ~~`LIGHTWEIGHT`~~
    * ~~`RACINGMODIFY`~~
    * `PORTPOLISH`
    * `ENGINEBALANCE`
    * `DISPLACEMENT`
    * `COMPUTER`
    * `NATUNE`
    * `TURBINEKIT`
    * ~~`FLYWHEEL`~~
    * ~~`CLUTCH`~~
    * ~~`PROPERLLERSHAFT`~~
    * `MUFFLER`
    * `INTERCOOLER`
    * `SUPERCHARGER`
    * ~~`ASCC`~~
    * ~~`TCSC`~~
    * ~~`BALLAST`~~
    * ~~`WING`~~
    * ~~`NOS`~~
    * ~~`VARIATION`~~

---

## Database Tables

The most important tables are [`GENERIC_CAR`](#generic_car) and `DEFAULT_PARTS`.

??? note "Mandatory table rows for a car (click to expand)"

    * `GENERIC_CAR`
    * `DEFAULT_PARTS`
    * `BRAKE`
    * `BRAKECONTROLLER`
    * `STEER`
    * `CHASSIS`
    * `ENGINE`
    * `DRIVETRAIN`
    * `GEAR`
    * `SUSPENSION`
    * `LSD`
    * `FRONT/REARTIRE` (+ `TIRESIZE`, `TIRECOMPOUND`, `TIREFORCEVOL`)
    * `RACINGMODIFY` (GT4)
    * `TURBINEKIT`
    * `ASCC`
    * `TCSC`
    * `VARIATION`
    * `MODEL_INFO` (GT6)
    * `CAR_NAME` If you want a name
    * `CAR_CUSTOM_INFO` (GT6).

| <div style="width:150px">Table Name</div> | Description
|:--------------------:| -------------| 
`AIR_CLEANER`          | Defines all Air Filter tuning parts.
`ARCADEINFO_NORMAL`    | Defines all possible AI arcade entries. 
`ASCC`                 | Defines all ASM parts.
`BOOST_CONTROLLER`     | Defines all boost controller parts. (for >=GT5)
`BRAKE`                | Defines all brake tuning parts.
`BRAKECONTROLLER`      | Defines all brake controller parts.
`CAR_CUSTOM_INFO`      | Unknown.
`CAR_NAME_*`           | Defines all names for cars for each region. The row ID is and should be linked to the ID in `GENERIC_CAR`.
[`CAR_VARIATION_*`](#car_variation)      | Mainly used for GT4, this defines all car label/model mappings for each region.
`CATALYST`             | Defines all catalyst tuning parts.
`CHASSIS`              | Defines chassis specifications such as dimensions, mass, and weight bias.
`CLUTCH`               | Defines all clutch parts.
`COMPUTER`             | Defines all ECU tuning parts.
`COURSE`               | Defines all courses in the game. In GT5, `courselist.xml`, the arcade and freerun xmls refer to it using their labels. In GT6, menudb refers to it for available arcade courses.
`COURSE_NAME_*`        | Defines the course names for `COURSE`. (for GT4)
`DEFAULT_PARAM`        | Defines all the default part settings for each car.
`DEFAULT_PARTS`        | This is the second most important table. Defines all the pre-installed parts for a car. Each column will point to a part table's row ID.
`DISPLACEMENT`         | TODO
`DRIVETRAIN`           | Defines all drivetrain parameters.
`ENEMY_CARS`           | Defines all enemy/AI cars, **this can be used in place of GENERIC_CAR for defining cars**. (a GENERIC_CAR row is still needed to use this. for GT4 only).
[`ENGINE`](#engine)    | Defines all engine display/simulation specfications and assigns sound IDs to engines for `carsound` entries.
`ENGINEBALANCE`        | Defines all engine balance parts. (for GT4)
`EXHAUST_MANIFOLD`     | Defines all exhaust manifold parts.
`FLYWHEEL`             | Defines all flywheel parts.
`FRONTTIRE`            | Defines all front tire parts.
[`GEAR`](#gear)        | Defines all transmission parts such as number of gears, gear ratios, and whether or not a given transmission has customisable/auto ratios.
[`GENERIC_CAR`](#generic_car)  | This is the most important table of the SpecDB. This is where cars are defined as a whole along with their metadata. The default parts column is used to link a car to its default parts installed using the Row ID. You may also find the horn sound ID, price of the car, country, maker (manufacturer) and some car specific flags.
`GENERIC_ITEMS`        | Mainly used for GT5, this defines all the available items in the game, which then the gameitem xmls will use. **Note:** GT5 has a hardcoded limit of 280 horns.
`INDEP_THROTTLE`       | TODO
`INTAKE_MANIFOLD`      | Defines all intake manifold parts.
`INTERCOOLER`          | Defines all intercooler parts.
`LIGHTWEIGHT`          | Defines all lightweight parts.
`LSD`                  | Defines all differential parts.
`MODEL_INFO`           | Defines all the available models for each car. Row ID's are directly linked to the car's row in `GENERIC_CAR`. (for >=GT5)
`MUFFLER`              | Defines all exhaust upgrade parts. Categories are used to determine which subfolder is searched in `carsound`.
`NATUNE`               | Defines all naturally aspirated tuning parts.
`NOS`                  | Defines all nitrous parts.
`PORTPOLISH`           | Defines all port polishing parts. (for GT4)
`PROPELLERSHAFT`       | Defines all propeller shaft parts.
`RACE`                 | Defines all races in GT4. Label must match a certain pattern.
`RACINGMODIFY`         | Defines racing modifications (GT5), aero/chassis data (GT4).
`REARTIRE`             | Defines all rear tires.
`STEER`                | Defines steering assist parameters.
`SUSPENSION`           | Defines all suspension parts.
`TCSC`                 | Defines traction control parts.
`TIRECOMPOUND`         | Defines tire compounds. Used by FRONTTIRE and REARTIRE.
`TIREFORCEVOL`         | Defines tire force volumes.
[`TIRESIZE`](#tiresize)             | Defines tire sizes. Used by FRONTTIRE and REARTIRE.
[`TUNER_LIST`](#tuner_list)           | Defines which tuner/dealer you can go to to upgrade a car in GT4.
`TURBINEKIT`           | Defines all the turbos.
[`VARIATION`](#variation) | Defines all the car paint colors (and models, for GT4).
`WHEEL`                | Defines all the wheels.
`WING`                 | Defines all the wings. (for GT4, maybe GT5P)

---

### CAR_VARIATION
:material-check: *Applicable to: GT4 / TT*

Links a car to a [VARIATION](#variation) row.

??? info "Table (click to expand)"
    |     Column          |  Data Type    | Description
    | --------------------| ------------- | ----------- | 
    `Label`               | String        | The human-readable reference name for the car. Must match with the car to search.
    `VariationID`         | Int           | ID matching [VARIATION](#variation).

---

### ENGINE
:material-check: *Applicable to: GT4 and above*

**ENGINE** defines all the car engines/parts.

??? info "Table (click to expand)"
    |     Column          |  Data Type    | Description
    | --------------------| ------------- | ----------- | 
    `Label`               | String | The human-readable reference name for the part. Matching this to the GENERIC_CAR label isn't mandatory, but keeps things simple.
    `Displacement`        | String | The engine's displacement capacity. Formatted as cubic capacity (e.g. `4965cc`) for piston-driven engines, and (cc * rotors) (e.g. `654x2cc`) for rotor-driven engines. Blank/hidden values are `- cc`.
    `EngineType`          | String | The engine's layout, used for dealership stat displays (e.g. `L4` for inline 4, `Boxer6` for flat 6, `Rotor2` for 2-rotor, `V6`,   `V10`, etc. and `-` for blank/hidden).
    `Cam`                 | String | The camshaft/valve type if applicable. Overhead cams and valves are listed as their abbreviation, e.g. `DOHC` or `OHV`. `Rotary` is listed in full, and blank/hidden is `-`.
    `Aspiration`          | String | The aspiration type of the engine, used for dealership stat displays and possibly event restrictions. `NA`, `TURBO` (and `TUBRO` for the Lancer Evolution III), `SuperCharger`, and `-` are used. Twincharged cars are not supported, so cars such as the Lancia Delta S4 are listed as turbo.
    `psrpm`               | String | Display stat. The RPM at which peak power is achieved.
    `torquerpm`           | String | Display stat. The RPM at which peak torque is achieved. As this is a string value, ranges such as `2500-6000` are supported where required (e.g. turbo cars)
    `soundNum`            | UShort | The ID for this engine's sound, mapped to files like `carsound\xxxx\12345`, where xxxx is the folder for normal or turbo engines split by exhaust upgrade level.
    `psvalue`             | Short  | Display stat. The engine's peak mechanical horsepower (PS). Converted to other units in-game depending on region/language  settings. Combines with `psrpm` to produce readouts such as `Power:301HP/5600rpm`.
    `torquevalue`         | Short  | Display stat. The engine's peak torque (kgm*100). Converted to other units in-game depending on region/language settings. Combines     with `torquerpm` to produce readouts such as `Torque:339.22ft.lb/2700-4250rpm`.
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

---

### GEAR
:material-check: *Applicable to: GT4 and above*

**GEAR** defines all the car transmission mechanisms/parts.

??? info "Table (click to expand)"
    |     Column                  |  Data Type    | Description
    | ----------------------------| ------------- | ----------- |
    `Label`                       | String        | The human-readable reference name for the part. Matching this to the GENERIC_CAR label isn't mandatory, but keeps   things simple.
    `Gear(1st through 11th)`      | Short         | The gear ratio for a given gear. Multiplied by 100, so a specdb value of `3595` is a ratio of `3.595`.
    `GearReverse`                 | Short         | The reverse gear ratio. Multiplied by 100.
    `finalgearMIN`                | Short         | The minimum value allowed for the final drive ratio when tuning gear ratios.
    `finalgearMAX`                | Short         | The maximum value allowed for the final drive ratio when tuning gear ratios.
    `finalgearDF`                 | Short         | The default value for the final drive ratio when tuning gear ratios.
    `ExtraFinalGearRatio`         | Short         | Specifies an alternative final drive ratio where applicable (for cars with two output shafts such as the 2005   Volkswagen Golf GTI).
    `Price`                       | Short         | How much the part costs to buy if not stock.
    `category`                    | Byte          | The upgrade level of a transmission part.
    `geartype`                    | Byte          | Which type of gearbox behaviour to use. Refer to [Gear Type Enum](#gear-type-enumeration)
    `Nshift`                      | Byte          | Number of gears (forward). This also reflects how the driver shifting animations operate.
    `gearflag`                    | Byte          | Determines whether or not to calculate the gear ratios automatically. `0` is used for road cars with specified  real-world ratios, `1` is used for most race cars and upgraded gearboxes. `2` is unknown and only used on the 1954 Chevrolet Corvette which has two gears and    real-world defined ratios. `AutoGearRatio_Generate` is called if the flag is not `0`.
    `maxspeedMIN`                 | Byte          | The minimum value allowed for the `Auto` adjustment slider when tuning gear ratios.
    `maxspeedMAX`                 | Byte          | The maximum value allowed for the `Auto` adjustment slider when tuning gear ratios.
    `maxspeedDF`                  | Byte          | The default value for the `Auto` adjustment slider when tuning gear ratios.
    `ExtraFinalGearUsage`         | Byte          | Subtracted from `Nshift` to determine which gear the `ExtraFinalGearRatio` is used for. For example,    `ExtraFinalGearUsage` set to `2` and `Nshift` set to `6` means that the ratio specified in `ExtraFinalGearRatio` will apply from 4th gear onwards.
    `LowGearPos`                  | Byte          | Used for rendering the driver animations. Likely related to shift animations, as it appears to only be set to `1`   for convertibles with a manual gearbox and `0` for everything else.
    `ReverseGearPos`              | Byte          | Used for rendering the driver animations. Similar assignments to `LowGearPos`, but has a larger range of possible   values (`0`, `6`, `8`, and `255`).
    `GearPattern`                 | Byte          | Used for rendering the driver animations. Refer to [Gear Pattern Enum](#gear-pattern-enumeration)

##### Gear Type Enumeration
??? abstract "Gear Type"

    !!! note
        Information based on GT7. Not all may be available in previous games.

    | Value | Name                   |
    |-------|------------------------|
    | `0`     | `GEAR_TYPE_CLASSIC`
    | `1`     | `GEAR_TYPE_LINEAR_CVT`
    | `2`     | `GEAR_TYPE_SPORTS_CVT`
    | `3`     | `GEAR_TYPE_TOYOTA_HYBRID`
    | `4`     | `GEAR_TYPE_RIGID`
    | `5`     | `GEAR_TYPE_TQ_CONV_AT`
    | `6`     | `GEAR_TYPE_DSG`
    | `7`     | `GEAR_TYPE_SCOOTER`
    | `8`     | `GEAR_TYPE_TC_SST`
    | `9`     | `GEAR_TYPE_F1_SEAMLESS`
    | `10`    | `GEAR_TYPE_KART_1AT`
    | `11`    | `GEAR_TYPE_NON_SYNCHRO`
    | `12`    | `GEAR_TYPE_TQ_CONV_AT_QK`
    | `13`    | `GEAR_TYPE_AMT`
    | `14`    | `GEAR_TYPE_NON_SYNCHRO_MT`

##### Gear Pattern Enumeration
??? abstract "Gear Pattern"

    !!! note
        Information based on GT7. Not all may be available in previous games.

    | Value | Name                   |
    |-------|------------------------|
    | `0`     | `DRIVER_GEAR_PATTERN_NO_USE`
    | `1`     | `DRIVER_GEAR_PATTERN_H`
    | `2`     | `DRIVER_GEAR_PATTERN_SEQUENTIAL`
    | `3`     | `DRIVER_GEAR_PATTERN_BUTTERFLY`
    | `4`     | `DRIVER_GEAR_PATTERN_AUTOMATIC`

---

### GENERIC_CAR

:material-check: *Applicable to: GT4 and above*

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

---

### TUNER_LIST

:material-check: *Applicable to: TT, GT4*

This table links a car to a list of tuners - tuners can tune the car.

??? info "Table (click to expand)"
    |     Column                  |  Data Type    | Description
    | ----------------------------| ------------- | ----------- |
    `Label`                       | String        | The human-readable reference name for the car. Must match from [GENERIC_CAR](#generic_car).
    `Maker(1 through 10)`                | Short         | Maker IDs. The list of makers is hardcoded in GT4/TT. 

??? abstract "Maker List (For GT4/TT)"
    ```
    Name        | ID
    ------------|----
    -           |  0
    acura       |  2
    alfaromeo   |  3
    astonmartin |  4
    audi        |  5
    bmw         |  6
    chevrolet   |  7
    chrysler    |  8
    citroen     |  9
    daihatsu    |  10
    dodge       |  11
    fiat        |  12
    ford        |  13
    gillet      |  14
    honda       |  15
    hyundai     |  16
    jaguar      |  17
    lancia      |  18
    lister      |  19
    lotus       |  20
    manufacturer|  21
    mazda       |  22
    mercedes    |  23
    mg_mini     |  24
    mitsubishi  |  25
    nissan      |  26
    opel        |  27
    pagani      |  28
    panoz       |  29
    peugeot     |  30
    polyphony   |  31
    renault     |  32
    ruf         |  33
    shelby      |  34
    subaru      |  35
    suzuki      |  36
    tickford    |  37
    tommykaira  |  38
    toyota      |  39
    tvr         |  40
    vauxhall    |  41
    volkswagen  |  42
    asl         |  43
    dome        |  44
    infiniti    |  45
    lexus       |  46
    mini        |  47
    pontiac     |  48
    spyker      |  49
    cadillac    |  50
    plymouth    |  51
    isuzu       |  52
    autobianchi |  53
    ginetta     |  54
    saleen      |  55
    vemac       |  56
    jayleno     |  57
    buick       |  58
    callaway    |  59
    dmc         |  60
    eagle       |  61
    mercury     |  62
    triumph     |  63
    volvo       |  64
    hommell     |  65
    jensen      |  66
    marcos      |  67
    scion       |  68
    cizeta      |  69
    fpv         |  70
    caterham    |  71
    ac          |  72
    bentley     |  73
    seat        |  74
    landrover   |  75
    holden      |  76
    nike        |  77
    au_ford     |  78
    chaparral   |  79
    autounion   |  80
    proto       |  81
    yamaha      |  82
    kawasaki    |  83
    aprilia     |  84
    mvagusta    |  85
    yoshimura   |  86
    moriwaki    |  87
    buell       |  88
    ducati      |  89
    _7honda     |  90
    ysp_presto  |  91
    trickstar   |  92
    ```
---

### TIRESIZE

TireSize defines tire sizes.

??? info "Table (click to expand)"
    |     Column                  |  Data Type    | Description
    | ----------------------------| ------------- | ----------- | 
    `Label`                       | String        | The internal name for the color. 
    `flatness`                    | Byte          | Tire profile.
    `unk`                         | Byte          | Unknown. Possibly category?
    `diameter`                    | Byte          | Rim Diameter. Divide by 10 for inches.
    `width`                       | Byte          | Tire Width. Multiply by 5 for millimeters.

So for example, `cougar_xr7_67`, which uses Tire Size ID `859` (Label: `sz209`) in GT4:

- Flatness: `12` (profile 60)
- Diameter: `150` (15 in.)
- Width: `51` (255mm)

**Tire Size = 255/60R15.**

---

### VARIATION

Variation defines all the colors available for the cars. In GT4, it is also responsible for linking to the model and the color patch. In later games, it has moved to [MODEL_INFO](#model_info).

In GT4, in order to get variation rows you would first need to obtain it from [CAR_VARIATION](#car_variation).

??? info "GT4 Table (click to expand)"
    |     Column                  |  Data Type    | Description
    | ----------------------------| ------------- | ----------- | 
    `Label`                       | String        | The internal name for the color. 
    `ModelCode`                   | String        | Code for the model to be used with the `car/` folder.
    `VarOrder`                    | UInt          | The display order of this paint color.
    `ColorPatchFileName`          | String        | Color patch file name to be used with the `car/`. Ends with a `.pat` extension.
    `Name`                        | String        | Paint color name.
    `ModelWidth`                  | Float         | Model Width.
    `ModelHeight`                 | Float         | Model Height.
    `ModelFront`                  | Float         | Model Front.
    `ModelRear`                   | Float         | Model Rear.
    `ModelProjection`             | Float         | Model Projection.
    `ColorChip(0 through 4)`      | UInt          | Color of the chip for the car (the color display rectangle for menus).
