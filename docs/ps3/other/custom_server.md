*Last Update: 24/05/2021*

# Custom Server

A proof-of-concept [Grim](../../concepts/online/grim.md) server exists for GT5/6 at [Grimoire](https://github.com/Nenkai/Grimoire).

Emphasis on proof of concept - it does not have any security features, nor is it ready for production at all.

!!! warning
    **Any project being advertised as reviving custom servers using this project is not endorsed nor wanted.**

---

## FAQ

Q: Custom Server?

A: A replacement for both GT5 & GT6's defunct servers.


Q: Who works on it?

A: As of right now, just Nenkai.

Q: Do you need PSN to use the custom server?

A: Unfortunately, yes. This is a hard requirement because the game needs to fetch the player's profile to then send the information to the server.
In the distant future, this may no longer be required thanks to https://github.com/Jump-Suit/hyenas .


Q: Do you need a modded console?

A: Unfortunately also yes as of right now, there is no figured out way to let OFW connect to it through a DNS swap, due to the game's requirement on HTTPS. As of now it requires eboot URL editing.


Q: RPCS3?

A: Sadly not as of now. RPCS3/RPCN fails to resolve the IP/host. Emulator issue that needs a fix.


Q: Can you host and join lobbies?

A: Yes, sort of. Lobbies and matching is all handled by the PSN however, this is something that will be actively attempted to avoid.

Q: Is it released yet?


A: Officially, no. It's still a heavy work-in-progress.


Q: Open-Sourced?
A: Yes - only the PoC - the real project is private. https://github.com/Nenkai/Grimoire

Any further work to be made until post-release will be privated.


Q: What's "Grim"?

A: PoDi's official name for their server infrastructure. The server revival project's name is based on it. 

---

## What Works / What doesn't

✅ GT5 Progress on what currently works

- Museum (Original cards + Can create new ones)
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
- GTTV (the whole menu is figured, downloading isn't however, can't figure it out.)
- Uploading profile pictures
- Some other minor stuff
- Refactoring and checks