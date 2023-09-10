# GT7 Shuffle Bot

This pages explains how the GT7 Shuffle Bot operates, and how to use it. This bot was made by Nenkai.

## Basics

A shuffle race is a race where every player will use a random car across a certain car pool. This bot attempts to make this process easier in place of GT7's missing shuffle race mode.

The way it works is that a lobby is hosted, and **BoP** has to be enabled. The bot will provide a random car for each driver to use given the specified tire compound set by the host.

!!! warning

    In order to make this more enjoyable it is **very highly recommended** to have a large collection of road cars not to hold everyone else in the lobby up.


!!! note

    All group cars are excluded from this.

---

## Lobby Owner Commands

#### `/shuf start` - Start Lobby

Starts a shuffle lobby, only one can be hosted per channel/thread. This command will take a PP range along with a tire compound to use. Up to 10 drivers can be added, further drivers can be added with the `/shuf add` command.

You can also set the lobby as public - incase you want people to be able to join on their own. This can be done by setting `is_public` to true.

Enforcing a drivetrain is also possible.

!!! tip
    
    It is recommended not to use a greater range of 20 PP between min and max. 480-500 or 525-540 are good ranges.

---

#### `/shuf end` - End Lobby

Ends the shuffle lobby.

---

#### `/shuf addhost` - Add Host

Adds host permissions to another driver. This is useful incase you want multiple people to handle managing the bot.

---

#### `/shuf removehost` - Remove Host

Removes host permissions from a host.

---

## Host Commands

#### `/shuf set` - Update Shuffle Parameters

Updates the shuffle parameters. This will reshuffle.

---

#### `/shuf shuffle` - Shuffle

Reshuffles all the cars based on the current parameters (which can be changed with `/shuf set`).

---

#### `/shuf add` - Add Driver

Adds a driver to the shuffle lobby. No more than 16 drivers can take part in a lobby.

---

#### `/shuf remove` - Remove Driver

Removes a driver from the shuffle lobby. No more than 16 drivers can take part in a lobby.

---

#### `/shuf rerolldriver` - Reroll Driver

Rerolls the car of a specific driver. This will bypass penalties, and attempt to give a car that hasn't already been given to anyone else if possible, and a car that isn't already being used by the target driver.

---

#### `/shuf setpublic` - Set Lobby Public/Private

Sets the lobby as private, or public (which means anyone can join using `/shuf join`).

---

## Driver Commands

#### `/shuf join` - Join Lobby

Joins the shuffle lobby, **only** if the shuffle has been marked as public.

---

#### `/shuf reroll` - Reroll Car

Reroll own car incase you don't own it. This can be done up to **2** times, the first time is always free, the second time will be penalized and will always be a worse car than the previous one. If you are already using the worst car, rerolling with a penalty is effectively pointless.

---

#### `/shuf leave` - Leave Lobby

Leaves the shuffle lobby.

---

#### `/shuf cars` - View Car Pool

View the car pool for this shuffle lobby.

---

#### `/shuf view` - View Lobby Details

View all lobby details (silently).

---

## Manage Channel Commands

#### `/shuf reset` - Reset any existing lobby

Resets any existing lobby in the current channel if one exists.