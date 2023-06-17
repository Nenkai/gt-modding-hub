# Textdata Editing (GT5)

Textdata refers to the `textdata` folder described on the [File Structure](./basics/file_structure.md) page. It is mostly a database for UI defined events, cars, items and more.

However, most of the files are only read **once**. The files are used to build a temporary SQLite database for performance. 

When the game boots for the first time or after an update, you may've seen the `Creating system files...` - this is when XML files are converted and inserted into an SQLite database at `USRDIR/db/system.db`. 

In order to update specific database tables, their version inside each respective [Adhoc](../concepts/adhoc/adhoc.md) scripts under `scripts/gt5/global_status/` must be updated. Otherwise, `system.db` can also be forcefully deleted to trigger GT5 to recreate a database.

---

## Arcade Car List (arcade_carlist.xml)

This file defines all the cars available in arcade mode.

Nodes can be either:

* `premium_car`
* `standard_car` (normally unused)
* `dirt_car`
* `racing_kart`

??? abstract "XML Attributes"
    Attribute | Description
    ------------ | -----------
    `code` | Car Label, from SpecDB's GENERIC_CAR
    `color` | Optional.

---

## Arcade Difficulties (arcade_difficulty.xml)

Defines the parameters for each arcade difficulty.

??? abstract "XML Attributes"
    Attribute | Description
    ------------ | -----------
    `name` | Name of the difficulty.
    `manual` | Whether manual transmission is available
    `simulation` | Whether skid recovery force is available
    `tire` | Whether tire changing is available
    `line` | Whether the driving line is available
    `ai_skill` | General AI skill
    `ai_skill_a` | AI skill (accelerating)
    `ai_skill_b` | AI skill (braking)
    `ai_skill_c` | AI skill (cornering)
    `boost_f` | Boost (Front)
    `boost_r` | Boost (Rear)
    `boost_fmin` | Boost Min (Front)
    `boost_fmax` | Boost Max (Front)
    `boost_rmin` | Boost Min (Rear)
    `boost_rmax` | Boost Max (Rear)
    `replace_at_courseout` | Whether the car is automatically reset after going out of course for a certain amount of time.

---

## Car List (carlist.xml)

*Parsed by `scripts/gt5/CarData.ad` for `t_car_data`*

This file defines all the cars available in the game, whether they are available in arcade mode, car dealer.

??? abstract "XML Attributes"
    Attribute | Description
    ------------ | -----------
    `code` | Car Label, from SpecDB's GENERIC_CAR
    `model` | Unused (not parsed).
    `car_dealer` | Whether this appears in the car dealership.
    `dlc` | Whether this car is DLC.

---

## Course List (courselist.xml)

*Parsed by `scripts/gt5/CourseData.ad` for `t_course_data`*

This file defines all the courses available in the game.

??? abstract "XML Attributes"
    Attribute | Description
    ------------ | -----------
    `name` | RText name from `CourseName` page
    `map` | Name of the map asset, for `piece/course_map_*`
    `code` | Course label, from SpecDB's COURSE
    `logo` | Name of the logo asset, for `piece/course_logo_*`
    `base_name` | Base Name
    `loading_bg` | Name of the loading background asset, for `piece/loading_bg`
    `online` | Whether the course is available online
    `category` | Type of course
    `length` | Course length (for display)
    `straight` | Longest straight (for display)
    `elevation` | Max elevation (for display)
    `corner` | Number of corners (for display)
    `direction` | ?
    `flag` | Display flag asset name
    `drift_ok` | Whether this course allows drifting
    `oval` | Whether this is an oval course
    `has_reverse` | Whether this course has a reverse option
    `entry_max` | Maximum entries allowed on this course
    `entry_max_3d` | Maximum entries allowed on this course while stereoscopic 3D is enabled
    `dlc` | Whether this course is DLC
    `kart_ok` | Whether karts are allowed on this course
    `kart_only` | Whether ONLY karts are allowed on this course
    `rain_situation` | Whether this course allows rainy situations
    `night_situation` | Whether this course allows night situations
    `basetime_min` | ?
    `basetime_max` | ?
    `celsius_base0` |?
    `celsius_min0` | ?
    `celsius_max0` | ?
    `celsius_base1` |?
    `celsius_min1` | ?
    `celsius_max1` | ?

---

## Dealer List (dealerlist.xml)

Defines the dealers available in the premium dealership.

---

## Nurburgring Corners (corner_nurburgring.xml)

Defines the names of each corner of the nurburgring.

??? abstract "XML Attributes"
    Attribute | Description
    ------------ | -----------
    `v` | [VCoord](../concepts/courses/basics.md) - Meters into the track.
    `text` | Text to display when reaching the VCoord.

---

## Enemy List (enemy_*.xml)

