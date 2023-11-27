# Models

!!! warning
    
    This documentation is WIP as the tool is not yet released.

!!! note

    This section is mainly for GT3 for the time being.

This is a guide to get started with importing or exporting models from or to GT3 and GT4.

## Dumping Models

#### Requirements

* GTPS2ModelTool

### Dumping

Models are located within the following folders:

| Game | Path | Description |
|-|-|-|
| GT3 | `cars/day`  | Models for tracks on day setting
|     | `cars/eve`  | Models for tracks on day setting i.e Seattle
|     | `cars/night`| Models for tracks on evening setting i.e Special Stage Route 5
|     | `menu/cars` | Menu models
| GT4 | `car/lod`   | Race models
|     | `car/menu`  | Menu models
|     | `car/open`  | Race models (cars with open interior)


Run GTPS2ModelTool as such:

``` markdown title="Dumping a model"
GTPS2ModelTool dump -i <path to car file>
```

Dumping will output cars in obj, png formats for viewing externally. This will output a folder next to the car file with models as `obj` format which you can browse.

!!! note

    * Dumping models does **not** make them suitable for re-importing.
    * If you are viewing with Blender, Y and Z are swapped.

---

## Custom Models

* Understanding how to edit game files - [GT3](gt3/volume.md) / [GT4](gt4/volume.md)
* Modeling Knowledge
* Modeling Software ([Blender](https://www.blender.org/), [3ds Max](https://www.autodesk.com/products/3ds-max/overview)...)
* GTPS2ModelTool

The first thing you should do if you haven't is to start dumping original models in order to be familiar with their requirements (vertex count, texture formats, etc).

You'll be able to observe that cars are generally made up of **3 LODs**, and also have their own meshes for reflections. While cars can be made with one single LOD, it is recommended to create at least three to closely match original model setups.

!!! tip "Checklist"

    Here is a check list of things to keep in mind while creating models.

    * The scale is `1 unit = 1 meter`
    * Polygons must be triangles so make sure that there are no quads, otherwise make a copy of your model and triangulate it.
    * The main concern is **model file size** and __textures__ will take most of it. It is always recommended to use paletted texture formats such as 4bpp  (default). Remember to account for LODs.
        * For GT3, the max car model file size is `688.128` bytes (`672Kb`) for __race__ models, `819.200` bytes (`800Kb`) for __menu__ models.
    * Texture dimensions must generally be a __**power of two**__ i.e 16x16, 32x16, etc.
    * Try to reuse textures as much as possible.
    * When working on things like windshields, you could store only half of the texture and mirror it across both sides.
    * If you need to spread a color across a mesh, use a 1x1 texture to save on size.
    * Ensure that your modeling software outputs `Kd` in your material `mtl` file - otherwise causes models to look very dark.

### Creating a ModelSet

To create a model set, make a `.yaml` file in your model folder. These are the main config files you use in order to build a ModelSet.

??? abstract "Sample File"

    ```yaml
    Models:
      MyPlaneModel: # Model name, can be anything really
        LODs: # List of LODs, not optional
          plane.obj: # LOD0 - Each LOD must be pointing to a obj file

            # Parameters for each mesh, optional
            MeshParameters:

              # Target mesh name (in obj)
              plane:

                # If 'UseExternalTexture' is true, this mesh uses an external texture provided by the engine
                # This may be for instance, the track's reflection texture
                UseExternalTexture: false

                # OPTIONAL - These commands will be executed BEFORE the shape is called/rendered
                # After the shape is called, the parameters will be reset (unless the next shape uses same ones)
                # Preferably meshes should be in order of obj declaration if you are using many parameters (otherwise clogs command list & file size)
                CommandsBefore:
                # List of functions
                #  - AlphaFunction(func, 0)
                #  - AlphaFail(method)
                #  - BlendFunction(a, b, c, d, fix)
                #  - DepthBias(5.0)
                #  - DisableAlphaTest
                #  - DisableCullFace
                #  - DisableDepthMask
                #  - DestinationAlphaFunc(func)
                #  - EnableDestinationAlphaTest
                #  - MatrixMode(mode)
                #  - PushMatrix
                #  - PopMatrix
                #  - Rotate(angle, x, y, z)
                #  - Translate(x, y, z)
                #  - Scale(x, y, z)

            # Callback when lights are off/on
            TailLampCallback:
              Off:
                - Brake_Off # Use shape 'Brake_Off'
              On:
                - Brake_On  # Use shape 'Brake_On'

          plane1.obj: # LOD1
    ```

Then to create a model:
``` markdown title="Creating a model"
GTPS2ModelTool make-model-set -i <path to .yaml file>
```

### Creating a car model

TODO