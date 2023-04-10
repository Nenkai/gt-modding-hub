# Adhoc Compiled/Header

:octicons-cpu-24: *Applies to GT4, GT5, GTPSP, GT6, GT Sport, GT7* · :octicons-arrow-right-16: Endian: Little

This is the main header for [Adhoc Scripts](../../concepts/adhoc/adhoc.md). Most games will have a certain level of backwards compatibility, but it's better to keep them at the latest that the engine supports. This format was changed quite a bit over the games.

---

## Dissasembling

The [GTAdhocToolchain](https://github.com/Nenkai/GTAdhocToolchain) can be used to dissasemble compiled `.adc` scripts into an assembly-like text file.

---

## Header

Field              | Offset         | Type           | Description                               |
----------------   | ------------   | ----------     | --------------------------------------    |
`ADCH`             |  `0x00`        | `Int`          | Magic, (Enforced, cannot be different)    |
Version            |  `0x04`        | `char[3]`      | Version, i.e `012`.                       |
Symbol Table       |  N/A           | `Symbol Table` | Symbol Table (V9 to V12)                  |
Top Level Frame    |  N/A           | `Code Frame`   | The top-level code frame.                 |

### Symbol Table

!!! note
    Version 9 to 12 only.

Field              | Type       | Description                                                                             |
----------------   | ---------- | --------------------------------------                                                  |
Symbol Count       | `VarInt`   | Number of symbols in the script                                                         |
Symbols            | `Symbol[]` | Array of symbols.                                                                       |

### Code Frame

??? note "If version < 8"

    Field                       | Type        | Description                               |
    ----------------            | ----------  | --------------------------------------    |
    Source Path                 | `Symbol`    | Source file name for this script.         |
    Subroutine Parameter Count  | `Int`       | Number of parameters for this subroutine. |
    Subroutine Parameters       | `Symbol[]`  | Subroutine parameters.                    |



??? note "If version >= 8"

    Field                        | Type        | Description                                                           |
    ----------------             | ----------  | --------------------------------------                                |
    Source Path                  | `Symbol`    | Source file name for this script.                                     |
    Frame Version                | `byte`      | Adhoc version of the frame. Should match with main header.            |
    Has Rest Element             | `bool`      | Whether this frame has a rest element. `function myFunc(arg, args...)`|
    Subroutine Parameter Count   | `Int`       | Number of parameters for this subroutine.                             |
    Subroutine Parameters        | `Symbol[]`  | Subroutine parameters.                                                |
    Captured Callback Param Count| `Int`       | Number of parameters to be captured from the parent frame.            |
    Captured Callback Parameters | `Symbol[]`  | Parameters to be captured from the parent frame.                      |
    Unknown                      | `Int`       | ?                                                                     |

#### Stack Setup

The stack holds the actual object stack, and a storage of the local variables for the current frame.

??? note "If version <= 10"

    Field                       | Type        | Description                                                                    |
    ----------------            | ----------  | --------------------------------------                                         |
    Variable Storage Size       | `Int`       | Variable storage size. Unlike later versions, locals and statics are combined. |
    Stack Size                  | `Int`       | Object Stack size.                                                             |

??? note "If version >= 12"

    Field                       | Type        | Description                                                                    |
    ----------------            | ----------  | --------------------------------------                                         |
    Stack Size                  | `Int`       | Object Stack size.                                                             |
    Local Variable Storage Size | `Int`       | Storage size for local variables.                                              |
    Static Variable Storage Size| `Int`       | Storage size for static variables.                                             |

#### Instruction Table

Field                       | Type        | Description                                                                                  |
----------------            | ----------  | --------------------------------------                                                       |
Instruction Count           | `Int`       | Number of instructions for this frame.                                                       |
Instructions                | `Inst[]`    | Instructions.                                                                                |

#### Instruction
Field                       | Type                     | Description                                                                                  |
----------------            | ----------               | --------------------------------------                                                       |
Source Line Number          | `UInt`                   | Line number for this instruction - originating from the location of the compiled expression. |
Opcode/Instruction Type     | `InstructionOpCode`      | The type of instruction.                                                                     |
Instruction Data            | `...`                    | Instruction data. Refer to [GTAdhocToolchain](https://github.com/Nenkai/GTAdhocToolchain/tree/master/GTAdhocToolchain.Core/Instructions) for how they are read.    |

??? abstract "Opcode Table (click to expand)"

    Opcodes fits within a `byte`.

    Value  | Name                     | Description                                                                                                |
    ---    | ----------               | --------------------------------------                                                                     |
    0      | ARRAY_CONST_OLD          | Defines an array.                                                                                          |
    1      | ASSIGN                   | Pops two object from the stack, assigns the last to the previous one, pushes it to the stack.              |
    2      | ATTRIBUTE_DEFINE         | Defines a new attribute onto the current module.                                                           |
    3      | ATTRIBUTE_PUSH           | Pops the last object, pushes an object to it as an attribute. `myObj.myAttr = 5`                           |
    4      | BINARY_ASSIGN_OPERATOR   | Pops two objects from the stack, assigns the previous through an operator, pushes the result to the stack. |
    5      | BINARY_OPERATOR          | Pops two objects from the stack, applies an operator operation, pushes the result to the stack.            |
    6      | CALL                     | Pops the number of provided arguments plus the previous variable as the function, calls it, pushes a result to the stack.  |
    7      | CLASS_DEFINE             | Defines a new class onto the current module.                                                               |
    8      | EVAL                     | Pops an object, evaluates it. Pushes the result to the stack.                                              |
    9      | FLOAT_CONST              | Pushes a new float to the stack. `var myFloat = 1.0`                                                       |
    10     | FUNCTION_DEFINE          | Defines a new function onto the current module.                                                            |
    11     | IMPORT                   | Imports a (or all) members from the specified module path. `import myModule::*`, `import myMember as member` |
    12     | INT_CONST                | Pushes a new int to the stack.                                                                             |
    13     | JUMP                     | Sets the adhoc thread's instruction pointer to the specified instruction index.                            |
    14     | JUMP_IF_TRUE             | Pops an object, sets the adhoc thread's instruction pointer to the specified instruction index if the object evaluates to   true. |
    15     | JUMP_IF_FALSE            | Pops an object, sets the adhoc thread's instruction pointer to the specified instruction index if the object evaluates to   false. |
    16     | LIST_ASSIGN_OLD          | Pops an object, deconstructs it as an array.                                                               |
    17     | LOCAL_DEFINE             | ?                                                                                                          |
    18     | LOGICAL_AND_OLD          | Pops an object, jumps to the specified instruction index if it evaluates to false. Pushes the result.      |
    19     | LOGICAL_OR_OLD           | Pops an object, jumps to the specified instruction index if it evaluates to true. Pushes the result.       |
    20     | METHOD_DEFINE            | Defines a new method onto the current module.                                                              |
    21     | MODULE_DEFINE            | Defines or enters a new module onto the current module.                                                    |
    22     | NIL_CONST                | Pushes a new nil object to the stack. `var obj = nil`                                                      |
    23     | NOP                      | NOP.                                                                                                       |
    24     | POP_OLD                  | Pops an object from the stack.                                                                             |
    25     | PRINT                    | Pops an object and prints its contents to TTY/Console. This is stubbed in retail builds. `print "hello world"`|
    26     | REQUIRE                  | Pops an object, `toString()`'s it to a path and loads it a script file. Contents are loaded onto the current module. |
    27     | SET_STATE_OLD            | Sets the adhoc thread's state. `0` = `EXIT` (exits the scope), `1` = `RETURN` (exits subroutine).          |
    28     | STATIC_DEFINE            | Defines a new static member onto the current module.                                                       |
    29     | STRING_CONST             | Pushes a new string object to the stack. `var myString = "hello"`                                          |
    30     | STRING_PUSH              | Pops the specified amount of objects, combines them together as a string and pushes the result. `var myString = "hello, %{name} !"` |
    31     | THROW                    | Throws an adhoc exception. Normally not used. `throw "my error"`                                           |
    32     | TRY_CATCH                | Defines a new try-catch frame. Sets the adhoc thread's instruction pointer to the specified instruction index if an exception   is caught. |
    33     | UNARY_ASSIGN_OPERATOR    | Pops an object from the stack, assigns the previous through an unary operator, pushes the result to the stack.|
    34     | UNARY_OPERATOR           | Pops an object from the stack, applies an unary operator, pushes the result to the stack.                  |
    35     | UNDEF                    | Undefines the specified module member. `undef myAttr`                                                      |
    36     | VARIABLE_PUSH            | Pushes an object to the specified variable. Pushes it to the stack too.                                    | 
    37     | ATTRIBUTE_EVAL           | Pops an object, evaluates it as an attribute. Pushes it to the stack.                                      |
    38     | VARIABLE_EVAL            | Pops an object, evaluates it as a variable. Pushes it to the stack.                                        |
    39     | SOURCE_FILE              | Sets the adhoc thread's source file, for debugging.                                                        |
    40     | FUNCTION_CONST           | Pushes a new function object/callback onto the stack.                                                      |
    41     | METHOD_CONST             | Pushes a new method object/callback onto the stack.                                                        |
    42     | MAP_CONST_OLD            | Pushes a new map/key-value dictionary object onto the stack.                                               |
    43     | LONG_CONST               | Pushes a new long/int64 onto the stack.                                                                    |
    44     | ASSIGN                   | Pops two object from the stack, assigns the last to the previous one.                                      |
    45     | LIST_ASSIGN              | Pops an object, deconstructs it as an array.                                                               |
    46     | CALL_OLD                 | ? (Never seen used)                                                                                        |
    47     | OBJECT_SELECTOR          | Pops two objects, Selects a member from an object, pushes the result. `myObject.*myMember`                 |
    48     | SYMBOL_CONST             | Pushes a new symbol const onto the stack. `var mySymbol = 'my symbol'`                                     |
    49     | LEAVE                    | Leaves the scope - wipes the local variable storage to the specified index, also sets the current module depth (Stubbed     starting GT6). |
    50     | ARRAY_CONST              | Pushes a new array object onto the stack.                                                                  |
    51     | ARRAY_PUSH               | Pops an object, pushes to the array.                                                                       |
    52     | MAP_CONST                | Pushes a new map/key-value dictionary object onto the stack.                                               |
    53     | MAP_INSERT               | Pops two object object, inserts to the map.                                                                |
    54     | POP                      | Pops an object from the stack.                                                                             |
    55     | SET_STATE_OLD            | Sets the adhoc thread's state. `0` = `EXIT` (exits the scope), `1` = `RETURN` (exits subroutine).          |
    56     | VOID_CONST               | Pushes a new void object onto the stack (for function returns)                                             |
    57     | ASSIGN_POP               | Pops 2 pointers off the stack, and copies the second item to the first item, and pops it.                  |
    58     | U_INT_CONST              | Pushes a new unsigned integer object onto the stack. `var uint = 5u`                                       |
    59     | U_LONG_CONST             | Pushes a new unsigned long object onto the stack. `var ulong = 5ul`                                        |
    60     | DOUBLE_CONST             | Pushes a new double object onto the stack. `var double = 5d`                                               |
    61     | ELEMENT_PUSH             | Pops two objects (one array, one value), pushes the value to the array, pushes the result to the stack. `myObj[0] = myValue` |
    62     | ELEMENT_EVAL             | Pops two objects (one array, one value), evaluates the array with the value, pushes the result to the stack. `var myValue =     myObj[0]` |
    63     | LOGICAL_AND              | Pops an object, jumps to the specified instruction index if it evaluates to false. Pushes the result.      |
    64     | LOGICAL_OR               | Pops an object, jumps to the specified instruction index if it evaluates to true. Pushes the result.       |
    65     | BOOL_CONST               | Pushes a new bool object onto the stack. `var myBool = true`                                               |
    66     | MODULE_CONSTRUCTOR       | Defines a constructor for a module variable. `module (myObj) { ... }`                                      |
    67     | VA_CALL (>= GT6)         | Variadic function call                                                                                     |
    68     | CODE_EVAL (>= GT6)       | ?                                                                                                          |
    70     | DELEGATE_DEFINE (>= GT Sport) | Pops an object, sets the adhoc thread's instruction pointer to the specified instruction index if the object is not nil.   `var myObject == doThing() ?? false` |
    71     | LOGICAL_OPTIONAL (>= GT Sport) | Pops an object, jumps to the specified instruction index if it evaluates to nil. Pushes the result (?). |

### Symbols

!!! note "String Encoding"
    String encoding is set to EUC-JP for version under 10. You can set it up in C# this way:

    === "C#"

    ``` csharp
    // // May need System.Text.Encoding & System.Text.Encoding.CodePages NuGet packages
    Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

    var encoding = Encoding.GetEncoding("EUC-JP");
    ```

In version 8 and earlier, there is no string table, symbols are just prefixed by a short length.

In version 9 and later, symbols are indexed by an index into the symbol table. Indices are encoded with a variable integer.

#### Variable Ints
Here's a sample on how to read/write them:

=== "Decoding"

    ``` csharp
    public ulong ReadVarInt()
    {
        ulong value = (ulong)ReadByte();
        ulong mask = 0x80;

        while ((value & mask) != 0)
        {
            value = ((value - mask) << 8) | (Read1Byte());
            mask <<= 7;
        }
        return value;
    }
    ```

=== "Encoding"

    ```csharp
    public void WriteVarInt(int value)
    {
        if ((value & 0xFFFFFF80) == 0)
        {
            Write((byte)value);
            return;
        }

        var bytesToWrite = 1;
        uint mask = 0x80;
        long retVal = 0;
        do
        {
            retVal = (retVal + mask) << 8;
            mask <<= 7;
            bytesToWrite++;
        } while ((value & -mask) > 0);

        var finalValue = retVal | value;
        for (var i = bytesToWrite; i > 0; i--)
            Write((byte)(finalValue >> (i - 1) * 8));
    }
    ```