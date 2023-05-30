---
comments: true
---

# Patches / Cheats

These patches are intended for use with [PCSX2](https://pcsx2.net/).

Patches go into their own file in the `cheats` folder. Example: `<CRC>_deinterlace.pnach`.

---

## GT4
* :flag_eu: CRC: `44A61C8F`
* :flag_us: CRC: `77E61C8A`
* :flag_jp: CRC: `AEAD1CA3`

---

* Codes by [@Silent](https://twitter.com/__silent_)
    - :flag_eu: [Deinterlace Patch](https://cookieplmonster.github.io/mods/gran-turismo-4/)
    - :flag_eu: :flag_us: [Adjusted triggers sensitivity](https://cookieplmonster.github.io/mods/gran-turismo-4/)
    - :flag_eu: :flag_us: [GT3-like chase camera](https://cookieplmonster.github.io/mods/gran-turismo-4/)
    - :flag_eu: :flag_us: [Far chase camera](https://cookieplmonster.github.io/mods/gran-turismo-4/)

* Codes by [@Vyerq](https://twitter.com/vyerq)
    - :flag_us: :flag_jp: [Press L2 and R2 to enter a used car specialty store and a black Group C car will appear](https://xn--pckq0c4g.com/codes/GT4)
    - :flag_us: :flag_jp: [Switch between normal and replay views with SELECT](https://xn--pckq0c4g.com/codes/GT4)
    - :flag_us: :flag_jp: [Rotate the turntable manually with the R3 stick (automatically stop with R2, restart with L2)](https://xn--pckq0c4g.com/codes/GT4)
    - :flag_us: :flag_jp: [Change car shininess on the menu](https://xn--pckq0c4g.com/codes/GT4)
    - :flag_us: :flag_jp: [Smoke](https://xn--pckq0c4g.com/codes/GT4)
    - :flag_us: :flag_jp: [Disable screen effect when colliding with subjective viewpoint](https://xn--pckq0c4g.com/codes/GT4)
    - :flag_us: :flag_jp: [R3 stick to rotate the camera half horizontally when looking backwards](https://xn--pckq0c4g.com/codes/GT4)
    - :flag_us: :flag_jp: [After fire with R1](https://xn--pckq0c4g.com/codes/GT4)
    - :flag_us: :flag_jp: [B-Spec Progress Speed 16](https://xn--pckq0c4g.com/codes/GT4)
    - :flag_us: :flag_jp: [Disable Mirage](https://xn--pckq0c4g.com/codes/GT4)
    - :flag_us: :flag_jp: [Unlock all arcade mode vehicles](https://xn--pckq0c4g.com/codes/GT4)
    - :flag_us: :flag_jp: [Pass through cars](https://xn--pckq0c4g.com/codes/GT4)
    - :flag_us: :flag_jp: [Adjust the viewing angle with R3 + cross key up and down , restore with L3+R3](https://xn--pckq0c4g.com/codes/GT4)
    - :flag_us: :flag_jp: [Adjust the viewing angle of some replay angles with R3 + cross key left and right, return with L2 + R2](https://xn--pckq0c4g.com/codes/GT4)
    - :flag_us: :flag_jp: [L3+R3 to ignore terrain, L2+R2 to restore](https://xn--pckq0c4g.com/codes/GT4)
    - :flag_us: :flag_jp: [LOD almost disabled](https://xn--pckq0c4g.com/codes/GT4)
    - :flag_us: :flag_jp: [Blurry replay effect](https://xn--pckq0c4g.com/codes/GT4)

* :flag_us: [More cheats on PCSX2 forums](https://forums.pcsx2.net/Thread-Gran-Turismo-4-PNach-Codes)

---

## GT4 Online (Online Beta Version)
* CRC: `32A1C752`

---

* Codes by [@Silent](https://twitter.com/__silent_)
    * [Deinterlace Patch](https://cookieplmonster.github.io/mods/gran-turismo-4/)
    * [Adjusted triggers sensitivity](https://cookieplmonster.github.io/mods/gran-turismo-4/)
    * [GT3-like chase camera](https://cookieplmonster.github.io/mods/gran-turismo-4/)
    * [Far chase camera](https://cookieplmonster.github.io/mods/gran-turismo-4/)

* Codes by [@Nenkai](https://twitter.com/Nenkaai)

    ??? abstract "360° Camera (Ported from Vyerq's)"

        ```
        gametitle=Gran Turismo 4 Online Public Beta [SCUS-97436] (U)
        comment=Rotate car turntable with right stick
        author=Nenkai (ported from Vyerq/unko)

        // Jump to 0xF1100 (custom code) at computeViewAngle() - 0x2063D8
        patch=1,EE,20206488,extended,0C03C440

        // New function start - Get pad value (pad2/ds2u_d.irx mem value) from 89B0DE
        patch=1,EE,200F1100,extended,3C0F008A
        patch=1,EE,200F1104,extended,91EFB0DE

        // New extra logic (passing stick value into diffAngle())
        patch=1,EE,200F1108,extended,25EFFF81
        patch=1,EE,200F110C,extended,448FF000
        patch=1,EE,200F1110,extended,4680F7A0
        patch=1,EE,200F1114,extended,3C0F3CC9
        patch=1,EE,200F1118,extended,448FF800
        patch=1,EE,200F111C,extended,461FF7C2

        // jump to diffAngle() (will be returing to $ra afterwards to original function body computeViewAngle())
        patch=1,EE,200F1120,extended,0808C3C0
        patch=1,EE,200F1124,extended,460DFB40
        ```


    ??? abstract "360° Camera in Menu/Garage Screens (Ported from Vyerq's)"

        ```
        gametitle=Gran Turismo 4 Online Public Beta [SCUS-97436] (U)
        comment=Rotate car camera with R3
        author=Nenkai (ported from Vyerq/unko for GT4 Online)

        // We are overriding PDISTD::DynamicReal::act at 0x528C98 for mCarModel::update
        // Jump to 0xF072C (func 2) & nop
        patch=1,EE,00528C98,word,0803C1CB
        patch=1,EE,00528C9C,word,00000000
        patch=1,EE,00528CA0,word,00000000

        // Back to body
        // execute original body then jump to 0xF0700 (func 1) & nop
        patch=1,EE,00528CD8,word,0803C1C0
        patch=1,EE,00528CDC,word,00000000

        // New function start - Get pad value (pad2/ds2u_d.irx mem value) from 89B0DE
        patch=1,EE,000F0700,word,3C08008A
        patch=1,EE,000F0704,word,9108B0DE

        // new extra logic
        patch=1,EE,000F0708,word,2508FF81
        patch=1,EE,000F070C,word,3C093D40
        patch=1,EE,000F0710,word,4488F000
        patch=1,EE,000F0714,word,4489F800
        patch=1,EE,000F0718,word,4680F7A0
        patch=1,EE,000F071C,word,461FF7C2

        // Return
        patch=1,EE,000F0720,word,461F18C0
        patch=1,EE,000F0724,word,03E00008
        patch=1,EE,000F0728,word,E4830008

        // Function 2 start
        patch=1,EE,000F072C,word,3C08000F
        patch=1,EE,000F0730,word,91080800
        patch=1,EE,000F0734,word,15000004
        patch=1,EE,000F073C,word,3C013C88
        patch=1,EE,000F0740,word,34218888
        patch=1,EE,000F0744,word,44811000

        // Jump to exit (to 0x528CB8)
        patch=1,EE,000F0748,word,0814A328

        // Whatever this is
        patch=1,EE,E10100FF,extended,0064C7A4
        patch=1,EE,000F0800,extended,00
        patch=1,EE,E10100FF,extended,0064C7A5
        patch=1,EE,000F0800,extended,01
        ```


    ??? abstract "Skip CORE.GT4 SHA-512 Hash Check (For editing `CORE.GT4`)"

        ```
        gametitle=Gran Turismo 4 Online Public Beta [SCUS-97436] (U)
        comment=Bypass the specific SHA-512 generated hash through RSA entirely
        author=Nenkai

        // bneq loc_1004C8C -> j loc_1004C8C @ 1004A0C
        patch=1,EE,21004A0C,extended,08401323
        ```

        If you want to edit the executable directly with the patch, edit `9F 00 40 10` at `0x5A0C` to `23 13 40 08`.


---

## GT4 First Preview
* CRC: `E906EA37`

---

* Codes by [@Silent](https://twitter.com/__silent_)
    - [Deinterlace Patch](https://cookieplmonster.github.io/mods/gran-turismo-4/)
    - [Adjustable units](https://cookieplmonster.github.io/mods/gran-turismo-4/)

---

## GT4 Prologue
* :flag_eu: CRC: `3FB69323`
* :flag_jp: CRC: `EF258742`

---

* Codes by [@Silent](https://twitter.com/__silent_)
    * :flag_eu: :flag_jp: [Deinterlace Patch](https://cookieplmonster.github.io/mods/gran-turismo-4-prologue/)
    * :flag_eu: :flag_jp: [Remappable controls](https://cookieplmonster.github.io/mods/gran-turismo-4-prologue/)
    * :flag_eu: :flag_jp: [Adjustable units](https://cookieplmonster.github.io/mods/gran-turismo-4-prologue/)
    * :flag_eu: :flag_jp: [Adjusted triggers sensitivity](https://cookieplmonster.github.io/mods/gran-turismo-4-prologue/)

---

## Tourist Trophy
* :flag_eu: CRC: `CA9AA903`
* :flag_us: CRC: `FF9C0E93`

---

* Codes by [@Silent](https://twitter.com/__silent_)
    * :flag_eu: [Deinterlace Patch](https://cookieplmonster.github.io/mods/tourist-trophy/)
    * :flag_eu: [Adjusted triggers sensitivity](https://cookieplmonster.github.io/mods/tourist-trophy/)
    * :flag_eu: [GT3-like chase camera](https://cookieplmonster.github.io/mods/tourist-trophy/)
    * :flag_eu: [Far chase camera](https://cookieplmonster.github.io/mods/tourist-trophy/)


