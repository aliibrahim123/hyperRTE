import $edit from '@simplyjs/dom/edit.js';
import { addList } from '../creators.js';
import { construct } from '@simplyjs/dom/base.js';
import { checkpInt } from '../check.js';

export default (rte, config) => {
	var stackSize = config.clipboard || 10;
	checkpInt(stackSize, 'clipboard size');
	rte.clipboard = Array.from({length: stackSize}, () => '');
	
	addList(rte, 'copy', {
		title: 'copy to clipboard',
		icon: `<img src='${rte.icons}copy.svg'>`,
		data: Array.from({length: stackSize}, (_, i) => i),
		item: (ind) => construct(`<span>item ${ind + 1}`),
		action: (ind, rte) => {
			var pureTextContent = getSelection().toString();
			var content = $edit.copy();
			rte.clipboard[ind] = content;
			rte.trigger('copy', content);
			navigator.clipboard.write([new ClipboardItem({
				'text/html': new Blob([content], {type: 'text/html'}),
				'text/plain': new Blob([pureTextContent], {type: 'text/plain'}),
			})])
		}
	});
	
	addList(rte, 'cut', {
		title: 'cut to clipboard',
		icon: `<img src='${rte.icons}cut.svg'>`,
		data: Array.from({length: stackSize}, (_, i) => i),
		item: (ind) => construct(`<span>item ${ind + 1}`),
		action: (ind, rte) => {
			var pureTextContent = getSelection().toString();
			var content = $edit.cut();
			rte.clipboard[ind] = content;
			rte.trigger('cut', content);
			navigator.clipboard.write([new ClipboardItem({
				'text/html': new Blob([content], {type: 'text/html'}),
				'text/plain': new Blob([pureTextContent], {type: 'text/plain'}),
			})])
		}
	});
	
	addList(rte, 'paste', {
		title: 'paste from clipboard',
		icon: `<img src='${rte.icons}paste.svg'>`,
		data: Array.from({length: stackSize}, (_, i) => i),
		item: (ind) => construct(`<span>item ${ind + 1}`),
		action: (ind, rte) => {
			var content = rte.clipboard[ind];
			$edit.insert(content, 'html');
			rte.trigger('paste', content);
		}
	});
	
	addList(rte, 'paste text', {
		title: 'paste as text from clipboard',
		icon: `<img src='${rte.icons}paste-text.svg'>`,
		data: Array.from({length: stackSize}, (_, i) => i),
		item: (ind) => construct(`<span>item ${ind + 1}`),
		action: (ind, rte) => {
			var temp = document.createElement('div');
			temp.innerHTML = rte.clipboard[ind]
			var content = temp.innerText;
			$edit.insert(content, 'text');
			rte.trigger('paste', content);
		}
	});
}