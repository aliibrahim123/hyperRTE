import $edit from '@simplyjs/dom/edit.js';
import { addList, addNumber } from '../creators.js';
import { construct } from '@simplyjs/dom/base.js';

export default (rte, config) => {
	addList(rte, 'align', {
		title: 'change text aligning',
		icon: `<img src='${rte.icons}align-justify.svg'>`,
		data: ['left', 'right', 'center', 'justify'],
		item: (type) => construct(`<img title=${type} style='width: calc(var(--vd) * 1.5' src='${rte.icons}align-${type}.svg'>`),
		action: (type) => $edit.align(type),
		state: (rte, el) => { el.children[0].src = `${rte.icons}align-${
			$edit.getWrapped('div', el => el.style.textAlign !== '')?.style?.textAlign || 'justify'
		}.svg` }
	});
	
	addNumber(rte, 'indent', {
		title: 'change text indent',
		icon: `<img src='${rte.icons}indent.svg'>`,
		placeholder: 'size',
		min: 1,
		action: (value) => $edit.indent(value === 'initial' ? value : value + 'px'),
		reset: true
	});
	
	addList(rte, 'direction', {
		title: 'change text direction',
		icon: `<img src='${rte.icons}direction-ltr.svg'>`,
		data: ['ltr', 'rtl'],
		item: (dir) => construct(
			`<img title=${dir === 'ltr' ? 'left' : 'right'} style='width: calc(var(--vd) * 1.5' src='${rte.icons}direction-${dir}.svg'>`
		),
		action: (dir) => $edit.direction(dir),
		state: (rte, el) => { el.children[0].src = `${rte.icons}direction-${
			$edit.getWrapped('div', el => el.style.direction !== '')?.style?.direction || 'ltr'
		}.svg` }
	});
}