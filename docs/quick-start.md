# quick start
follow this guide to set up a bare bone editor.

## 1. installation
type into a terminal in your working directory this commnad:
```
$ npm i hyper-rte
```

## 2. setting the editor
attach `hyper-rte/style.css` to your html document and a javascript file as a module (for best practices) and write insdide it:
```js
import HyperRTE from 'hyper-rte/index.js';

var editor = new HyperRTE({
	el: '#editor', //a css selector for the editor element
	icon: '/node_modules/hyper-rte/icons/' //path for the icons directory
})
```
now you have an empty editor

## 3. adding plugins
hyper rte is plugin-based editor, you can find the built-in plugins in `hyper-rte/src/plugins/` directory.

in this guide, we will add **baseTools**, **basic**, and **font** plugins.  
update the javascript file with:
```js
import HyperRTE from 'hyper-rte/index.js';
import baseToolsPlugin from 'hyper-rte/src/plugins/baseTools.js';
import basicPlugin from 'hyper-rte/src/plugins/basic.js';
import fontPlugin from 'hyper-rte/src/plugins/font.js';

var editor = new HyperRTE({
	el: '#editor', //a css selector for the editor element
	icons: '/node_modules/hyper-rte/icons/', //path for the icons directory
	plugins: [baseToolsPlugin, basicPlugin, fontPlugin]
})
```

## 4. customizing the toolbar
in the javascript file write
```js
import HyperRTE from 'hyper-rte/index.js';
import baseToolsPlugin from 'hyper-rte/src/plugins/baseTools.js';
import basicPlugin from 'hyper-rte/src/plugins/basic.js';
import fontPlugin from 'hyper-rte/src/plugins/font.js';

var editor = new HyperRTE({
	el: '#editor', //a css selector for the editor element
	icons: '/node_modules/hyper-rte/icons/', //path for the icons directory
	plugins: [baseToolsPlugin, basicPlugin, fontPlugin],
	toolbar: [ //'separator' means a button separator
		'clean', 'remove format', 'separator',
		'select paragraph', 'select all', 'separator',
		'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'separator',
		'font size', 'font family', 'font color', 'background color'
	]
})
```

## what next
1. learn about the [package structure](package-structure.md)
2. learn about the [editor class](editor-class.md)
3. learn about the [creators](creators.md)
4. learn about the [plugins](plugins.md) and [presets](presets.md)