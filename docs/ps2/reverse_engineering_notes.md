# Reverse-Engineerign Notes

## Encrypted VIF1 program

The [VIF1](https://psi-rockin.github.io/ps2tek/#vif) microcode is, for some unhinged reason, encrypted. The VIF0 program is however not encrypted.

You can find them at the following offsets:

* GT3 EU VIF0: `0x34AF00` - Size `0x398`
* GT3 EU VIF1: `0x2F8A80` - Size `0x3DA8`
* GT4 Online US VIF0: `0x731180` - Size `0x920`
* GT4 Online US VIF1: `0x69B110` - Size `0x3FF0`

To decrypt the VIF1 bytecode:

```csharp
static int _hash = 0x32277070;

static int GetRandom()
{
    _hash = 0x5D588B65 * _hash + 1;
    return _hash;
}

var bytes = File.ReadAllBytes("<path to bytecode>");
for (int i = 0; i < size; i++) // Replace size by actual size
{
    bytes[i] ^= (byte)GetRandom();
}
```

## VM Pseudocode

Example: `classic1.mdl`

```csharp
// rightGrasp is host method (provided by engine)
// blink is host method (provided by engine)

constructor()
{
	out blend_br0 = 0;
	out blend_tw0 = 0;
	
	out blend_br1 = 0;
	out blend_tw1 = 0;
}

update()
{
	var temp;

	temp = ((rightGrasp * 1.0f) * 0.99999f);
	out blend_br0 = ToInt(temp);
	out blend_tw0 = temp % 1.0f;
	
	temp = ((blink * 1.0f) * 0.99999f);
	out blend_br1 = ToInt(temp);
	out blend_tw1 = temp % 1.0f;
}
```

