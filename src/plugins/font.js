import $edit from '../utils/edit/index.js';
import { construct, query } from '../utils/dom.js';
import { checkarr } from '../check.js';
import { createDropDown, addList, addColor, addNumber } from '../creators.js';

//used to keep focus on selected text
var clickListner = () => rte.focus();

export default (rte, config) => {
	var fonts = config.fonts || [
		'default', 'cursive', 'monospace', 'serif', 'sans-serif', 'fantasy', 'Arial', 'Arial Black', 'Arial Narrow',
		'Arial Rounded MT Bold', 'Bookman Old Style', 'Bradley Hand ITC', 'Century', 'Century Gothic', 'Comic Sans MS',
		'Courier', 'Courier New', 'Georgia', 'Gentium', 'Impact', 'King', 'Lucida Console', 'Lalit', 'Modena',
		'Monotype Corsiva', 'Papyrus', 'Tahoma', 'TeX', 'Times', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Verona'
	];
	checkarr(fonts, 'fonts');
	
	addNumber(rte, 'font size', {
		title: 'change font size',
		icon: `<img src='${rte.icons}font-size.svg'>`,
		placeholder: 'size',
		min: 1,
		action: (value) => $edit.fontSize(value === 'initial' ? value : value + 'px'),
		reset: true
	});
	
	addList(rte, 'font family', {
		title: 'change font family',
		icon: `<img src='${rte.icons}font-family.svg'>`,
		data: fonts,
		item: font => construct(`<span style='font-family: "${font}"'>${font}`),
		action: (font) => $edit.fontName(font === 'default' ? 'initial' : font)
	});
	
	addColor(rte, 'font color', {
		title: 'change font color',
		icon: `<img src='${rte.icons}font-color.svg'>`,
		action: (value) => $edit.fontColor(value)
	});
	
	addColor(rte, 'background color', {
		title: 'change backColor color',
		icon: `<img src='${rte.icons}back-color.svg'>`,
		action: (value) => $edit.backColor(value)
	});
}