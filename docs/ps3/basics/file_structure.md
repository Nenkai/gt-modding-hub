---
comments: true
---

## GT6 Folder Structure

### USRDIR Contents
```{ .sh .no-copy }
.
├─ USRDIR
│  ├─ db/
│  │  └─ userdb<VERSION>.dat     # Contains a cached sqlite file holding replay metadata & more other user contents
│  ├─ grim2/                     # Grim cached contents & responses
│  ├─ PDIPFS                     # Packed game contents (Polyphony Digital Patch File System)
│  ├─ TPPS-<VERSION>/            # Pending PDIPFS update to be applied to the game (Binary Patching), removed once applied
│  ├─ UPDATENODEINFO/            # Metadata on how a PDIPFS update should be applied
│  ├─ FIXEDELF114/               # Hack-fix from PDI to fix an incorrectly applied patch in 1.13
│  ├─ EBOOT.BIN                  # Bootstrap executable, boots EBOOT.SELF
│  ├─ EBOOT.SELF                 # Main executable (it is possible to replace EBOOT.BIN with this file)
│  └─ update.txt                 # Alerts the game of the current update for potential patching
│
...
```

### Volume Contents
The GT6 folder structure is nearly identical to the GT5 one, with a few changes to the `car`, and `scene` folder.
`textdata`'s events has been mostly moved to `game_parameter`
```{ .sh .no-copy }
.
├─ car/ # Car models & wheels for each car. Depends on ModelCode in MODEL_INFO table
│  └─ XXXX/ # Unique identifier for each manufacturer/tuner
│     └─ XXXX/ # Unique identifier for each car
│        ├─ hq/ # High quality model for menus
│        │  ├─ body # Model file
│        │  ├─ body_s # Streamed and compressed model data (polygons, etc)
│        │  └─ wheel # Wheel model
│        │
│        ├─ race/ # Model for races
│        │  └─ ..
│        │
│        ├─ info # Car information file (Camera positions & more)
│        ├─ interior # Interior model
│        └─ meter # Strobe/Animation file representing & emulating car speedometers/dash
│
├─ carparts/ # Model files for car parts
│  ├─ hq/ # High quality models
│  │  ├─ heXXX # Custom Rim Model - XXX is ID from 
│  │  ├─ htXXX # Custom Rim Model - If ID is >= 1000
│  │  ├─ weXXX # Wind End Model
│  │  ├─ wmXXX # Wind Mount Model
│  │  ├─ wpXXX # Wing Plane Model
│  │  └─ wsXXX # Wing Stays Model
│  │
│  ├─ race/ # Race models
│  │  └─ ..
│  │
│  ├─ image/ # Images for car parts
│  │  └─ [Undocumented files]
│  │
│  ├─ wheel_thumb/ # Wheel thumbnails
│  │  └─ XXX_YY # XXX = ID from WHEEL_EX, YY = Color Number (refer to NumColor in WHEEL_EX table) # WHEEL_EX stands for exchange
│  │
│  └─ wing_thumb/ # Wing thumbnails
│     └─XXX_YYY # XXX = Parts Type from CUSTOM_WING, YYY = PartsID from CUSTOM_WING table
│
├─ carsound/ # All car sounds (engine, turbo, horns, start). All IDs depends on soundNum from ENGINE table.
│  ├─ aes/ # Overrides any other specified sounds
│  ├─ engine/ # Engine sounds
│  ├─ normal0/ # Cars with no turbo, for the stock level exhaust (non#turbo includes supercharged and electric vehicles)
│  ├─ normal1/ # For the sport level exhaust
│  ├─ normal2/ # For the semi#racing level exhaust
│  ├─ normal3/ # For the racing level exhaust
│  ├─ se/ # Vehicle sound effects such as horns
│  ├─ start/ # Vehicle starter sounds (used when switching car)
│  ├─ turbo0/ # Turbocharged cars, for the stock level exhaust
│  ├─ turbo1/ # For the sport level exhaust
│  ├─ turbo2/ # For the semi#racing level exhaust
│  └─ turbo3/ # For the racing level exhaust
│ 
├─ character/
│  └─ [undocumented]
│ 
├─ crowd/ # Crowd packs for each course
│  └─ xYYYZZ # x = Course type, Y = CourseID, Z = unknown
│  
├─ crs/ # Course files
│  └─ XXXX # Course, from COURSE table
│     ├─ .ad # Autodrive file for AI driving
│     ├─ .cam # Camera positions & behavior
│     ├─ .cinf # Course Info (Drift sections & gps stuff)
│     ├─ .envptr # Environment Parameter (Mostly weather & time of day setup)
│     ├─ .envsky # Undocumented
│     ├─ .esp # Autodrive Special
│     ├─ .layout # Gadgets
│     ├─ .lv # Vision List
│     ├─ .lv0 # Vision List (Unknown)
│     ├─ .map # Minimap Model
│     ├─ .occluder # Unknown
│     ├─ .patch # Unknown
│     ├─ .road # Unknown
│     ├─ .rwy # Runway (Collision, road boundaries & surface)
│     ├─ .shapestream # ZLib Compressed & streamed mesh data
│     ├─ .sky # Unknown
│     ├─ .texstream # ZLib Compressed & streamed textures
│     ├─ .vvls # Unknown
│     └─ x # Main model "pack", lods, contains most crucial course definition
│  
├─ database/ # Database files
│  ├─ <branch_name>/
│  │  └─ menudb.dat # SQLite file handling most menu related data, Salsa encrypted by default
│  │
│  └─ gt6movie/
│     └─ caption.dat # SQLite file holding movie captions, Salsa encrypted by default
│ 
├─ description/ # Car descriptions
│  └─ <branch_name>/
│     └─ <2 char region code>.rt2 # Localization file
│
├─ effect/
│  └─ [undocumented]
│
├─ font/ # Game fonts, loaded at boot before adhoc
│  ├─ logo/ # Logos, which can be seen in the manual menu
│  │  └─ menu_imagefont.bin # Image container for all logos
│  │
│  └─ vec/ # Fonts as vector format
│     ├─ fontset_<REGION>.txt files # Defines all available fonts for use
│     └─ *.vec # Vector font # read based on each fontset definition
│
│	
├─ game_parameter/ # Game events & Autodemos
│  ├─ gp_cache/ # Serialized events from XML to binary # Names depends on whats inside each fgp
│  │
│  └─ <branch_name>/
│     ├─ arcade/ # Arcade events
│     ├─ autodemo/ # Autodemo files
│     ├─ events/ # GT Mode events, missions & more
│     └─ license/ # License events
│     
├─ icon/ # Save game icons
│  └─ <branch name>/
│     ├─ game_bg.png
│     ├─ game_icon.png
│     ├─ replay_sr_bg.png
│     └─ replay_sr_icon.png
│ 
├─ motion/
│  └─ [undocumented]
│ 
├─ movies/ # Movie files, in PAMF format (encrypted beforehand). Depends on t_movie table from menudb.
│   
├─ piece/ # Most game images
│
├─ products # Adhoc scripts & widgets defining all usable widgets as prototypes
│
├─ projects # All game menus.
│
├─ rtext # All localized game text (not car descriptions)
│  ├─ common # Common game text
│  └─ manual # Text for the manual menu
│ 
├─ scene/ # Scene data
│  ├─ misc/ # Miscellaneous data used by scenes
│  └─ script/ # Files that set up a scene. May be in text format, or EVS (EventSchedule) format. Names are found from SCENE_ALIAS table.
│ 
├─ scripts # Adhoc scripts.
│  └─ <branch_name>/
│     ├─ main.adc # First script executed on boot.
│     ├─ util/ # Utility scripts
│     └─ global_status/ # Defines save game nodes
│   
├─ sky 
│  └─ [undocumented]
│ 
├─ sound_gt # All game sounds
│  ├─ etc/ # Sound setup files
│  │  ├─ se_master.pmf # Controls volumes
│  │  └─ car_sound_gt5.pmf # Controls car sounds
│  │
│  ├─ guide/ # Additional sounds for events
│  │  ├─ moon # Moon sounds
│  │  └─ vettel # Vettel sounds
│  │
│  ├─ library/ # Defines soundtracks and playlists in the game
│  │  └─ GT6.lib # Main library file
│  │
│  ├─ se/ # All sound effects
│  └─ track/ # All musics. Vgmstream can play those.
│
├─ specdb/ # Car specification databases.
│  ├─ <NAME>
│     ├─ JP
│     │  └─ CarName.dat # Car name file for japanese
│     ├─ US
│     │   └─ CarName.dat Car name file (any other region)
│     └─ DBXXXX.dat # Main sqlite database file, normally salsa encrypted. XXXX is version (major, minor)
│
├─ ted/ # Track Editor samples
│  └─ <branch_name>
│     └─ .ted
│
└─ tire # Tire models
   ├─ hq/ # High quality tires, for menus
   └─ race/ # Tire models for race
```

