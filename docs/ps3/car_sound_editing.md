---
comments: true
---

# Car Sound Editing

Gran Turismo 5 and 6 both use a sound format called [`ESGX`](../formats/audio/esgx_engine_sgx.md) for their vehicle sounds. This is an evolution of the ES (or ENGN) format used in the PS2-era Gran Turismo titles.

## Car Engine Sound Structure

In the `carsound` folder of Gran Turismo 5 and 6, there are multiple folders which follow a set structure:

* AES (GT6 only) - For cars using AES (for all exhaust upgrade levels)
* `engine` - The sounds which should come from the engine of the car.
* `normal0` - Cars with no turbo, for the stock level exhaust (non-turbo includes supercharged and electric vehicles)
	* `normal1` - For the sport level exhaust
	* `normal2` - For the semi-racing level exhaust
	* `normal3` - For the racing level exhaust
* `se` - Vehicle sound effects such as horns
* `start` - Vehicle starter sounds (used when switching car)
* `turbo0` - Turbocharged cars, for the stock level exhaust
	* `turbo1` - For the sport level exhaust
	* `turbo2` - For the semi-racing level exhaust
	* `turbo3` - For the racing level exhaust

!!! note
    * Some cars don't have a stock exhaust and use a higher stage by default, so a "stock" race or rally car for instance will likely only have an entry in `normal3/turbo3`.
    * Cars with multiple exhaust upgrades will have entries in multiple folders, for instance using `normal0-3`. If you want to use custom sounds for every exhaust stage then simply replace all of its entries, otherwise you can make separate custom sounds for each stage to simulate an upgraded exhaust sounding more raw.

It's important that custom sounds are put in the correct place, since failing to do so will result in that sound not being replaced.

---

## ESGX Explained
The [`ESGX`](../formats/audio/esgx_engine_sgx.md) file format is essentially a container of one or more sounds, known as `SGXD`s (made by Sony). 

The [`SGXD`](../formats/audio/sgd_sgh_sgx_data.md) entries themselves contain some data describing an audio stream (for instance sample rate, size, etc.) followed by the audio stream itself, which is a looped recording of a car being held at various RPMs. Audio data within an `SGXD` must be in `VAG` format, which is also a Sony format designed for the PS2 and PS3. There are various tools that can convert standard sound formats to `VAG`, such as Awave Studio, which is recommended for its ability to fine-tune audio samples.

There is no limit to how many SGXDs an ESGX can contain, but 400KB is a hard limit for the finished combination of engine and exhaust. This 400KB doesn't have to be split evenly, for example a 350KB exhaust and 49KB engine will work perfectly fine.

