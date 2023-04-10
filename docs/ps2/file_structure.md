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
├─ advertise/ # Boot/Advertisement textures
│  └─ ..
│
├─ cameras/ # Not used
│  ├─ attach.cam
│  ├─ replay.cam
│  └─ start.cam
│
│  car/
│  ├─ lod/  # LOD Models for each car
│  │  ├─ <model_code> - Model file. #(1)!
│  │  └─ <model_code>.pat - Color Patch
│  │
│  ├─ menu/ # Menu models for each car
│  │  └─ ..
│  │
│  └─ open/ # Open models for open cars
│     └─ ..
│
├─ carsound/ # All car sounds (engine, turbo, horns, start). #(2)!
│  ├─ engine/ # Engine sounds
│  ├─ normal0/ # Cars with no turbo, for the stock level exhaust (non#turbo includes supercharged and electric vehicles)
│  ├─ normal1/ # For the sport level exhaust
│  ├─ normal2/ # For the semi#racing level exhaust
│  ├─ normal3/ # For the racing level exhaust
│  ├─ turbo0/ # Turbocharged cars, for the stock level exhaust
│  ├─ turbo1/ # For the sport level exhaust
│  ├─ turbo2/ # For the semi#racing level exhaust
│  └─ turbo3/ # For the racing level exhaust
│ 
├─ character/ # Contains the driver models
│  ├─ [undocumented models]
│  └─ driver.bin # 'ParameterBin'
│ 
├─ config/ # Configs are boot scripts
│  └─
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

1.  This depends on the [VARIATION](../concepts/specdb.md#variation) table.
2.  All IDs depends on soundNum from ENGINE table.