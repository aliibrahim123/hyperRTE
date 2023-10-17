## baseTools
the base plugin that is recommended for all builds, it include usefull basic tools.  
**buttons**:
- **clean**: clean the dom.
- **remove format**: unformat the text.
- **select paragraph**: select the paragraph.
- **select all**: select all content.

## basic
the most basic text formatting you can get, it include buttons for **bold**, **italic**, **underline**,
**strikethrough**, **subscript**, and **superscript**.

## font
a simple plugin for font managment.   
it includes buttons for **font size**, **font color**, **font famly**, **background color**.

it also add an option `fonts` of type `String[]` for font famlies,   
default: **default**, **cursive**, **monospace**, **serif**, **sans-serif**, **fantasy**, **Arial**, **Arial Black**, **Arial Narrow**,
**Arial Rounded MT Bold**, **Bookman Old Style**, **Bradley Hand ITC**, **Century**, **Century Gothic**, **Comic Sans MS**, **Courier**,
**Courier New**, **Georgia**, **Gentium**, **Impact**, **King**, **Lucida Console**, **Lalit**, **Modena**, **Monotype Corsiva**,
**Papyrus**, **Tahoma**, **TeX**, **Times**, **Times New Roman**, **Trebuchet MS**, **Verdana**, **Verona**.

## containers
a plugin for text containers.   
**buttons**:
- **paragraph**: toggle paragraph.
- **quote**: add a quote.
- **heading**: add a heading.
- **unordered list**: add an unordered list.
- **ordered list**: add an ordered list.
- **horizantal rule**: add a horizantal rule.

## textFlow
add various text flow modifiers.   
**buttons**:
- **align**: change text aligning.
- **indent**: change text identation.
- **direction**: change text direction.

## embeds
add support for embeding media and links.   
**buttons**:
- **image**: add image.
- **link**: toggle link.
- **video**: add video.
- **iframe**: add iframe.

requires resize plugin for resizing capablities.

## resize
allow the ability to resize the items.   
to make a thing resizable, add `resizable` class to it.

## code
plugin for source manipulation and custom html insertion.   
**buttons**:
- **insert html**: insert custom html string.
- **source**: change the source of the content.

it also add an option `sanitizer` of type `true || Function` for sanitizing the inputed,
if `true` use built in sanitizer else use the specified, if not specified insert normally.

## table
add simple but effictive table support.   
**buttons**:
- **table**: insert a table of specified dimensions.
- **row**: different row actions: **add row before**, **add row after**, **remove row**.
- **column**: different row actions: **add column before**, **add column after**, **remove column**.
- **table caption**: add a caption for the table.

## history
add redo/undo functionality.   
**buttons**:
- **undo**: undo the action.
- **redo**: redo the action.

it also add an option `history` of type `Object` for history options:
- **size** (`Number`): the size of the stack, default `20`.
- **skipActions** (`String[]`): actions to skip, default: `['undo', 'redo', 'copy', 'clean', 'select paragraph', 'select all', 'info']`.

### History class
when this plugin is used, it add property named `history` on the editor instance which is used for history managment.

#### methods and fields
- **get canUndo()**: whether it can undo.
- **get canRedo()**: whether it can redo.
- **push()**: push the current content into the stack.
- **undo()**: perform undo if possible.
- **redo()**: perform redo if possible.

## clipboard
add simple clipboard with multi item support.   
**buttons**:
- **copy**: copy to clipboard.
- **cur**: cur to clipboard.
- **paste**: paste from clipboard.
- **paste text**: paste unformated from clipboard.

it also add an option `clipboard` of type `Number` for clipboard size, default: `10`.

## find
add a multi node find capablities for the editor, wiith the ability to find and replace and step finding.    
**button name**: find.

## customStyle
add custom styling of text with css styling.   
**button name**: custom style.

## info
display information of the text like text length, character and word count.   
**button name**: info.

## unicode
add full unicode input support featuring all blocks and characters.   
**button name**: unicode.