To create and edit ESGX files, the [ESGX Editor](http://gtr.ajb-tech.co.uk/files/GTESGXEditor-20201202.zip) is required.

---

## Creating ESGX Sounds

Although there is usually a lot of fine-tuning required to get the loops to run seamlessly, the general overview of creating an ESGX file is as follows:

* Identify the sound you want to replace (`soundNum` for your car in the [`ENGINE`](../concepts/specdb.md#engine) table of SpecDB) - this is the name used for the ESGX file, for instance the Peugeot 205 T16 uses `57936.esgx` in its turbo exhaust level folders.
* Source the loops you want to use for the car in a common format such as `WAV` - it is also beneficial to know which RPM each loop was recorded at as it reduces guesswork.
* Use Awave Studio to enable looping on those files and re-save them as `Sony VAG`.
* Re-open the saved VAG files - this is important as when exporting to VAG, the sample length of the sound is rounded down to the nearest multiple of 28. Not reopening the VAG means the sample counts won't match the final product.
* Use Awave's loop editor to figure out a seamless loop, then note down the start and end sample values for this seamless loop. The new loop points don't need to be saved as the ESGX will control the loop points, not the sounds themselves.
* Use the ESGX editor and click the + button to add as many SGXDs as you need.
* For each SGXD, populate the following:
	* `Name` - Not used but simply for safekeeping. Max 32 characters.
	* `Loop Start and End Sample` - The values you noted from Awave for each loop.
	* `RPM Pitch` - The pitch of the sound - simply match the RPM the sample was recorded at. Lower value means higher pitch and vice versa.
	* `RPM Start` - Same as RPM Pitch, unless it is the first sound, in which case set this to 0.
	* `RPM End` - Same as RPM Pitch, unless it is the last sound, in which case it should be set to a value the car will never reach so that it doesn't fade out - e.g. the max of 32767.
	* `RPM Volume` - How loud the sound will be played. 15000 is a good value and is balanced with most of GT's existing sounds, but can be tweaked if a louder or quieter sound is needed.
	* `RPM Frequency` - Exact function is unknown but seems to also affect pitch. 4200 seems to generally work for this.
	* `Audio Stream` - Use "Import .vag" to add the audio data for each SGXD loop.
* Adjust and tweak as needed, using Awave if the loops need to be adjusted.
* Save the file using the intended replacement `soundNum` as the name (e.g. `57936.esgx`)
* Replace all applicable exhaust sounds (and engine if you created one)

---

## AES Sounds

`AES` (presumably Advanced Engine Synthesizer) is an detailed system which allows vehicles to generate entirely new sounds from scratch, without using any recordings. Editing these files requires [GT Standard Definition Editor](https://github.com/Nenkai/GTStandardDefinitionEditor). 

!!! note
    A good level of vehicle engine and audio processing knowledge is required to make realistic sounds.

`AES` sounds are the same across all exhaust upgrade levels and have no file extension unlike ESGX.

Use an open any original `AES` file with the Definition Editor in the `carsound/aes` folder to use as a base (Preferably the `60100` file). Note: The tool cannot add/remove nodes yet, some bases may have more information to play with than others.

The following list does not cover all of the AES parameters, but describes the currently understood parameters and their effects.

### AESSlot

Parameter | Name | Description
------------ | ------------- | -----------
`stroke_type` | Engine Type | 1 = four stroke (most common engine type), 0 = two stroke (mostly smaller bike/kart engines) - setting to two stroke drastically increases the pitch of the sound.
`n_cylinders` | Cylinder Count | The number of cylinders the engine has. This corresponds with the timing values below to generate the correct sound for the engine.
`n_bank` | Cylinder Head Count | How many cylinder heads the car has (e.g. 1 = inline/straight, 2 = V)
`displacement_cc` | Cubic Capacity | The cubic capacity of the engine - larger values appear to slightly "deepen" the sound.
`idle_rpm` | Idle RPM | Self explanatory but appears to have no effect.
`revlimit_rpm` | Rev Limiter RPM | Self explanatory but appears to have no effect.
`ex_apf_g` | All Pass Filter Gain | Generally affects the loudness and "smoothness" of the sound.
`ex_duct_r` | Exhaust Duct Radius | Higher values are more raspy but lose some bass (Minimum 0.01)
`ex_lpf_fc` | N/A | Reduces signals with a frequency from 0Hz to the specified number, reducing bass.
`ex_temp` | Exhaust Temperature | In Celsius. Higher values appear to make the sound slightly deeper.
`exend_dia` | Exhaust Tip Diameter | Lower values slightly increase the pitch of the sound, higher slightly decreases.
`exend_fb_hf` | Exhaust High Frequency Filter | A value closer to 1 lessens higher frequencies (i.e. treble reduction).
`exend_fb_lf` | Exhaust Low Frequency Filter | A value closer to 1 lessens lower frequencies (i.e. bass reduction).
`expipe_dia` | Exhaust Pipe Diameter | Similar to `exend_dia`.
`expipe_len` | Exhaust Pipe Length | Longer results in a slightly more harsh sound.
`flownoise_level` | N/A | How much of a "blowing" noise the exhaust has - having a small to moderate value for this generally sounds realistic. A value of around -120 will usually entirely eliminate the blowing.
`misfire_rate` | Engine Misfire Rate | How often the engine misfires. A non-zero value will typically generate some pops and bangs from the exhaust when suddenly accelerating or letting off.
`misfire_thr_sens` | Misfire Throttle Sensitivity | Increasing this will cause the pops and bangs of any misfires to be more sensitive to the throttle.
`output_scale` | General Volume | Similar to `aes_volume`.

### AESTiming
The values here apply to each cylinder in the car's engine. Each cylinder has the following four values (e.g. `c01_ca`, `c01_delay`, `c02_ca`, etc.):


Parameter | Name | Description
------------ | ------------- | -----------
`ca` | Crank Angle | The ordering of the current cylinder relative to the car's crank angle ((720 / number of cylinders ) * current cylinder). `c01` should typically be 0, so a four cylinder engine would go `c01_ca` = 0, `c02_ca` = 180, etc. This can however be shuffled or slightly mis-timed to make the engine sound more aggressive or deeper.
`delay` | Firing Delay relative to Crank Angle | Can be used to affect the firing order of the engine to differentiate between different types (e.g. a 2JZ and RB26 are both inline six engines, but have a different firing order and therefore a different sound).
`exext` | Exhaust/Extractor | Not fully understood but appears to slightly affect timing along with ca and delay.
`inext` | N/A | Not fully understood but appears to have no effect.

### AESMisc
Parameter | Name | Description
------------ | ------------- | -----------
`aes_enable` | AES Enable | Toggles the AES sound.
`aes_volume` | AES Sound Volume | How loud the AES sound is - not a global value as many factors such as filters, exhaust parameters, and `output_scale` can also influence the volume.
`esgx_enable` | ESGX Enable | Enables an ESGX sample to be used for the engine sound of the car, while AES is used for the exhaust. Only works if an ESGX sample is present in carsound\engine with the same number as the AES file.
`esgx_volume` | ESGX Volume | How loud the ESGX engine source is.
`esgx_pitch_scale` | ESGX Pitch Scale |  Affects the pitch of the ESGX engine to allow for fine-tuning to better match the exhaust AES.
