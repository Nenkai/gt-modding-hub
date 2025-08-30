---
icon: material/text-box-edit
---

# :material-text-box-edit: String/Text Editing

##  Understanding the RT2 Localization System
Like any AAA game, localization eventually comes in to play; it is what lets developers have text available in multiple languages. Gran Turismo 5/6 is no exception.

Localized game strings are located in `.rt2` files. 

* In GT5 and 6, car descriptions are located in the `description` folder.
* In GT5, Logic related strings are located in `projects/gt5/<project>/<locale>`, whereas in GT6, they are all compacted into one file per locale, in the `rtext/common` folder.

`RT2` files are simple. They work as Key/Value pairs, for example, you may want the unit name for a specific locale. Your key will be `UNIT`.
Depending on the locale, `UNIT` may return different strings. `km/h` or `mph` is an example.

In order to edit such files you will need [GT.RText](https://github.com/Razer2015/GT.RText/releases).

## Editing Strings

Open the tool.

You may edit either individual `rt2` files using the `Open File` option, or load whole folders to easily switch across locales with the `Open UI Folder` option (`common` folder for instance, or `gtmode` in GT5 under `projects/gt5`).

Head to a category, and you will see the Key/Values displayed on the right pane. Double click any of these to begin editing.

Once you're done, save either the file or locale folder back where you loaded it or somewhere else.
