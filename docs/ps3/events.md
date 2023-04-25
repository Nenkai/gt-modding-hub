# Creating Event Categories (Folders) & Events

Gran Turismo 5 & 6 uses very simple [XML](https://en.wikipedia.org/wiki/XML) to represent game events (and in the case of GT6, also whole event folders).

File Locations:

* GT5: `textdata/gt5/<aspec_event/license/etc>`
* GT6: `game_parameter/gt6/<license/event/etc>`

The best way to start off is understanding an existing original event and using it as base. You may notice that all event files start with a letter followed by 3 digits. These XMLs contain the event list for a game event category (i.e Sunday Cup).

---

## (GT5) Creating a new Event Folder

If you're creating a new event folder, you will need to refer to this.

For GT5, you can refer to the `gamelist.xml` in the `aspec_race` folder to figure out which file is which category.
  

| Field | Description |
| ----- | ----------- |
`id` | Unique ID for your event. It **must** follow a previous one. i.e last is 110, next has to be 111 else your game will black screen. Each hundreds correspond to a different tier:<br>- 100: Beginner<br>- 200: Amateur<br>- 300: Professional<br>- 400: Expert<br>- 500: Extreme<br>- 600: Endurance |
`file_id` | Also has to be unique. i.e 150 would point to the `r150.xml` file. |
`level` | Level required to access the folder. |
`event_count` | Event count in that folder. |
`is_championship` | Whether the folder is a championship where you cannot start an individual event. |

## (GT5) Folder Title/Description

!!! info
    The section about [Editing Text](https://github.com/Nenkai/Gran-Turismo-5-6-Modding-Guides/blob/main/3.%20String%20Editing/String_Editing.md#stringtext-editing) is required for this step.

In order to add or edit new event information, you will need to do some text editing.

Open the `projects/gt5/gtmode/<locale>` folder into the GT.RText tool. Go to the `ASpecEventName` or `BSpecEventName`.

Add a row as such (where xxx is your event ID):

* r`xxx`**d** - For your description
* r`xxx`**t** - For your title
* r`xxx`**c** - For your caption.


Important: **Ensure that the row and labels are in order.** The last row in the `rt2` must not be below any of the other ids as its last row.

Wrong: 

![Wrong](https://cdn.discordapp.com/attachments/776106493110911016/783443866220101642/unknown.png)

Correct:

![Correct](https://cdn.discordapp.com/attachments/776106493110911016/783444140415385621/unknown.png)

---

## (GT6) Creating a new Event Folder
In GT6 compared to GT5 the process has been changed (and made a lot more flexible). GT6 uses a sqlite database to store folder data. You will need something like [SQLiteStudio](https://sqlitestudio.pl/) to edit it.

That sqlite database is located at `database/gt6/menudb.dat`.

!!! warning
    This file is encrypted, follow the SpecDB guide to decrypt it.

Open the file through SQLiteStudio. You will notice a few tables on the left pane, you'll be interested only in `t_event_folder` and `t_event_folder_localize`.
Go to the "Data" tab.

Create rows for each folder that you want to create and apply them.

| Field | Description |
| ----- | ----------- |
`t_event_folder` | Folder definitions:
`id` | Unique ID, just make sure they're continuous
`NeedFolder` | `FolderID` required to complete before accessing this one
`Star` | Total stars to obtain in that event (for regular folders) - Used for progress, make sure it matches
`Name` | File name of your named XML
`NeedStar` | Amount of stars in the current category (i.e) novice to open the folder
`TitleID` | Must match `LocalizeID` in `t_event_folder_localize`
`FolderID` | XML id which will point to your event list XML (i.e 1000 = r1000.xml)
`Type` | Type of event. Refer to the table below.
`FolderOrder` | For regular folders only. The display list depends on it, if you set it as 0 the folder will show on top of the left pane.

``` markdown title="Type Numbers"
1xxx: Novice
2xxx: National B
3xxx: National A
4xxx: International B
5xxx: International A
6xxx: Endurance
  x0xx: Regular Folder
  x1xx: License
  x2xx: Mission
  x3xx: Coffee Breaks
  x4xx: One Make
  x5xx: Endurance (Unused)
7xxx: Red Bull Events
8xxx: Moon Events
9xxx: Goodwood Events
0xxx: Sierra Events
```

* `t_event_folder_localize` - Name of your folder in each language - **required for each folder**:
* `id`: Must be unique
* `LocalizeID`: Must match your folder's `TitleID` in `t_event_folder`
* Everything else: Name of your folder in each language - just set it all as english

---

## Creating Events

If you've created your folder or editing an existing one, you can take on doing the event itself.

Reminder:

* GT5: `textdata/gt5/<aspec_event/license/etc>`
* GT6: `game_parameter/gt6/<license/event/etc>`

If you are using GT6, you are strongly recommended to create your own event using the [Event Maker](https://github.com/Nenkai/GTEventGenerator/releases). It will allow you to directly export events as XML along with their folders. It is also well documented, most labels will show information while hovering them.

However if you're still editing directly through a text/code editor, you can refer to the [XML documentation itself](https://github.com/Nenkai/GT-File-Specifications-Documentation/tree/master/Docs).
If you're creating an event make sure it matches the IDs for your folders in either GT5 or GT6, including the xml file names.

!!! tip "Note for GT6"
    If you are editing original events, you might also notice these `.fgp` files - You will need to remove them from the `PDIPFS` in order for the game to bypass its event cache or no changes will occur. 
    
    Read: [Removing files from the game](../ps3/basics/volume_system.md#removing-files-from-the-game)
