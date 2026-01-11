# editor class
also called `HyperRTE` is the main class of the library that wrap all the functionality in a simple api.

## constructor(options)
takes options and return editor.

**args**:
- **options**: an option object

**returns**: an instance of `HyperRTE` class.

###### options object:
a plain object containing options.
- **el** (`String | HTMLElement`): the selector or the element to wrap the editor.
- **plugins** (`Function[]`): an array of functions containing the plugins to use, called with `(rte: HyperRTE, options: Object)`.
- **toolbar** (`String[]`): an array of string cotaining the layout of the toolbar, each item is a button name or `"separator"` for a button separator, if empty use all defined buttons according to insertion order.
- **icons** (`String`): a path for the icons folder.
- **clean** (`Object`): for clean configs.
  - **cleanAfterAction** (`Boolean`): whether to clean after each action, default `true`.
  - **doNotMergeTags** (`String[]`): an array containing the tag name of element to not merge.
  - **doNotCleanTags** (`String[]`): an array containing the tag name of element to not clean.
  - **skipTags** (`String[]`): an array containing the tag name of element to skip cleaning.
  
## events
the editor class has a simple event system that allow for easy event based programming.

#### on(name, callback)
listen for an event and invoke a callback.  
**args**: 
- **name** (`String`): the event name.
- **callback** (`Function`): the callback function to be called.

#### off(name, callback)
unlisten for an event by removing the callback.  
**args**: 
- **name** (`String`): the event name.
- **callback** (`Function`): the callback function to be called.

#### once(name, callback)
listen for an event and invoke a callback one time.  
**args**: 
- **name** (`String`): the event name.
- **callback** (`Function`): the callback function to be called.

#### trigger(name, ...args)
triggers an event supplied with arguments.  
**args**: 
- **name** (`String`): the event name.
- **args** (`...any`): the argument to be supplied. 
 
the listners are called with the current instance as first argumment.

#### built in events
- `"stateChange"`: triggered to update the state of the buttons.
- `"beforeAction"`: triggered before every action, use it to do pre-action activities, called with `(actionName: String)`.
- `"afterAction"`: triggered after every action, use it to do post-action activities, called with `(actionName: String)`.
- `"input"`: triggered on every input event, called with `(event: InputEvent)`.
- `"cut"`: triggered on every cut event, called with `(event: ClipboardEvent)`.
- `"copy"`: triggered on every copy event, called with `(event: ClipboardEvent)`.
- `"paste"`: triggered on every paste event, called with `(event: ClipboardEvent)`.
- `"export"`: triggered when exporting the content, called with shared html element cloned from the content element `(el: HTMLElement)`.
- `"showMain"`: triggered on closing a panel.
- `"hideMain"`: triggered on opening a panel.

## addButton(name, definition)
add a button to the button definitions.

**args**:
- **name** (`String`): the button name.
- **definition** (`Object`): the button definition.
  - **title** (`String`) *optional*: title to show on hover.
  - **state** (`Function`) *optional*: a function called on every state change, called with `(editor: HyperRTE, el: HTMLElement)`, and must return a boolean whether to highlight the button.
  - **action** (`Function`) *optional*: a function called on when clicked to start and action, called with `(editor: HyperRTE)`.   
  
    and one of:
    - **icon** (`String`): a html string represent the icon.
	- **creator** (`Function`): a function to construct the button, called with the button element.

### example
a simple button with icon:
```js
editor.addButton('log', {
	title: 'log the content',
	icon: '<img src="info.svg">',
	state: (editor) => editor.content.length > 50, //highlight when content above 50 characters
	action: (editor) => console.log(editor.content)
})
```

an example on creator:
```js
editor.addButton('log', {
	title: 'log the content',
	creator: (el) => el.append('log'),
	action: (editor) => console.log(editor.content)
})
```

## actions
actions are key component of the editor structure, they imply an change in format (like bold/italic) or insertion or 
removing of items or a big change in the content (like undo/redo).

actions are not done unless the input is focus or if they are forced.

#### doAction(name, handler, force)
trigger an action of type **"name"**.  
**args**:
- **name** (`String`): the name of the action.
- **handler** (`Function`): the handler of the action.
- **force** (`Boolean`): whether to trigger even if input is not focus, default `false`.

## element reference
- **mainEl**: the main element of the editor.
- **toolbarEl**: the toolbar element.
- **contentEl**: the content input element.

## content managment
there are various method and fields responsible for content managment.
#### get content
return the content of the editor as html string.

#### set content
set the content of the editor as html string

#### export()
return the content of the editor as html string, without any edit time content (like elements and classes used internally not part of the content).

## cleaning managment
cleaning managment is very usefull feature in HyperRTE as it is responsible for producing clean and non-empty html structure.

#### how it work
- it remove any empty element.
- it merges the content of any adjacent elements with same tag.
- it unwrap the content of any element if one of its parents has the same tag.
- it removes any empty text nodes.
- it merges any adjacent text nodes.

#### clean()
clean the dom.

## selection managment
various methods to manage the selection

#### focus()
focus the content element.

#### captureSelection()
capture the selection and return a funtion, once called reselect the selection.