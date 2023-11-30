## WebAssembly

WebAssembly is used to convert hight level code from languages like C++, into low level binary format, then it can be executed on browser like javascript.

## Working

C/C++ => Emscripten SDK compiler => .WASM => web Browser(HTML+Js+.wasm)

## Install Emscripten sdk

1. Clone the emsdk repo : git clone https://github.com/emscripten-core/emsdk.git.

2. Enter inside the directory emsdk.
   cd emsdk

3. Execute following command.
   ./emsdk install latest

4. To activate latest SDK execute following command in your terminal.
   ./emsdk activate latest

5. To activate PATH and other environment variables run following command in your terminal.
   emsdk_env.bat

6. installation complete,
   to compile C/C++, following code will be required-

   To just get the wasm file you can use following command. This command will give you only source.wasm file.

emcc source.cpp -s STANDALONE_WASM

To get the source.html,source.js and source.wasm-
emcc source.c or source.cpp -s WASM=1 -o source.html
[this will give a name.html file that will give you executable code.]

## Example

to execute code in hello.cpp

command- emcc ..\hello.cpp -s WASM=1 -o ..\hello.html

this gives us hello.html,hello.wasm,hello.js in directory, the code is executable from hello.js.
