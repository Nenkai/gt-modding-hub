var Charset = "K59W4S6H7DOVJPERUQMT8BAIC2YLG30Z1FNX";
console.log(GetPathFromSeed(1));

function GetPathFromSeed(seed, oldStyle = false)
{
	var t = "";
	if (seed < 0x400)
	{
		t += 'K';
		var s = XorShift(0x499, 10, seed);
		t += GetSubPathName(s, 2, oldStyle);
	}
	else if (seed - 0x400 < 0x8000)
	{
		t += '5';
		var s = XorShift(0x8891, 15, seed - 0x400);
		t += GetSubPathName(s, 3, oldStyle);
	}
	else if (seed - 0x8400 < 0x100000)
	{
		t += '9';
		var s = XorShift(0x111889, 20, seed - 0x8400);
		t += GetSubPathName(s, 4, oldStyle);
	}
	else if (seed - 0x108400 < 0x2000000)
	{
		t += 'W';
		var s = XorShift(0x2242211, 25, seed - 0x108400);
		t += GetSubPathName(s, 5, oldStyle);
	}
	else if (seed + 0xfdf7c00 >= 0)
	{
		t += '4';
		var s = XorShift(0x8889111, 32, seed + 0xFDEFC00);
		t += GetSubPathName(s, 6, oldStyle);
	}


	return t;
}

function XorShift(x, rounds, startingValue)
{
	for (var i = 0; i < rounds; i++)
	{
		startingValue = startingValue << 1;
		var hasUpperBit = (1 << rounds & startingValue) != 0;
		if (hasUpperBit)
			startingValue ^= x;
	}

	return startingValue;
}


function GetSubPathName(seed, subpathLength, oldStyle)
{
	var pathName = "";

	// Max 16 chars
	var chars = new Array(subpathLength.length);

	if (subpathLength != 0)
	{
		for (var i = 0; i < subpathLength; i++)
		{
			var c = Charset[(seed % 36)];
			seed = (seed / 36) | 0;
			chars[i] = c;
		}

		if (oldStyle) // GT5P Demo
		{
			// 1 letter per folder
			for (var pos = subpathLength - 1; pos >= 0; pos--)
			{
				pathName += '/';
				pathName += chars[pos];
			}
		}
		else
		{
			// 2 letters per folder
			var pos = subpathLength - 1;
			if (subpathLength % 2 == 0)
			{
				pathName += '/';
				pathName += chars[pos];
				pos--;
			}

			while (true)
			{
				pathName += chars[pos];
				if (pos == 0)
					break;
				pathName += '/';
				pathName += chars[pos - 1];
				pos -= 2;
			}
		}
	}

	return pathName;
}