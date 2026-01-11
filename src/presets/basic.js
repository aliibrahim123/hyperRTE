import HyperRTE from '../index.js';
import baseToolsPlugin from '../plugins/baseTools.js';
import basicPlugin from '../plugins/basic.js';

export default (config) => new HyperRTE({
	plugins: [baseToolsPlugin, basicPlugin],
	toolbar: [
		'clean', 'remove format', 'separator',
		'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'
	],
	...config
})