# creators
various functions used to create ui component.

## createDropDown(autoclose)
creates a drop down that closes when clicked outside.  
**args**:
- **autoclose** (`Boolean`) *optional*: whether to close when click outside it, default `true`.

returns `[dropDown, open, close]`.
- **dropDown** (`HTMLElement`): the drop down element.
- **open** (`Function`): function to open the drop down.
- **close** (`Function`): function to close the drop down.
#### example
create a drop down that open with a button
```js
var [dropDown, open, close] = createDropDown();
dropDown.append('test');
editor.addButton('open drop down', {
	icon: '<span>open</span>',
	title: 'open',
	action: () => open()
});
editor.mainEl.prepend(dropDown)
````

## addInput(editor, name, definition)
add a button that open a drop down with input.   
**args**:
- **editor** (`HyperRTE`): an editor instance.
- **name** (`String`): the button name.
- **definition** (`Object`): the definition object, inherit `title`, `state`, and `icon` from the button definition.
  - **type** (`String`): the input type or `"textarea"` for a textarea element.
  - **reset** (`Boolean`) *optional*: whether to add a reset button, call action with `"initial"`, default: `false`.
  - **action** (`Function`): a function called to produce an action, called by `(value: String, editor: HyperRTE)`.

any additional property is assign to the input element.
  
#### example
add an input for inserting html.
```js
addInput(editor, 'insert html', {
	title: 'insert html',
	icon: '<span>insert html</span>',
	action: (str) => $edit.insert(str, 'html')
})
```

#### variations
- **addColor(editor, name, definition)**: add a color picker, `type` set to `"color"`.
- **addNumber(editor, name, definition)**: add a number input, `type` set to `"number"`.

## addInputs(editor, name, definition)
add a button that open a drop down with multiple inputs.   
**args**:
- **editor** (`HyperRTE`): an editor instance.
- **name** (`String`): the button name.
- **definition** (`Object`): the definition object, inherit `title`, `state`, and `icon` from the button definition.
  - **inputs** (`Object[]`): an array of objects containing properties of input elements.
  - **action** (`Function`): a function called to produce an action, called by `(...value: String, editor: HyperRTE)`.
  
#### example
add inputs for inserting image.
```js
addInputs(editor, 'insert image', {
	title: 'insert image',
	icon: '<span>insert image</span>',
	inputs: [
		{type: 'text', placeholder: 'url'},
		{type: 'number', placeholder: 'height'},
		{type: 'number', placeholder: 'width'}
	],
	action: (url, height, width) => {
		var img = document.createElement('img');
		img.src = url;
		img.width = width + 'px';
		img.height = height + 'px';
		$edit.insert(img, 'node')
	}
})
```

## addList(editor, name, definition)
add a button that open a drop down with a list of items.   
**args**:
- **editor** (`HyperRTE`): an editor instance.
- **name** (`String`): the button name.
- **definition** (`Object`): the definition object, inherit `title`, `state`, and `icon` from the button definition.
  - **data** (`Array`): the data array.
  - **item** (`Function`): a function called to construct the list item, must return `HTMLElement`, called by `(value: any, editor: HyperRTE)`.
  - **action** (`Function`): a function called to produce an action, called by `(...value: String, editor: HyperRTE)`.
  
#### example
add list for adding headings.
```js
addList(editor, 'heading', {
	title: 'heading',
	icon: '<span>heading</span>',
	data: [1, 2, 3, 4, 5, 6],
	item: (size) => {
		var el = document.createElement('h' + size);
		el.innerText = 'size ' + size;
		return el
	},
	action: (size) => $edit.heading(size)
})
```

## createDialog(autoclose)
creates a dialog that closes when clicked outside.  
**args**:
- **autoclose** (`Boolean`) *optional*: whether to close when click outside it, default `true`.

returns `[dialog, open, close]`.
- **dialog** (`HTMLElement`): the dialog element.
- **open** (`Function`): function to open the dialog.
- **close** (`Function`): function to close the dialog.
#### example
create a dialog that open with a button
```js
var [dialog, open, close] = createDialog();
dialog.append('test');
editor.addButton('open dialog', {
	icon: '<span>open</span>',
	title: 'open',
	action: () => open()
});
editor.mainEl.prepend(dialog)
````

## addPanel
add a button that hide the main editor view and show a panel. 
**args**:
- **editor** (`HyperRTE`): an editor instance.
- **name** (`String`): the button name.
- **definition** (`Object`): the definition object, inherit `title`, and `icon` from the button definition.
  - **creator** (`Function`): a function that creates the panel, called by `(editor: HyperRTE, back: Function)` 
    and returns `[panel: HTMLElement, onopen: Function]`.
	- **back** (`Function`): a function to close the panel.
	- **panel** (`HTMLElement`): the panel element.
	- **onopen** (`Function`): a function called when opening the panel, to update the state of it, called by `(editor: HyperRTE)`.
  
#### example
add an panel to show source.
```js
addPanel(editor, 'source', {
	title: 'view source',
	icon: '<span>source</span>',
	creator: (editor, back) => {
		var panel = document.createElement('div');
		var backButton = document.createElement('button');
		backButton.innerText = 'back';
		backButton.addEventListener('click', back);
		var sourceEl = document.createElement('div');
		panel.append(backButton, sourceEl);
		return [panel, () => sourceEl.innerText = editor.content]
	}
})
```

## createMenu(editor, items)
create a menu that can be opened and closed.  
**args**: 
- **editor** (`HyperRTE`): an editor instance.
- **items** (`Object`): object of functions named according to the item name inside menu, called when clicked with `(editor: HyperRTE)`.

#### addMenu(editor, name, definition)
add a button that opens a menu.  
**args**:
- **editor** (`HyperRTE`): an editor instance.
- **name** (`String`): the button name.
- **definition** (`Object`): the definition object, inherit `title`, `state`, and `icon` from the button definition,
  any additonal properties are traited as menu items.

#### example
creates a button that open a menu of text snippets:
```js
addMenu(editor, 'snippets', {
	title: 'insert snippets',
	icon: '<span>snippets</span>',
	'hello world': () => editor.doAction('snippet', () => $edit.insert('hello world', 'text')),
	'js is good': () => editor.doAction('snippet', () => $edit.insert('js is good', 'text')),
	'hyper is better': () => editor.doAction('snippet', () => $edit.insert('hyper is better', 'text'))
})
```