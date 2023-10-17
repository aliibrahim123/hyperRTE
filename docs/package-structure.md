# package structure
this page explains every file in the package and its purpose

## index.js
a minified javascript module that exports the [editor class](editor-class.md) and the [creators](creators.md).

this is the recommended file to use as it is minified and doesnt polute the global scope

## index.g.js
a minified javascript module that exports the [editor class](editor-class.md) and the [creators](creators.md).  
it also add a the [editor class](editor-class.md) as a global variable called `HyperRTE`, it also assign the creators to this variable.

it is remommended to use this file when you want the library as a global variable.

## style.css
a css file that contains all the styles of the editor.

## style.minimal.css
a css file that contains the minimal amount of styles required for a bare metal editor.

## icons folder
a folder that contains the default icons of the editor.

## presets folder
a folder that contains the presets files as minified javascript files.

## src folder
the source code folder.

### index.js
the unmenified version of `index.js`.

### index.g.js
the unmenified version of `index.g.js`.

### creators.js
the unmenified version of `creators.js`.

### presets folder
a folder containing the unmenified version of the presets files.

### plugins folder
a folder containing the plugins files as unminified javascript modules.