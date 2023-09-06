# GT7 Shuffle Bot

This pages explains how the GT7 Shuffle Bot operates, and how to use it. This bot was made by Nenkai.

## Basics

A shuffle race is a race where every player will use a random car across a certain car pool. This bot attempts to make this process easier in place of GT7's missing shuffle race mode.

!!! note

    All group cars are excluded from this.

## Host Commands

#### `/shuf start` - Start Lobby

Starts a shuffle lobby, only one can be hosted per channel/thread. This command will take a PP range along with a tire compound to use. Up to 10 drivers can be added, further drivers can be added with the `/shuf add` command.

Enforcing a drivetrain is also possible.

!!! tip
    
    It is recommended not to use a greater range of 20 PP between min and max. 480-500 or 525-540 are good ranges.

---

#### `/shuf end` - End Lobby

Ends the shuffle lobby.

---

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

Rerolls the car of a specific driver. This will bypass penalties, and attempt to give a car that hasn't already been given to anyone else if possible.

---

#### `/shuf givehost` - Give Host

Gives the lobby host to another driver.

---

## Driver Commands

#### `/shuf reroll` - Reroll Car

Reroll own car incase you don't own it. This can be done up to **2** times, the first time is always free, the second time will be penalized and will always be a worse car than the previous one.

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