# Model Render Commands

This is the available model render commands exposed by `GTPS2ModelTool`.

---

## AlphaFunction

Sets the Alpha function to use.

Usage: `AlphaFunction(func, ref)`

- `func`: **String** - Sets [GS TEST Alpha Test](https://psi-rockin.github.io/ps2tek/#gstestsandpixelcontrol) method. Valid modes:
    - `NEVER`
    - `ALWAYS`
    - `LESS`
    - `LEQUAL`
    - `EQUAL`
    - `GEQUAL`
    - `GREATER` <- Default
    - `NOTEQUAL`
- `ref`: **Byte** - Sets [GS Test AREF](https://psi-rockin.github.io/ps2tek/#gstestsandpixelcontrol) value. Alpha value to be compared and referred to. Defaults to `0x20`/`32`

---

## AlphaFail

Sets the alpha fail method to use.

Usage: `AlphaFail(method)`

- `method`: **String** - Sets [GS TEST Alpha Test Failure processing](https://psi-rockin.github.io/ps2tek/#gstestsandpixelcontrol). Valid modes:
    - `KEEP` - **Default** - Neither frame buffer nor Z buffer is updated.
    - `ALWAYS` - Only frame buffer is updated.
    - `ZB_ONLY` - Only Z buffer is updated.
    - `RGB_ONLY` - Only frame-buffer RGB is updated.

---

## BlendFunction

Sets the [GS Alpha Blending](https://psi-rockin.github.io/ps2tek/#gsalphablending) function to use. 

Usage: `BlendFunction(a, b, c, d, fix)`

- `a`: **Byte** - Defaults to **0**.
- `b`: **Byte** - Defaults to **1**.
- `c`: **Byte** - Defaults to **0**.
- `d`: **Byte** - Defaults to **1**.
- `fix`: **Byte** - Fixed alpha value. Defaults to **1**.

---

## ColorMask

Sets the color mask.

Usage: `ColorMask(mask)`

- `mask`: **UInt** - Defaults to **0**.

---

## DisableAlphaTest

Disables alpha testing. Note that it is **enabled by default**.

Usage: `DisableAlphaTest`

---

## DisableCullFace

Disables face culling. Note that it is **enabled by default**.

Usage: `DisableCullFace`

---

## DisableDepthMask

Disables depth mask. Note that it is **enabled by default**.

Usage: `DisableDepthMask`

---

## DestinationAlphaFunc

Sets the destination alpha function.

Usage: `DestinationAlphaFunc(tst)`

- `tst`: **String** - Function mode. Valid modes:
    - `EQUAL_ZERO` - GS_TEST DATM bit to 0 - Pixels with destination equal to 0 pass
    - `EQUAL_ONE` - **Default** - Set GS_TEST DATM bit to 1 - Pixels with destination equal to 1 pass

---

## EnableDestinationAlphaTest

Enables GS Destination Alpha testing.

Usage: `EnableDestinationAlphaTest`

---

## FogColor

Sets the fog color - GS `FOGCOL` register.

Usage: `FogColor(r, g, b)`

- `r`: **Byte** - **Defaults to unspecified**
- `g`: **Byte** - **Defaults to unspecified**
- `b`: **Byte** - **Defaults to unspecified**

---

## DepthBias

Sets the depth bias.

Usage: `DepthBias(bias)`

- `bias`: **Float** - **Defaults to 0.0**.

---

## PushMatrix

Pushes the current matrix stack down by one, duplicating the current matrix. Intended to be used with transformation commands. Similar to [glPushMatrix](https://registry.khronos.org/OpenGL-Refpages/gl2.1/xhtml/glPushMatrix.xml).

Usage: `PushMatrix`

---

## PopMatrix

Pushes the current matrix stack down by one, duplicating the current matrix. Intended to be used after transformation commands. Similar to [glPopMatrix](https://registry.khronos.org/OpenGL-Refpages/gl2.1/xhtml/glPopMatrix.xml).

Usage: `PopMatrix`

---

## MatrixMode

Sets the matrix mode. Similar to [glPushMatrix](https://registry.khronos.org/OpenGL-Refpages/gl2.1/xhtml/glPushMatrix.xml).

Usage: `MatrixMode(mode)`

- `mode`: **String** - Matrix mode. Valid modes:
    - `MODEL_VIEW`
    - `PROJECTION`
    - `TEXTURE`

---

## Rotate

Performs a rotation transformation. Similar to [glRotate](https://registry.khronos.org/OpenGL-Refpages/gl2.1/xhtml/glRotate.xml).

Usage: `Rotate(angle, x, y, z)`

- `angle`: **Float**
- `x`: **Float**
- `y`: **Float**
- `z`: **Float**

---

## Translate

Performs a translation transformation. Similar to [glTranslate](https://registry.khronos.org/OpenGL-Refpages/gl2.1/xhtml/glTranslate.xml)

Usage: `Translate(x, y, z)`

- `x`: **Float**
- `y`: **Float**
- `z`: **Float**

---

## Scale

Performs a scale transformation. Similar to [glScale](https://registry.khronos.org/OpenGL-Refpages/gl2.1/xhtml/glScale.xml).

Usage: `Scale(x, y, z)`

- `x`: **Float**
- `y`: **Float**
- `z`: **Float**

---

## UnkGT3_3_1ui

!!! warning 
    This is unknown.

Usage: `UnkGT3_3_1ui(color)`

- `color`: **UInt** - Defaults to 0

---

## UnkGT3_3_4f

!!! warning 
    Same as `UnkGT3_3_1ui`, this is unknown aside from control over each channel color.

Usage: `UnkGT3_3_4f(r, g, b, a)`

- `r`: **Float**
- `g`: **Float**
- `b`: **Float**
- `a`: **Float**