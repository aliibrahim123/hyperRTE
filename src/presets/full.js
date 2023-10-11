import HyperRTE from '../index.js';
import baseToolsPlugin from '../plugins/baseTools.js';
import basicPlugin from '../plugins/basic.js';
import fontPlugin from '../plugins/font.js';
import containersPlugin from '../plugins/containers.js';
import textFlowPlugin from '../plugins/textFlow.js';
import embedsPlugin from '../plugins/embeds.js';
import resizePlugin from '../plugins/resize.js';
import clipboardPlugin from '../plugins/clipboard.js';
import historyPlugin from '../plugins/history.js';
import tablePlugin from '../plugins/table.js';
import codePlugin from '../plugins/code.js';
import unicodePlugin from '../plugins/unicode.js';
import customStylePlugin from '../plugins/customStyle.js';
import findPlugin from '../plugins/find.js';
import infoPlugin from '../plugins/info.js';

export default (config) => new HyperRTE({
	plugins: [
		baseToolsPlugin, basicPlugin, clipboardPlugin, historyPlugin, findPlugin, fontPlugin, containersPlugin, textFlowPlugin, 
		embedsPlugin, resizePlugin, customStylePlugin, tablePlugin, codePlugin, unicodePlugin, infoPlugin
	],
	toolbar: [
		'clean', 'remove format', 'separator',
		'select paragraph', 'select all', 'separator',
		'copy', 'cut', 'paste', 'paste text', 'separator',
		'undo', 'redo', 'separator',
		'find', 'info', 'source', 'separator',
		'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'separator',
		'font size', 'font family', 'font color', 'background color', 'separator',
		'paragraph', 'quote', 'heading', 'horizantal rule', 'separator',
		'unordered list', 'ordered list', 'separator',
		'align', 'indent', 'direction', 'separator',
		'image', 'link', 'video', 'iframe', 'separator',
		'table', 'row', 'column', 'table caption', 'separator',
		'insert html', 'custom style', 'unicode', 
	],
	...config
})