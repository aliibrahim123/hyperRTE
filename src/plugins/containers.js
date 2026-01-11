import $edit from '../utils/edit/index.js';
import { addList } from '../creators.js';
import { construct } from '../utils/dom.js';

export default (rte, config) => {
	rte.addButton('paragraph', {
		title: 'toogle paragraph',
		icon: `<img src='${rte.icons}paragraph.svg'>`,
		action: () => $edit.paragraph(),
		state: () => $edit.isWrappedWith('p')
	});
	
	rte.addButton('quote', {
		title: 'add quote',
		icon: `<img src='${rte.icons}quote.svg'>`,
		action: () => $edit.quote(),
		state: () => $edit.isWrappedWith('q')
	});
	
	addList(rte, 'heading', {
		title: 'add heading',
		icon: `<img src='${rte.icons}heading.svg'>`,
		data: [1, 2, 3, 4, 5, 6],
		item: (size) => construct(`<h${size}>size ${size}`),
		action: (size) => $edit.heading(size),
		state: () => [1, 2, 3, 4, 5, 6].some(size => $edit.isWrappedWith('h' + size))
	});
	
	rte.addButton('unordered list', {
		title: 'add unordered list',
		icon: `<img src='${rte.icons}ulist.svg'>`,
		action: () => $edit.unorderedList(),
		state: () => $edit.isWrappedWith('ul')
	});
	
	rte.addButton('ordered list', {
		title: 'add ordered list',
		icon: `<img src='${rte.icons}olist.svg'>`,
		action: () => $edit.orderedList(),
		state: () => $edit.isWrappedWith('ol')
	});
	
	rte.addButton('horizantal rule', {
		title: 'add horizantal rule',
		icon: `<img src='${rte.icons}hr.svg'>`,
		action: () => $edit.hr(),
		state: () => $edit.isWrappedWith('hr')
	})
}