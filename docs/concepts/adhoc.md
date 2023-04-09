# Adhoc

!!! warning
    This section requires intermediate programming knowledge, Javascript or Python helps the most.
    
## Introduction

Adhoc is a scripting language and bytecode that was introduced in Gran Turismo 4. It is an in-house developed custom scripting language by Polyphony Digital. 

Generally most of the game code is within them, and its existence is justified by multiple concurrently working developers not having to compile the main executable (written in C++) all at the same time often, as it is usually a time consuming process.

In general, the game's main executable is really just the game engine, its framework, car/graphics handler, etc. It only executes what the adhoc scripts are asking it to do.

!!! tip
    It is important to understand that Adhoc is two different components, the programming language itself named Adhoc, and the bytecode - script interpreter also named and part of Adhoc.

    Gran Turismo 7 still uses and supports adhoc bytecode, but no longer uses Adhoc as its input source code. It has moved to [Swift](https://en.wikipedia.org/wiki/Swift_(programming_language)) with their own custom compiler compiling to adhoc bytecode.

Before explaining what each file format is, it is important to understand certain folders related to it.

Folder | Description |
------------ | ------------- |
`projects` | This is where each "menu" is stored, within its corresponding sub-folder. For instance, GT5's main menu is `gttop`. The actual race menu is `race`. The booting process is `boot`.
`scripts` | Stores function utilities for the projects to use in general. Most importantly, it contains a `main.adc` file. This one also stores utilities but also the critical game loop.
`products` | This is the least important one. It just defines some UI widgets.

For the formats, there are four to keep in mind.

Format | Editable | Description |
------------ | ------------- | ------------- | 
`.adc` | See Specific Section | **Ad**hoc **C**ompiled - This is the game code itself. It is in a compiled form, so it cannot be edited out of the bat.
`.mproject/mwidget`  | Yes | UI Projects/Widgets -  These are essentially the UI layout definition, and sets properties for each widget. Adhoc Scripts are directly linked to them and manipulates them as a real UI framework.
[`.gpb`](../formats/adhoc/gpb_gpbdata.md) | Yes | UI Assets - Containers for each project that contains images
`.mpackage` | Yes | GT6 Only. These contain bundles of `.adc` and `.mwidget` files that are properly split. **This file is always loaded for any project first. If missing, the game will fallback to loading an individual script and project file.**

## Adhoc Scripts

As explained in the introduction, Adhoc Scripts are responsible for roughly 99% of the gameplay logic. An on-going effort to translate compiled scripts into compilable versions is available at [OpenAdhoc](https://github.com/Nenkai/OpenAdhoc).

Scripts that have not been reverse-engineered can be edited, but it is a difficult process as you will have to deal with hex-editing instructions.

Most of the operations are done through the [GTAdhocToolchain](https://github.com/Nenkai/GTAdhocToolchain).

## Editing and recompiling scripts

Using the toolchain directly, scripts can be compiled using the .yaml file.
``` markdown title="Compiling a Script/Project"
adhoc build -i <.ad source file or .yaml project file> (-v <version>)
```

Or if you also have installed the VS Code extension provided:

* Run Build Task (++ctrl+shift+b++) with the VS Code Adhoc Extension on any source file or project file.

## Editing scripts from compiled binaries (advanced)
To begin viewing them, drag any `.adc` file onto the toolchain executable. This should output a `.ad` and `.strings` file next to the source file.

The `.ad` file can be viewed in any text editor, preferably Notepad++. In it, you will find the source code in an [Assembly](https://en.wikipedia.org/wiki/Assembly_language) form. Adhoc Scripts are generally high level, but still contains stack handling, scopes, etc. Think of it as being similar to [C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)).

All instructions will start with three different numbers seperated by `|`'s. Lets take the following instruction as an example and lets tear it down.

     209FD|  23| 21| STATIC_DEFINE: REPLAY_MINIMUM_HDD_SPACE

* `209FD` is the **offset of the instruction** within the `.adc` file. It will point to the instruction type, which its enum is documented [here](https://github.com/Nenkai/GTAdhocTools/blob/27e40451d1ab2de8315b705e82f79c17c9cbb0b6/GTAdhocParser/AdhocCode.cs#L297).
* `23` is the **Line Number** within the non-compiled source file (used for debugging purposes)
* `21` is the **instruction number within the current scope** (i.e function, method, top-level code).
* The rest of the line is the instruction itself.

The process itself is easy but it is mainly the scope of what you can do that is a problem. Generally, this is how it goes:
* Dissasemble the source adhoc script
* Locate a code part and instruction that you want to edit
* Copy the instruction offset.
* Open the source `.adc` file in a hex editor.
* Go to the copied offset. You will be pointed to the instruction's type, the 4 bytes before it being the instruction's line number, and the next bytes after it being the instruction data (if applicable).
* Edit the instruction data if applicable. It varies between instruction types and are all documented [here](https://github.com/Nenkai/GTAdhocTools/tree/master/GTAdhocParser/Instructions).

### Example
With that in mind, here is a basic example for editing a constant value.

    209DA|  21| 17| INT_CONST: 1024 (0x400)

Let's say you wanted to edit 1024 to 500000. You would open the `.adc` file, go to `209DA`. The number itself is located at the next four bytes (int32), where 1024 would be `00 04 00 00`. You can use the data inspector that most hex editors have (HxD, 010) to edit the value easily. After which, setting the value to 500000 should change the bytes to `20 A1 07 00`. Then you can save.

To verify that the change was made correctly, simply just dissasemble the edited file again. If no error shows up, you are good.

!!! note
    Obviously there are more complex instructions and used incorrectly, can break the game loop. Depending on where it happens, the game may still continue to run. For instance, if the game crashed while in the middle of a menu, chances are the adhoc will crash and simply restart the project. However it crashes during its loading, this is essentially a softlock.

    One thing to look for in Adhoc when editing:

    * Any object that is not defined (aka null `nil` in adhoc) and then used is [null derefencing](https://en.wikipedia.org/wiki/Uninitialized_variable).
    * Invalid operators between object types is essentially null derefencing aswell.
    * [The stack](https://en.wikipedia.org/wiki/Stack_machine). Adhoc uses it. Editing instructions that plays with the stack will certainly break unless you know what you are doing.
    * Jump Instructions. You can essentially jump anywhere you want by editing the instruction target, so you can essentially also skip checks, but watch out for   undefined objects aswell.