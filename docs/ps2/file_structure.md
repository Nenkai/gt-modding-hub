## GT4 Folder Structure

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
│  ├─ normal2/ # For the semi racing level exhaust
│  ├─ normal3/ # For the racing level exhaust
│  ├─ turbo0/ # Turbocharged cars, for the stock level exhaust
│  ├─ turbo1/ # For the sport level exhaust
│  ├─ turbo2/ # For the semi racing level exhaust
│  └─ turbo3/ # For the racing level exhaust
│ 
├─ character/ # Contains the driver models
│  ├─ [undocumented models]
│  └─ driver.bin # 'ParameterBin'
│ 
├─ config/ # Configs are adhoc boot scripts
│  └─ config-<branch>.adc # The one that is booted depends on the current branch
│
├─ crs/ # Course files
│  ├─ <course_label>/ # (3)!
│  ├─ <course_label>.ad # Autodrive file, for AI
│  └─ ..
│  
├─ description/ # Car descriptions
│  └─ <region>/
│     └─ <region>_<branch>_<language>_description.rt2 # Localization file
│
├─ dnas/ # GT4 Online
│  └─ auth_<dnas_code>_<branch>.dat # PS2 DNAS authentication file (auth_data) (dnas_code depends on MSystem::GetDnasCode())
│                                   # Passphrase is at network/DnasRoot.ad, GetPassPhrase(code, ver)
│
├─ eyetoy/
│  └─ gtshirt.bin # GTSH header containing the nike shirt pattern for detection & car unlock
│
├─ fep/ # Front-End Processor, used only in japanese builds
│  │    # May be related: 
│  │      https://en.wikipedia.org/wiki/Wnn
│  │      https://socialsolution.omron.com/software/en/products/product_text/iwnn/   
│  └─  ...
│
├─ font/ # Game fonts, loaded at boot before adhoc
│  ├─ *.kf         # Kanji fonts
│  ├─ *.fnt        # Regular fonts
│  └─ jis2uni.dat  # Unknown
│
│
├─ icon/ # Save game icons
│  └─ ..
│ 
├─ menu/ # Strobe files, Motion sets, some leftover GT3 menu files
│  └─ [undocumented]
│ 
├─ mpeg/         # Movies/Videos
│  └─ main/
│     ├─ .pss    # PS2 Interlaced videos
│     └─ .ipic   # Sony format, represents videos (usually the first frame of the other videos is stored)
│   
├─ narration/
│  └─ <region>
│     └─ narration.inf  # Narration file
│     
├─ photo/ # Sample photos from photo mode
|
├─ piece/ # Most game images, some models.
│
├─ pit/   # "Concourse/ScenePack" files
│
├─ printer/   # Watermark images for printing (.tga)
│
├─ projects/ # All game menus.
│
├─ race/  # Various race-related files & models (.bin files appear not to be used)
│
├─ race_display/  # Race display textures
│  └─ <code>      # 'gt4' or 'tt'
│     └─ <locale>
│        └─ display.gpb  # Container for race display UI textures
│
├─ replay/ # Replay files for Demonstrations - in memory card format
   ├─ license      # License demonstrations - note that 'tw' locale is remapped to 'jp'
│  └─ <event_name> # Common game text
│ 
├─ rtext/ # All localized game text (not car descriptions)
│  ├─ common # Common game text
│  └─ manual # Text for the manual menu
│ 
├─ script # Adhoc scripts.
│  └─ <branch_name>/
│     ├─ main.adc # First script executed on boot.
│     ├─ util/ # Utility scripts
│     └─ global_status/ # Defines save game nodes
│   
├─ sound_gt # All game sounds
│  ├─ ads/   # BGM Music
│  │  └─ <region>/
│  │     ├─ ads.inf   # 'MusicInf' file, registers all bgm in the game
│  │     ├─ *.ads     # Sony ADS sounds, made with ps2str. Can be played with vgmstream
│  │     └─ *.adm     # ADS Markers
│  │
│  ├─ sound/ # Sound Effects
│  │  ├─ *.ins       # Sequenced Instrument (INST)
│  │  ├─ se.inf      # Sound Effect Library/Info (GTSE)
│  │  ├─ sdvol.dat   # Sound Volumes (SDVL)
│  │  ├─ vcse.dat    # Related to LG Sound/lgaud.irx, third party library, Star Wars Battlefront II also appears to use it
│  │  └─ roadnoiz.es # Road Noises (ENGN header, read nearly the same as INST)
│  │
│  └─ spu/ # Sequenced Audio / MIDIs
│     └─ <region>/
│        ├─ *.ins/*.sqt  # Sequences & Instruments
│        └─ mid.inf      #  Midi Library/Info
│
├─ specdb/ # Car specification databases.
│  └─ <SpecDB Name>
│     ├─ CARS/       # File for each car, linking all the parts available for it
│     │  └─ <TABLE_ID/ROW_ID> # One car, 00000000 = Table ID of GENERIC_CAR, 00000436 = Row ID 0x436
│     │
│     ├─ RACE/       # File for each race, linking all the opponents in it
│     │  └─ <TABLE_ID/ROW_ID> # One car, 00000023 = Table ID of RACE, 00000A02 = Row ID 0xA02
│     │
│     ├─ *.dbt          # Database Table
│     ├─ *.idi          # Label Information
│     ├─ *.sdb          # String Table
│     └─ DISABLED_INFO  # Disabled cars, normally empty
│
├─ text/ # Unknown (unused or leftover?)
│  └─ realtime.dat
│
├─ tire/ # Tire models
│  ├─ lod/ # Tire models for race
│  └─ menu/ # High quality models for menus
│
├─ usedcar/ # Used-Car dealership listings as adhoc scripts (auto-generated)
│  └─ <region>_used<4 digit week>.adc
│
│  wheel/ # Wheel models
│  ├─ lod/ # Wheel models for race
│  └─ menu/ # High quality models for menus
│ 
└─ wing/ # Wing models
   ├─ lod/ # Wing models for race
   └─ menu/ # High quality models for menus
```

1.  This depends on the [VARIATION](../concepts/specdb.md#variation) table.
2.  All IDs depends on soundNum from [ENGINE](../concepts/specdb.md#engine) table.
3.  From [COURSE](../concepts/specdb.md#course) table