---
draft: true 
date: 2023-11-24 
categories:
  - PS2
  - GT3
  - GT4
  - Models
authors:
  - Nenkai

slug: inside-look-modelset
---

# An Inside Look at a Structured & Flexible Model Format

As the days of custom models are upon us, now would be the perfect time to shine the light on the remarkable model formats that Polyphony Digital has developed for Gran Turismo. This blog post will mainly focus on the format & system used in **GT3** and **GT4**, but the concept also applies to all the following games!

<!-- more -->

## Polyphony Digital's Mindset
But before that, a refresher on Polyphony's *development process* in general - most of their technologies are created [in-house](https://en.wikipedia.org/wiki/In-house_software) - meaning that they normally build their own tools to achieve their goals. Be it being [Adhoc](../../concepts/adhoc/adhoc.md), [SpecDB](../../concepts/specdb.md), this mindset applies nearly to the entirety of the development pipeline.

However, having your own software implementation of a certain task does not imply that it has to be learned to be consumed in specific ways, in fact it may aswell be the opposite!

## Enter PDI-GL

**PDI-GL**, or Polyphony Digital Inc - Graphics Library, is PDI's graphics rendering library seen starting from GT 2000. Directly inspired from [OpenGL](https://en.wikipedia.org/wiki/OpenGL), it allows any developer with a basic understanding of OpenGL to easily pick up and start programming for the consoles, which is especially convenient considering that the PS2's GS was known to be [difficult to develop for](https://www.denofgeek.com/games/playstation-2-difficult-to-develop-retrospective-legacy/), and the same went for the PS3. The library attempts to hide the complicated parts of the console's rendering under an easy to use sets of functions.

But what does it mean in practice? Well, consider this basic OpenGL 2.0 code which would rotate a cube on the X axis:

=== "C++ (OpenGL)"

    ``` { .yaml .annotate }
    glPushMatrix(); # (1)!
      glRotate(45.0, 1.0, 0.0, 0.0); # (2)!
      drawCube();
    glPopMatrix(); # (3)!
    ```

    1. [glPushMatrix](https://registry.khronos.org/OpenGL-Refpages/gl2.1/xhtml/glPushMatrix.xml) documentation
    2. [glRotate](https://registry.khronos.org/OpenGL-Refpages/gl2.1/xhtml/glRotate.xml) documentation
    3. [glPopMatrix](https://registry.khronos.org/OpenGL-Refpages/gl2.1/xhtml/glPushMatrix.xml) documentation

=== "C++ (PDI-GL)"

    ```cpp
    pglPushMatrix();
      pglRotate(45.0, 1.0, 0.0, 0.0);
      drawCube();
    pglPopMatrix();
    ```

Observe that the only thing we've done here was adding the `p` prefix, which supposedly stands for `polyphony`. The functions nearly matches every original OpenGL functions! This process makes it trivial for developers *port* graphics between games regardless of implementation. Keep that term in mind!

---

## Model Sets

Model Sets are the name of the file format which contains renderable models and have been around since GT 2000 all the way until GT7; There are about 6 known revisions:

* GT 2000: ModelSet0 aka `GTM0`
* GT3 & GTC: ModelSet1 aka `GTM1`
* GT4 & TT: ModelSet2 aka `MDLS`
* GTPSP, GT5, GT6: ModelSet3 aka `MDL3` or `3LDM`
* GT Sport, GT7 (PS4): ModelSet4 aka `4LDM`
* GT7 (PS5): ModelSet5 aka `5LDM`.

!!! note
    Each revision can also be versioned on their own, this is the case for ModelSet3 & above. But in general, revisions implement more structures or features but remain mostly the same concept.

### Header

When new model files are open for reading, they are [re-mapped](http://127.0.0.1:8000/gt-modding-hub/formats/abstract/#mapping) - the file itself is the structure that stays in memory and is then used to operate on. There is no *parsing* involved, therefore much faster to process if they are ready to go.

Each model set header usually follows the same pattern - a table of counts and a table of offsets, each pointing to a specific distinct component of a model set. 

<figure markdown>
  ![Image title](GTM1.png){ width="520" }
  <figcaption>The ModelSet1/GTM1 Header, viewed through a 010 Editor template.</figcaption>
</figure>

There are generally four components that one needs to keep in mind in any model set:

1. **Models**
2. **Shapes** (aka sub-meshes)
3. **Texture Sets** (aka textures)
4. **Materials**

We'll begin with shapes to better understand the model flow.

### Shapes

Shapes are just sub-meshes which points to materials and texture to use. Their formats usually map as close to hardware's as possible. In the case of PS2 model sets for instance, vertex buffers are stored in [VIF commands](https://psi-rockin.github.io/ps2tek/#vifcommands) - which already allows some flexibility as to how to control the [Vector Interface](https://psi-rockin.github.io/ps2tek/#vif).

<figure markdown>
  ![Image title](Shapes.png){ width="520" }
  <figcaption>A shape.</figcaption>
</figure>

Most frequently the VIF commands are `UNPACK` commands, which holds packed data (vertex positions, texture coordinates, normals, strip resets & colors) to be transfered to VIF. That data can be packed to take less space (like 3 floats can be reduced into 3 shorts, which saves 6 bytes per vertex!), although this method is mostly only used in GT4.

VIF commands also holds [GIFtag](https://psi-rockin.github.io/ps2tek/#giftags), which is the primitive way to communicate with the PS2's [Graphics Synthesizer](https://psi-rockin.github.io/ps2tek/#gs) and instruct it on how to render certain buffers. In most cases, [Triangle Strips](https://en.wikipedia.org/wiki/Triangle_strip) are the primary method of transmitting triangles for rendering to the GS.

More details aside, being as close to the hardware in data-driven formats proves to be an *extremely effective* way to allow as much adjustability as possible.

### Models

From a higher perspective models is simply a group of shapes. But models also control how to render those shapes. But how? Shouldn't this be part of each Shape? Material? Texture? Or even hardcoded?

Introducing model rendering commands!

<figure markdown>
  ![Image title](Models.png){ width="520" }
  <figcaption>Looks familiar?</figcaption>
</figure>

When a game needs to render a model set's models, it will iterate through all of the models and *interpret* a list of commands which closely maps PDI-GL functions.

The main commands to keep in mind are the `CallShape` commands. These take a shape index, and sends the shape's data to VIF for rendering. Any command before after it merely sets up how to render the shape.

In this example, this model sets up the [boundary box](https://en.wikipedia.org/wiki/Minimum_bounding_box) for rendering, sets up how to render the shape (disabling [alpha test](https://en.wikipedia.org/wiki/Multisample_anti-aliasing#Alpha_testing), setting the [blending function](https://www.khronos.org/opengl/wiki/Blending), disabling [depth mask](https://registry.khronos.org/OpenGL-Refpages/gl4/html/glDepthMask.xhtml)...).

Every command after calling the shape simply resets rendering parameters to their defaults.

Since PDI-GL is standardized across games, this makes it easy for developers to convert models from a game to another if the same rendering pipeline is used such as.. *standard car models in GT5 and GT6*!

#### Callback Commands

Every model runs under different contexts for instance, car models, track models and more. This is why a specific command exists - the **callback command**. This command allows the model to execute or fetch certain data and render differently depending on it.

Consider this example (snippet from GT3's Honda S2000):

<figure markdown>
  ![Image title](Callback.png){ width="800" }
</figure>

A callback is made with parameter `0` - the parameter determines what kind of data to request for. The callback returns a value - generally a boolean (true/false).

In this case, the status of the tail lamps is requested, whether they should be on or off. If they are **off**, `CallShape` is called with shape `14`, and skips over the commands in charge of handling when they are **on** using `JumpShort`. When **on**, `CallShape` is called with shape `15`.

![Image title](LightsOff.png){ width="500" }
![Image title](LightsOn.png){ width="500" }

As you can see, these shapes are indeed for that one purpose - data-driven, conditional selection of shapes to call whether lights are on or off.

---

Here is another example of callbacks being used:
<figure markdown>
<video allowfullscreen="true" controls>
      <source id="mp4" src="../../../../videos/787b_wobbling.mp4" type="video/mp4">
</video>
<figcaption>Notice the wiper wobbling? Even the antennas! (credits Xenn for the video)</figcaption>
</figure>

This uses another callback parameter (1 through 4) which its result calls a shape and tweens it based on the current aero context (and a bit of randomness). That effectively means that there are up to 4 slots where two are being used here.

Another use case is for mudflaps on rally cars, which also tend to wobble!

<figure markdown>
  <iframe width="800" height="500" src="https://www.youtube.com/embed/2yvSRrumXO0?t=37" title="Gran Turismo 3 - Lancia Stratos Rally Car (Hidden Car) (Real Time)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  <figcaption>Fun fact - a callback is missing on the left mudflap of the hidden Stratos (Credits: Grand Prix)</figcaption>
</figure>

Of course, these callbacks are possible with car models, but parameters aren't necessarily tied to specific numbers, as such courses/tracks can also expose their own callbacks!

### Virtual Machine

!!! warning
    This part is a bit technical!

GT4 aka ModelSet2 went even further and added a [virtual machine](https://en.wikipedia.org/wiki/Virtual_machine) & scripting language for shape manipulation - for an example we will use the beloved Pace Car, which has two rotating strobe lights at its roof - a rather simple setup:
<figure markdown>
  <iframe width="800" height="500" src="https://www.youtube.com/embed/1_K_m1rF5_o" title="[#1287] Gran Turismo 4 - Nissan GRAN TURISMO SKYLINE GT-R (PaceCar) &#39;01 PS2 Gameplay HD" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  <figcaption>Credits: xTimelessGaming</figcaption>
</figure>

First, let's outline the important VM related bits within the ModelSet2 header:

<figure markdown>
  ![Image title](VM.png){ width="300" }
</figure>

1. **Instance Flags** - This is a flag that determines whether the structure/context for the VM instance is part of the model set. If not, it will be allocated aside, away from the model file.
2. **Instance Size** - Size of the instance structure. It is always negated until it has been loaded.
3. **Host Methods** - VM registers that the game engine *provides*, it may be the current car's *speed*, *engine RPM*, *delta time* & more.
4. **Out Registers** - Registers that the VM *outputs* - think of it as output data after the VM has finished processing.
4. **VM Bytecode** - This is the bytecode/commands for the VM, in one single blob of data for the entire model set.
5. **Instance Offset** - Offset for the instance, if it has been indicated as being part of the model set.

Each model contain VM entrypoints - when to use the VM and where within bytecode they should execute. There are 3 of them:

1. **Constructor** - This is called before the model is processed. Optional if there is nothing to be initialized.
2. **Update** - Called on the game's update loop. Optional if there's nothing to be updated.
3. **Render Function** - Called when the render command interpreter encounters a `CallVM` command.

Here is the render commands specific to the Pace Car's strobe lights.

<figure markdown>
  ![Image title](VM2.png){ width="300" }
</figure>

First, the VM is called. For the sake of this blog post I will not go into details as for how the bytecode translates into each instruction, so here is the pseudocode for this model and optionally the original instructions, interpreted:

=== "Pseudocode"

    ```c
    int result;
    result = (((float)time() / 1000f) + 0.0f) % 1.0f;
    result *= 1.0f;

    out builtin_br0 = (int)v1;
    out builtin_tw0 = v1 % 1.0f;
    ```

=== "VM Opcodes"

    ``` { .annotate }
    StackAdvance Advance stack by 1, 1 -> 2, likely making space to 1 variable(s)
    RegisterEval - push stack index: 3 from HostMethod 0 (time) // Note: time is engine provided, values may not be accurate
    ToFloat
    PushIntConst - stack index:4, value:1148846080 (1000f)
    FloatDivide - 0 / 1000, stack index now 3
    PushIntConst - stack index:4, value:0 (0f)
    FloatAddition - 0 + 0, stack index now 3
    PushIntConst - stack index:4, value:1065353216 (1f)
    FloatModulus - 0 % 1, stack index now 3
    StackVariablePush - set stack index 2 value to last value of stack (index 3), stack index now 2

    StackVariableEval - push value from stack index 2, stack index now 3
    PushIntConst - stack index:4, value:1065353216 (1f)
    FloatMultiply - 0 - 1, stack index now 3
    StackVariablePush - set stack index 2 value to last value of stack (index 3), stack index now 2

    StackVariableEval - push value from stack index 2, stack index now 3
    ToInt
    RegisterAssignPop - OutRegister 1 (builtin_br0) 0 (from stack index: 3), stack index now 2

    StackVariableEval - push value from stack index 2, stack index now 3
    PushIntConst - stack index:4, value:1065353216 (1f)
    FloatModulus - 0 % 1, stack index now 3
    RegisterAssignPop - OutRegister 0 (builtin_tw0) 0 (from stack index: 3), stack index now 2

    Return
    ```

We can see that the VM returns two registers - `builtin_br0` and `builtin_tw0`. One seems to be a boolean while the other being a float. These all depend on the current delta time in order to smoothly animate, with `1000f` being the duration in milliseconds.

The following `VM_pgluShapeTweenRatio` uses `builtin_tw0` as the angle for the light, while the next `VM_Branch` uses `builtin_br0` as a way to determine whether to follow a logic branch to render an additional shape.

Obviously there are more operations that can be done using output registers, such as [matrix transformations](https://en.wikipedia.org/wiki/Transformation_matrix) (rotations, translations and more).

---

## Conclusion

Car Models in *sim-racing games* are undoubtedly the most complicated models in games given expectations and has led to creating output formats that are flexible and scriptable across all boards while preserving forward-compatibility. There is always room for improvement, and as such, further revisions (such as ModelSet3 and above) added more render commands (as always, abstracted from the console), VM commands, flexible vertex descriptors & more.

Learning from the first games has definitely helped understanding how the next ones operate and has proven to be not just the way to go for reverse-engineering, but also in development. Creating a model tool for GT3 had direct implications into making it compatible with the next games!