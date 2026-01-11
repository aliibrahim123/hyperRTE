import $edit from '../utils/edit/index.js';

export default (rte, config) => {
	rte.addButton('clean', {
		title: 'clean the dom',
		icon: `<img src='${rte.icons}clean.svg'>`,
		action: () => rte.clean()
	});
	
	rte.addButton('remove format', {
		title: 'remove format',
		icon: `<img src='${rte.icons}remove-format.svg'>`,
		action: () => $edit.removeFormat()
	});
	
	rte.addButton('select paragraph', {
		title: 'select paragraph',
		icon: `<img src='${rte.icons}select-paragraph.svg'>`,
		action: () => $edit.selectParagraph()
	});
	
	rte.addButton('select all', {
		title: 'select all',
		icon: `<img src='${rte.icons}select-all.svg'>`,
		action: () => $edit.selectAll()
	});
}