## GT5 Folder Structure

### USRDIR Contents
```{ .sh .no-copy }
.
├─ USRDIR
│  ├─ course/          # Locally-saved course files
│  ├─ db/
│  │  └─ system.db     # Contains a cached sqlite file holding crucial game information (course listing, event listing & much more) 
│  │                   # This is translated from textdata's XMLs for performance
│  │                   # Only updated when the appropriate version in Adhoc scripts is incremented
│  │                   # Can be deleted to enforce an update (will lose all links to replays/photos/courses)
│  │
│  ├─ grim2/           # Grim cached contents & responses
│  ├─ pace/            # Cached pace files (GTTV tracker/torrent download) 
│  ├─ PDIPFS           # Packed game contents (Polyphony Digital Patch File System)
│  ├─ PDIPFS_bdmark    # Same structure as PDIPFS with dummy files, alerts whether to load files from the disk (bdmark) or not
│  ├─ photo/           # Locally-saved photo files
│  ├─ replay/          # Locally-saved replay files
│  └─ EBOOT.BIN        # Bootstrap executable, boots EBOOT.SELF
│
...
```

### Volume Contents
```{ .sh .no-copy }
.
├─ car/ # Car models & wheels for each car. Depends on ModelCode in MODEL_INFO table
│  ├─ decken/ # Textures for each sticker number
│  │
│  ├─ hq/ # High quality model for menus
│  │
│  ├─ race/ # Model for races
│  │
│  ├─ info/ # Car information file (Camera positions & more)
│  │
│  ├─ interior/ # Interior models
│  │
│  ├─ meter # Strobe/Animation file representing & emulating car speedometers/dash
│  │
│  ├─ thumbnail_M/ # Thumbnails for each car
│  │
|  ├─ wheel_thumb/ # Wheel thumbnails
│  │
|  ├─ cc.bin # Car Color
|  └─ cd.bin # Unknown
|
├─ carsound/ # All car sounds (engine, turbo, horns, start). All IDs depends on soundNum from ENGINE table.
│  ├─ engine/ # Engine sounds
│  ├─ normal0/ # Cars with no turbo, for the stock level exhaust (non#turbo includes supercharged and electric vehicles)
│  ├─ normal1/ # For the sport level exhaust
│  ├─ normal2/ # For the semi#racing level exhaust
│  ├─ normal3/ # For the racing level exhaust
│  ├─ se/ # Vehicle sound effects such as horns
│  ├─ start/ # Vehicle starter sounds (used when switching car)
│  ├─ turbo0/ # Turbocharged cars, for the stock level exhaust
│  ├─ turbo1/ # For the sport level exhaust
│  ├─ turbo2/ # For the semi#racing level exhaust
│  └─ turbo3/ # For the racing level exhaust
│ 
├─ character/
│  └─ [undocumented]
│ 
├─ crowd/ # Crowd packs for each course
│  └─ xYYY # x = Course type, Y = CourseID
│  
├─ crs/ # Course files
│  └─ XXXX # Course, from COURSE table
│     ├─ .ad = Autodrive file for AI driving
│     ├─ .cam = Camera positions & behavior
│     ├─ .cinf = Course Info (Drift sections & gps stuff)
│     ├─ .drline = Unknown
│     ├─ .envptr = Environment Parameter (Mostly weather & time of day setup)
│     ├─ .envsky = Undocumented
│     ├─ .lv0 = Vision List (Unknown)
│     ├─ .road = Unknown
│     ├─ .rwy = Runway (Collision, road boundaries & surface)
│     ├─ .shapestream = ZLib Compressed & streamed mesh data
│     ├─ .sky = Unknown
│     ├─ .texstream = ZLib Compressed & streamed textures
│     └─ x = Main model "pack", lods, contains most crucial course definition
│  
├─ description/ # Car descriptions
│  └─ <branch_name>/
│     └─ <2 char region code>.rt2 # Localization file
│
├─ font/ # Game fonts, loaded at boot before adhoc
│  ├─ logo/ # Logos, which can be seen in the manual menu
│  │  └─ menu_imagefont.bin # Image container for all logos
│  │
│  └─ vec/ # Fonts as vector format
│     ├─ fontset_<REGION>.txt files # Defines all available fonts for use
│     └─ *.vec # Vector font # read based on each fontset definition
│
│     
├─ icon/ # Save game icons
│  └─ <branch name>/
│     ├─ game_bg.png
│     ├─ game_icon.png
│     ├─ replay_sr_bg.png
│     └─ replay_sr_icon.png
│ 
├─ motion/
│  └─ [undocumented]
│ 
├─ piece/ # Most game images
│
├─ products/ # Adhoc scripts & widgets defining all usable widgets as prototypes
│
├─ projects/ # All game menus.
│
├─ replays/ # Replay files for each local event (i.e license).
│  └─ <branch name>/
│     └─ license/
│ 
├─ scene/ # Scene data
│  ├─ lightprobe/ # Lightprobe files used by scenes
│  ├─ list/ # Defines all available scenes in the game and their formats
│  ├─ misc/ # Miscellaneous files used by scenes
│  ├─ runway/ # Runway files used by scenes
│  ├─ strb/ # Strobe Animations used by scenes
│  └─ script/ # Files that set up a scene. May be in text format, or EVS (EventSchedule) format.
│ 
├─ scripts # Adhoc scripts.
│  └─ <branch_name>/
│     ├─ packed_main_loop.adc # First script executed on boot.
│     └─ util/ # Utility scripts
│   
├─ sound_gt # All game sounds
│  ├─ etc/ # Sound setup files
│  │  ├─ se_master.pmf # Controls volumes
│  │  └─ car_sound_gt5.pmf # Controls car sounds
│  │
│  ├─ library/ # Defines soundtracks and playlists in the game
│  │  └─ GT5.lib # Main library file
│  ├─ narration/ # Narration sound files for the japanese version
│  │  └─ jp/
│  │
│  ├─ se/ # All sound effects
│  └─ track/ # All musics. Vgmstream can play those.
│
├─ specdb/ # Car specification databases.
│  └─ <NAME>/
│     ├─ *.idi # Label information (linked to dbt)
│     ├─ *.dat # Database Table (holds the row data for each table)
│     └─ *.sdb # String database
│
├─ textdata/ # Contains events in XML format, but also other vital information. 
│  │           This information is converted from XML into a local sqlite database (system.db)
│  │           It must be wiped or the relevant version from adhoc scripts incremented in order to update.
│  └─ <branch_name>
│     ├─ aspec_race/ # A#Spec Events
│     ├─ bot/ # Unknown, left#over debug
│     ├─ bspec_race/ # B#Spec Events
│     ├─ event_race/ # Left#over from local events hosted by PDI
│     ├─ license/ # License Events
│     ├─ online_car_set/ # Defines the cars for each car set online, limited to 250 cars
│     ├─ special_event/ # Special Events
│     ├─ arcade_courselist.xml # Defines all courses available in arcade mode
│     ├─ arcade_difficulty.xml # Defines difficulty parameters for Arcade
│     ├─ carlist.xml # Defines the car list (for dealership mainly)
│     ├─ courselist.xml # Defines courses present in the game
│     ├─ dealerlist.xml # Defines all the dealers in the game
│     ├─ event_present.xml # Defines all the present from events in the game
│     ├─ event_present_<GAME_VERSION> # Defines presents to give if the player has updated
│     ├─ freerun_courselist.xml # Defines all courses available in freerun
│     ├─ gameitem_category.xml # Defines all item categories & their localized strings
│     ├─ gameitem_category.xml # Defines all item categories & their localized strings
│     ├─ gameitem_category.xml # Defines all item categories & their localized strings
│     ├─ gameitem_category_<GAME_VERSION>.xml # Unknown
│     ├─ gameitem_data.xml # Defines all the items in the game & their localization
│     ├─ gpsdatalist.xml # Defines GPS information
│     ├─ lnames.txt # Defines the driver name generation table
│     ├─ online_car_set.xml # Defines the car sets available online
│     ├─ photo_travel.xml # Defines all available photo travel locations
│     ├─ photo_travel_wed.xml # Leftover GT5 wedding file
│     ├─ presentcar.xml # Defines all the car prizes
│     ├─ shuffler.xml # Defines the car pool for shuffle race (online)
│     ├─ shuffler_dirt.xml # Defines the car pool for shuffle race (dirt tracks, online)
│     └─ speed_test.xml # Speed Test Event file
├─ tire/ # Tire models
│ ├─ hq/ # High quality tires, for menus
│ └─ race/ # Tire models for race
│
└─ wheel/ # Wheel models
   ├─ hq/ # High quality tires, for menus
   └─ race/ # Tire models for race
```