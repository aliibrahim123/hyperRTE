import $edit from '../utils/edit/index.js';
import { addInput } from '../creators.js';
import { construct } from '../utils/dom.js';

export default (rte, config) => {
	addInput(rte, 'image', {
		title: 'add image',
		icon: `<img src='${rte.icons}image.svg'>`,
		type: 'url',
		placeholder: 'insert url',
		action: (url) => $edit.insert(construct(`<img src='${url}' class=resizable>`), 'node')
	});
	
	addInput(rte, 'link', {
		title: 'add link',
		icon: `<img src='${rte.icons}link.svg'>`,
		type: 'url',
		placeholder: 'insert url',
		reset: true,
		action: (url) => url === 'initial' ? $edit.undo('a') : $edit.link(url),
		state: () => $edit.isWrappedWith('a')
	});
	
	addInput(rte, 'video', {
		title: 'add video',
		icon: `<img src='${rte.icons}video.svg'>`,
		type: 'url',
		placeholder: 'insert url',
		action: (url) => $edit.insert(construct(`<video src='${url}' class=resizable>`), 'node')
	});
	
	addInput(rte, 'iframe', {
		title: 'add iframe',
		icon: `<img src='${rte.icons}iframe.svg'>`,
		type: 'url',
		placeholder: 'insert url',
		action: (url) => $edit.insert(construct(`<iframe src='${url}' class=resizable>`), 'node')
	});
}