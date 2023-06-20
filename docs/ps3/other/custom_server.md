*Last Update: 24/05/2021*

# Custom Server

A proof-of-concept [Grim](../../concepts/online/grim.md) server exists for GT5/6 at [Grimoire](https://github.com/Nenkai/Grimoire).

Emphasis on proof of concept - it does not have any security features, nor is it ready for production at all.

!!! warning
    **Any project being advertised as reviving custom servers using this project is not endorsed nor wanted.**

---

## FAQ

### Custom Server?

A replacement for both GT5 & GT6's defunct servers.

### Who works on it?

As of right now, just Nenkai.

### Do you need PSN to use the custom server?

Unfortunately, yes. This is a hard requirement because the game needs to fetch the player's profile to then send the information to the server.
In the distant future, this may no longer be required thanks to [hyenas](https://github.com/Jump-Suit/hyenas) (although the project seems to be dead as of 2023).

The server is likely to only support RPCS3 for safety.

### Do you need a modded console?

Unfortunately also yes as of right now, there is no figured out way to let OFW connect to it through a DNS swap, due to the game's requirement on HTTPS. No eboot editing is required, it can be performed just with game files.

As stated previously, the server is likely to only support RPCS3.

### RPCS3

Functional thanks to RPCN. Most community features are functional.

GT5 lobbies do function, GT6 however crashes the emulator upon lobby creation.


### Can you host and join lobbies?

Yes, sort of. Lobbies and matching is all handled by the PSN however, this is something that will be actively attempted to avoid.

### Is it released yet?

Officially, no. It's still a work-in-progress.

### Open-Sourced?
Only the proof of concept - the real project is private. https://github.com/Nenkai/Grimoire

Any further work to be made until post-release will be privated.


### What's "Grim"?

A: PDI's official name for their server infrastructure. The server revival project's name is based on it. 

---

## What Works / What doesn't

✅ GT5 Progress on what currently works

- Museum (Original cards + Can create new ones)
- GTTV
- News List (On main menu + actual news menu)
- Online Car Dealership
- Seasonals Menu + Functioning Rankings + Replay Downloading + Custom Backgrounds/Logos
- Item Gifting to other users
- Friend List based on PSN friend list
- GT Mail
- BBS (Bulletin Board to leave messages on player's profiles)
- Player Logs
- Sharing Courses, and Photos

✅ GT6 Progress on what currently works

- News
- Messaging
- Seasonals
- Loading Custom Tracks
- Clubs, Club Forum

🔧 What needs to be worked on

- Remote B-Spec (very big feature so it'll be worked on post-release)
- Some other minor stuff
- Refactoring, polishing, checks