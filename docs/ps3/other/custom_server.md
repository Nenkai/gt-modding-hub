*Last Update: 13/07/2023*

# Custom Server

A proof-of-concept [Grim](../../concepts/online/grim.md) server exists for GT5/6 at [Grimoire](https://github.com/Nenkai/Grimoire).

!!! warning
    **Any project being advertised as reviving custom servers using this project is not endorsed nor wanted.**

---

## FAQ

### Custom Server?

A replacement for both GT5 & GT6's defunct servers.

### Who works on it?

As of right now, [Nenkai](https://twitter.com/) and [ddm999](https://twitter.com/ddm999).

### Can you use this on consoles?

Yes, but unplanned. PSN is a hard requirement, and a modded console is also required, which has ban risks.
In the distant future, this may no longer be required thanks to [hyenas](https://github.com/Jump-Suit/hyenas) (although the project seems to be dead as of 2023).

### What about emulators such as RPCS3?

The server will only support [RPCS3](https://rpcs3.net/) for safety.

Functional thanks to RPCN. Most community features are functional.

### Can you host and join lobbies?

There is currently an issue with RPCS3/RPCN where joining others's lobbies does not work. We hope that this can be solved in the future.

### Is it released yet?

Officially, no. It's still a work-in-progress. **GT5** is currently being tested as of July 2023.

### Is it secure?

SSL is fully implemented. RPCN authenticity is also fully verified upon login.

### Open-Sourced?
Only the [proof of concept](https://github.com/Nenkai/Grimoire) - the real project is private for the time being. 

### What's "Grim"?

PDI's official name for their server infrastructure. The server revival project's name *Grimoire* is based on it. 

More info on the [Grim](../../concepts/online/grim.md) page.

---

## What doesn't work so far (GT5)

* Going inside GTTV causes an emulator crash (emulator issue, NP Commerce not implemented).
* It is not yet possible to connect to other players's lobbies (emulator issue, sceNpBasic* possibly not implemented)
* Only Time and Drift trials are currently implemented (grimoire side)
* Remote B-Spec's event is not currently implemented (grimoire side)
* The online car dealership only has two cars (787B's), listings have yet to be properly implemented (grimoire side)
* The museum is missing a few entries for the time being (grimoire side, we do not have the images for them yet)
* It is not possible to view who is online in-game yet (emulator issue, sceNpPresence is not implemented)
* Sometimes downloaded images (avatars) can be black (emulator issue).
* Sometimes creating custom track or avatar thumbnails can fail and be all black or glitched (emulator issue).