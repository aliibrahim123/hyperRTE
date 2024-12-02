import $edit from '../utils/edit/index.js';

export default (rte, config) => {
	rte.addButton('bold', {
		title: 'toggle bold',
		icon: `<img src='${rte.icons}bold.svg'>`,
		state: () => $edit.isWrappedWith('b'),
		action: () => $edit.bold()
	});
	
	rte.addButton('italic', {
		title: 'toggle italic',
		icon: `<img src='${rte.icons}italic.svg'>`,
		state: () => $edit.isWrappedWith('i'),
		action: () => $edit.italic()
	});
	
	rte.addButton('underline', {
		title: 'toggle underline',
		icon: `<img style='height:calc(var(--vd) * 1.2)' src='${rte.icons}underline.svg'>`,
		state: () => $edit.isWrappedWith('u'),
		action: () => $edit.underline()
	});
	
	rte.addButton('strikethrough', {
		title: 'toggle strikethrough',
		icon: `<img src='${rte.icons}strikethrough.svg'>`,
		state: () => $edit.isWrappedWith('s'),
		action: () => $edit.strikeThrough()
	});
	
	rte.addButton('subscript', {
		title: 'toggle subscript',
		icon: `<img src='${rte.icons}subscript.svg'>`,
		state: () => $edit.isWrappedWith('sub'),
		action: () => $edit.subscript()
	});
	
	rte.addButton('superscript', {
		title: 'toggle superscript',
		icon: `<img src='${rte.icons}superscript.svg'>`,
		state: () => $edit.isWrappedWith('sup'),
		action: () => $edit.superscript()
	});
}