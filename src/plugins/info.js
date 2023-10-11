import { createDialog } from '../creators.js';
import { construct, query } from '@simplyjs/dom/base.js';

export default (rte, config) => {
	var [dialog, open, close] = createDialog();
	
	dialog.append(...construct(`
		<div id=length></div>
		<div id=charcount></div>
		<div id=wordcount></div>
	`));
	
	rte.mainEl.append(dialog);
	
	var len = query('#length', dialog)[0];
	var charcount = query('#charcount', dialog)[0];
	var wordcount = query('#wordcount', dialog)[0];
	
	rte.addButton('info', {
		title: 'show information about text',
		icon: `<img src='${rte.icons}info.svg'>`,
		action: () => {
			var text = rte.contentEl.innerText;
			setTimeout(() => open(), 1);
			len.innerText = 'length: ' + text.length;
			charcount.innerText = 'character count: ' + Array.from(text).length;
			wordcount.innerText = 'word count: ' + text.split(' ').length;
		}
	})
}