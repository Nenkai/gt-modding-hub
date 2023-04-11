# Executables (CORE.GT3/CORE.GT4)

Starting from GT3, the game is split between two executables:

* `SCES_517.19` (or any other game code) - Bootstrap executable
* `CORE.GT3/CORE.GT4/CORE.TT` - Main executable.

!!! note
    Some older GT4-engine builds such as GT4 First Preview or Tourist Trophy Demo does not use a bootstrap executable.

## Bootstrap executable

The bootstrap executable serves as a way to launch and verify the `CORE`/main executable through different sources (in order):

1. `HostSource` - `HOST` - Using `host`, `host:/tmp/CORE.GT4`
2. `CardSource` - `MCARD 0` - Using memory card 1
3. `CardSource` - `MCARD 1` - Using memory card 2
4. `DiskSource` - `DISK` - Using `CORE.GT4` at the root of the disk

Here is a flowchart of the boot process after a suitable CORE.GT4 has been located.

??? abstract "Boot process flowchart (click to expand)"
    ``` mermaid
    graph TD
      Start[Start] --> OpenCore[Attempt to open CORE from various sources] --> CRCCheck;
      CRCCheck{CRC Matches?} ---->|No| Failed;
      CRCCheck --> GT4OCheck

      GT4OCheck{Is GT4O?} ----> Decrypt[Decrypt CORE] ----> Decompress
      GT4OCheck --> Decompress

      Decompress[Decompress CORE] --> ReadHeader[Read header]
      ReadHeader --> HeaderHashCheck

      HeaderHashCheck{Computed hash matches with header?} ---->|No| Failed;
      HeaderHashCheck --> OverlapCheck

      OverlapCheck{Defined segments overlap?} ---->|Yes| Failed;
      OverlapCheck --> ValidEntrypointCheck

      ValidEntrypointCheck{Is valid entrypoint address?} ---->|No| Failed;
      ValidEntrypointCheck --> END

      END(["✔️ Ready to go, pass arguments and entry to ExecPS2"])
      style END fill:#00BB00

      Failed["❌ Failed, invalid Image"]
      style Failed fill:#CC0000
    ```
    ```

---

## CORE executable
This is the main executable after the bootstrap has successfully validated it.
    
Refer to the [CORE format](../formats/ps2_core.md) for how it is laid out more in detail.

!!! tip
    [PDTools.GT4ElfBuilderTool](https://github.com/Nenkai/PDTools/tree/master/PDTools.GT4ElfBuilderTool) can process a CORE file to an ELF file for easier use in IDA or Ghidra.