Defines the cars to use when an event's generate type is set to `ENEMY_LIST`.

* `enemy_normalcar.xml` - Used when car category is `gtengine::CarCategory::NORMAL`.
* `enemy_normalcar_dirt.xml` - Used when car category is `gtengine::CarCategory::NORMAL`, and the track is dirt/snow track.
* `enemy_premium_normalcar.xml` - Used when car category is `gtengine::CarCategory::NORMAL` and for premiums.
* `enemy_premium_normalcar_dirt.xml` - Used when car category is `gtengine::CarCategory::NORMAL`, premium, and the track is dirt/snow track.
* `enemy_premium_normalcar_night.xml` - Unused.
* `enemy_racecar.xml` - Used when car category is **not** `gtengine::CarCategory::NORMAL`.
* `enemy_racecar_dirt.xml` - Used when car category is **not** `gtengine::CarCategory::NORMAL`, and the track is dirt/snow track.
* `enemy_premium_racecar.xml` - Used when car category is **not** `gtengine::CarCategory::NORMAL` and for premiums.
* `enemy_premium_racecar_dirt.xml` - Used when car category is **not** `gtengine::CarCategory::NORMAL` premium, and the track is dirt/snow track.
* `enemy_premium_racecar_night.xml` - Unused.

??? abstract "XML Attributes"
    Attribute | Description
    ------------ | -----------
    `code` | Car Label, from SpecDB's GENERIC_CAR
    `pp` | "Fake" Car PP. Can be used for rebalancing.

---

## Event Present (event_present.xml)

*Parsed by `scripts/gt5/EventPresentUtil.ad`, used by `scripts/gt5/global_status/GameRecord.ad` for `t_event_present`*

Defines the misc event presents/prizes.

??? abstract "XML Attributes"
    Attribute | Description
    ------------ | -----------
    `present_id` | Unique identifier for this present.
    `eventtype_id` | Event type.
    `argument0` | Argument 0
    `argument1` | Argument 1
    `argument2` | Argument 2
    `argument3` | Argument 3
    `argument4` | Argument 4
    `type_id` | Type
    `category_id` | Category of the present.
    `gameitem_id` | Game Item ID.
    `carcode` | | Car Label, from SpecDB's GENERIC_CAR (if applicable)
    `messagecode` | Message to show when acquiring the present.
    `function_name` | Trophy to unlock.

---

## Driver Names (lnames.txt)

*Parsed by `scripts/gt5/DriverNameUtil.ad` for `t_driver_names`*

Defines AI driver names. One line is `<First Name>,<Second Name>,?,Country ID`. Only the first name is used.

---

## Online Car Set (online_car_set.xml)

Defines the recommended car sets for online lobbies. 

??? abstract "XML Attributes"
    Attribute | Description
    ------------ | -----------
    `id` | Unique ID. From 10 to 127.
    `priority` | Sort order.
    `dirtsnow` | Whether this car set is allowed on dirt/snow courses.
    `file` | File name containing the cars for the specified car set, under the `online_car_set` folder.

!!! warning
    A maximum of 250 cars across all car sets can be used. The code handling the car set list is engine handled.

---

## Photo Travel (photo_travel.xml)

Defines and sets up photo travel positions.

---

## Present Car (presentcar.xml)

*Parsed by `scripts/gt5/GameItemData.ad` for `t_presentcar`*

Defines the car prizes.

??? abstract "XML Attributes"
    Attribute | Description
    ------------ | -----------
    `id` | Unique identifier.
    `gameitem_id` | Game Item ID linked to this present.
    `carcode` | Car Label, from SpecDB's GENERIC_CAR
    `item_code` | Item Code
    `color` | Car color index. `-1` is default.

---

## Shuffler (shuffler_*.xml)

Defines the cars in shuffle race mode.

??? abstract "XML Attributes"
    Attribute | Description
    ------------ | -----------
    `code` | Car Label, from SpecDB's GENERIC_CAR
    `pp` | "Fake" Car PP. Can be used for rebalancing.

---

## Used Car (usedcar.xml)

*Parsed by `scripts/gt5/UsedCarUtil.ad` for `t_usedcar`*

Defines the Used Car Dealership listings.

??? abstract "XML Attributes"
    Attribute | Description
    ------------ | -----------
    `color` | Car color index. `-1` is default.
    `odometer_min` | Minimum kilometers this car can have. Random between this and  `odometer_max`.
    `odometer_max` | Minimum kilometers this car can have. Random between `odometer_min` and    this.
    `odds_start` | Minimum integer of the randomized value which this car will be chosen to     appear.
    `odds_end` | Maximum integer range of the randomized value which this car will be chosen    to appear.
    `code` | Car Label, from SpecDB's GENERIC_CAR
    `price` | Price of the car, when it appears.
