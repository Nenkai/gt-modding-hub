---
icon: material/file-tree
comments: true
---

## :material-file-tree: GT2 Folder Structure

### Volume Contents
```{ .sh .no-copy }
.
├─ .text/ # Car models & wheels for each car. Depends on ModelCode in MODEL_INFO table
│  └─ data-race.txd # TeXt Data file hosting all text relevant to race mode.
│
├─ arcade/ # Model files for car parts
│  ├─ arc_carlogo            # Container file with all the car logos used in Arcade mode’s pre-set car classes.
│  ├─ arc_font.tim           # .tim containing with font characters used for (likely) all dynamic text throughout the game. 
│  ├─ arc_fontinfo           # Unknown.
│  ├─ arc_goodies.tim        # .tim with various icons and buttons used in Arcade mode.
│  ├─ arc_key_config.tim     # .tim with every controller button icons used in the controller settings menu. 
│  ├─ arc_maker.tim          # .tim with all the car maker logos and the drivetrain types incl. localization leftovers
│  ├─ arc_other.tim          # .tim with the reflection map and drivetrain type logos incl. localizations used in the Arcade mode car selection screen. 
│  ├─ arc_panels.tim         # .tim with all big button icons for game mode, race difficulty, and car classes used in Arcade mode.
│  ├─ arc_topmenu.tim        # Unknown. Compressed and seems to have the background image used in early demos of GT2, in both regular and USA version of the logo. 
│  ├─ champtim.tim           # .tim the reflection map used on the trophy 3D model in the prize screen (and maybe license as well?)
│  ├─ course_map             # Unknown, compressed. Presumed to have the track preview images shown in the Arcade mode track selection screen.
│  ├─ course_mapinfo         # Unknown. Has track filenames, and other data.
│  ├─ demofile.gmr           # Likely contains demo replays, maybe for the main menu idling? Unused?
│  ├─ demofile_eu.gmr.gz     # GZip file likely containing demo replays for each region, maybe for the main menu idling?
│  ├─ game_status_file.gz    # GZip file with multiple in-race HUD-related elements.
│  ├─ gt_cur.gz              # GZip file containing the GT mode menus car reflection map, cursor icons, drivetrain icons and event completion icons.
│  ├─ gt_cursor.tim          # Same as above, for US English and Japanese.
│  ├─ gt_items.tim           # .tim with license icons in big and small sizes as well as the "next page", event completion trophy icon, and the "FREE" license requirement icon.
│  ├─ gtmode_font.tim        # .tim with all dynamic characters used in the GT mode menus, for all languages
│  ├─ langsel.tim            # .tim with flag icons displayed on the PAL version’s language selection screen.
│  ├─ license_info.tim       # .tim with all the license test’s description text shown on the license test pre-race menu.
│  ├─ license_tim.tim        # .tim with completion icons, and big Bronze, Silver, Gold and Kiddie prize icons.
│  ├─ setting.tim            # .tim with all icons and graphic patterns used in the car settings menu.
│  ├─ title_arcade.tim.gz    # GZip file with all screen's background images for Arcade and GT Mode discs for all regions.
│  └─ topmenu_panels.tim     # .tim with icons used in the Replay Theater and Trade menus.
│
├─ bgsobj/ # BackGround Skybox Objects
│  ├─ *.bso.gz # 3D Object file used for skyboxes. GZip compressed ahead of time.
│  └─ *.bsp.gz # .tim texture & palettes for the skyboxes, with a bsp extension instead. GZip compressed ahead of time.
│
├─ carlogo/ # Car logo images, as standard .tim files.
│  ├─ <car_name>l-- # .tim Japanese GT Mode logo
│  ├─ <car_name>m-- # .tim Japanese Arcade Mode logo
│  ├─ <car_name>n-- # .tim USA GT Mode logo
│  ├─ <car_name>o-- # .tim USA Arcade Mode logo
│  ├─ <car_name>p-- # .tim PAL GT Mode logo
│  └─ <car_name>q-- # .tim PAL Arcade Mode logo
│                   # The game will default to any existing logo if any of its variant is missing. However, at least one variant for GT Mode and one for Arcade must exist. 
├─ carobj/ # 3D Car Objects/Models
│  ├─ <car_name>.cdo.gz # Car Daytime Object. GZip compressed ahead of time.
│  ├─ <car_name>.cdp.gz # Car Daytime Texture Palette. GZip compressed ahead of time.
│  ├─ <car_name>.cno.gz # Car Nighttime Object. GZip compressed ahead of time.
│  └─ <car_name>.cnp.gz # Car Nighttime Texture Palette. GZip compressed ahead of time.
│
├─ carparam/ # Car Database/Specs
│  ├─ arcade_data.dat.gz # Database for Arcade mode. GZip compressed ahead of time.
│  ├─ gtmode_data.dat.gz # Database for GT mode. GZip compressed ahead of time.
│  ├─ license_data.dat   # Database for license tests. GZip compressed ahead of time.
│  └─ unistrdb.dat # String Database used by the main databases. GZip compressed ahead of time.
│
├─ carwheel/ # Aftermarket wheel textures, referenced by carparam wheel table
│  └─ <5 char wheel_name>-<1 char spokes><1 char color>.tim # .tim texture for each aftermarket wheel
│
├─ crsmap/ # Minimaps for each course
│  └─ <name>.tim.gz # Course minimap. GZip compressed ahead of time.
│
├─ crsobj/ # Course Objects/Models
│  ├─ <name>.tro.gz # TRack Object. GZip compressed ahead of time. Contains everything relevant to a track (meshes, driving line, cameras, spawns, etc.)
│  └─ <name>.trp.gz # TRack Palette/Textures as .tim files (renamed extension). GZip compressed ahead of time.
│
├─ dirt/ # Replay files for opponents in GT Mode rally events (framerate must match!)
│  └─ <name> # Replay file per track. GZip compressed ahead of time (but no .gz extension!)
│
├─ engine/ # Engine Sounds. Referenced by Engine table.
│  ├─ <name>.es    # "Engine"/Intake sound. Doesn't change with upgrades.
│  ├─ <name>_n0.es # Stage 0 (Stock) muffler/exhaust sound for Naturally Aspirated (non-turbo) cars. 
│  ├─ <name>_n1.es # Stage 1 (Sport) muffler/exhaust sound for NA cars. 
│  ├─ <name>_n2.es # Stage 2 (Semi-Race) muffler/exhaust sound for NA cars. 
│  ├─ <name>_n3.es # Stage 3 (Race) muffler/exhaust sound for NA cars.
│  ├─ <name>_t0.es # Stage 0 (Stock) muffler/exhaust sound for Turbo cars.
│  ├─ <name>_t1.es # Stage 1 (Sport) muffler/exhaust sound for Turbo cars. 
│  ├─ <name>_t2.es # Stage 2 (Semi-Race) muffler/exhaust sound for Turbo cars.
│  └─ <name>_t3.es # Stage 3 (Race) muffler/exhaust sound for Turbo cars. 
│
├─ font/ # Fonts
│  └─ racefont.dat # Headerless texture file (512x256) with 3 cluts.
│
├─ gtmenu/ # Menu Layouts
│  ├─ <3 char locale>
│  │  ├─ gtmenudat.dat  # Container with every foreground layer GT Mode menu screen images. Each asset is GZip-ed.
│  │  ├─ gtmenudat.idx  # Indexing file for the dat file, containing offsets to all assets in it.
│  │  ├─ iconimg.dat.gz  # Container for GT Menu hud icons, such as the shortcuts to Home, Status, Map, Go Race, and more. GZip compressed ahead of time.
│  │  └─ solodata.dat.gz # Container with data pertaining to menu screens. GZip compressed ahead of time.
│  │
│  ├─ commonpic.dat # Container for every background layer GT Mode menu screen images, for all languages.
│  └─ commonpic.idx # Indexing file for the dat file, containing offsets to all assets in it. 
│
├─ license/ # License Data
│  └─ <name>.lgf.gz  # Unknown, but likely the demo runs for each license test, for each region. GZip compressed ahead of time.
│
├─ replay/ # Replay Data
│  └─ <name>  # Empty files, unknown uses, but most likely related to replay.
│
├─ sound/ # Sound Effects
│  ├─ arcade.ins   # Instrument container with vag samples. Could be a GT1 leftover. 
│  ├─ arcade.seq   # Arcade mode menu song as (custom SEQG) MIDI sequence.
│  ├─ gtmseq.ins   # Instrument container with sound samples for spu sequences.
│  ├─ se01.ins     # Instrument container with race sound effects.
│  ├─ spu_<id>.seq # GT Mode menu songs as (custom SEQG) MIDI sequence.
│  └─ sys.ins      # Instrument container for system sounds.
│
├─ .carcolor        # Contains all car colors
├─ .carinfo         # Contains all car names (a = american, e = europe, j = japanese)
├─ .cc<locale>      # Contains all car color names
├─ .crsinfo         # Contains track information
├─ .crstims.tsd.gz  # .tim containing all billboard textures for dynamic track billboards. GZip compressed ahead of time.
├─ .usedcar         # Contains Used Car Dealer rotations for 60 weeks.
└─ crstim.arc       # Misc course textures in a .tim archive, containing light flare, dust, smoke, day/dusk/night reflection maps.
```