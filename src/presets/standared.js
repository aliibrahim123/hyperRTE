import HyperRTE from '../index.js';
import basicPlugin from '../plugins/basic.js';
import baseToolsPlugin from '../plugins/baseTools.js';
import fontPlugin from '../plugins/font.js';
import containersPlugin from '../plugins/containers.js';
import textFlowPlugin from '../plugins/textFlow.js';
import embedsPlugin from '../plugins/embeds.js';
import resizePlugin from '../plugins/resize.js';

export default (config) => new HyperRTE({
	plugins: [
		baseToolsPlugin, basicPlugin, fontPlugin, containersPlugin, textFlowPlugin, embedsPlugin, resizePlugin
	],
	toolbar: [
		'clean', 'remove format', 'separator',
		'select paragraph', 'select all', 'separator',
		'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'separator',
		'font size', 'font family', 'font color', 'background color', 'separator',
		'paragraph', 'quote', 'heading', 'horizantal rule', 'separator',
		'unordered list', 'ordered list', 'separator',
		'align', 'indent', 'direction', 'separator',
		'image', 'link', 'video'
	],
	...config
})