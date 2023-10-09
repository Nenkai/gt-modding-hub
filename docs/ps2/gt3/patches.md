# Patches / Cheats

These patches are intended for use with [PCSX2](https://pcsx2.net/).

Patches go into their own file in the `cheats` folder. Example: `<CRC>_deinterlace.pnach`.

---

## GT3

* :flag_eu: SCES-50294 CRC: `B590CE04`
* :flag_us: SCUS-97102 CRC: `85AE91B3`
* :flag_jp: SCPS-15009 CRC: `9DE5CF65`

---

* :flag_eu: :flag_us: [Adjustable units](https://cookieplmonster.github.io/mods/gran-turismo-3/)
* :flag_eu: :flag_us: [Adjusted triggers sensitivity](https://cookieplmonster.github.io/mods/gran-turismo-3/)

### HostFS

??? abstract ":flag_eu: SCES-50294"

    ```
    [HostFS]
    gametitle=Gran Turismo 3 - A-Spec (EU)
    comment=Enables HostFS (in /data folder)
    author=Nenkai
    
    // Change file device mode to 3
    // 0 = default (vol)
    // 1 = ?
    // 2 = just host:
    // 3 = host:data/
    patch=1,EE,20242BAC,bytes,03000524 // li $a1, $zero -> li $a1, 3
    
    // Looks like setting it to 1 or 3 skips over over some critical part of the initter
    // comment this line if you're setting it to 0, or 2
    patch=1,EE,2023EF50,bytes,06000010 // force branch. beqz $a1, loc_23EF6C -> b loc_23EF6C
    ```

??? abstract ":flag_us: SCUS-97102"

    ```
    [HostFS]
    gametitle=Gran Turismo 3 - A-Spec (US)
    comment=Enables HostFS (in /data folder)
    author=Nenkai
    
    // Change file device mode to 3
    // 0 = default (vol)
    // 1 = ?
    // 2 = just host:
    // 3 = host:data/
    patch=1,EE,20241AA4,bytes,03000524 // move $a1, $zero -> li $a1, 3
    
    // Looks like setting it to 1 or 3 skips over over some critical part of the initter
    // comment this line if you're setting it to 0, or 2
    patch=1,EE,2023DE48,bytes,06000010 // force branch. beqz $a1, loc_23DE64 -> b loc_23DE64
    ```

??? abstract ":flag_jp: SCUS-97102"

    ```
    [HostFS]
    gametitle=Gran Turismo 3 - A-Spec (US)
    comment=Enables HostFS (in /data folder)
    author=Nenkai
    
    // Change file device mode to 3
    // 0 = default (vol)
    // 1 = ?
    // 2 = just host:
    // 3 = host:data/
    patch=1,EE,2023E75C,bytes,03000524 // move $a1, $zero -> li $a1, 3
    
    // Looks like setting it to 1 or 3 skips over over some critical part of the initter
    // comment this line if you're setting it to 0, or 2
    patch=1,EE,2023AB00,bytes,06000010 // force branch. beqz $a1, loc_23AB1C -> b loc_23AB1C
    ```
---

## GT Concept (Tokyo-Geneva)
* :flag_eu: + Asia [Adjustable units](https://cookieplmonster.github.io/mods/gran-turismo-concept/)
* :flag_eu: + Asia [Adjusted triggers sensitivity](https://cookieplmonster.github.io/mods/gran-turismo-concept/)
