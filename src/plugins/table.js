import $edit from '@simplyjs/dom/edit.js';
import { addInputs, addMenu, addInput } from '../creators.js';
import { create } from '@simplyjs/dom/base.js';

export default (rte, config) => {
	addInputs(rte, 'table', {
		title: 'insert table',
		icon: `<img src='${rte.icons}table.svg'>`,
		inputs: [
			{ type: 'number', min: 1, placeholder: 'rows' },
			{ type: 'number', min: 1, placeholder: 'columns' }
		],
		action: (rows, cols) => {
			rows = Number(rows);
			cols = Number(cols);
			
			//generate table
			var table = create('table');
			for (let ri = 0; ri < rows; ri++) {
				let row = create('tr');
				for (let ci = 0; ci < cols; ci++) row.append(create('td', { innerHTML: '&nbsp;' }));
				table.append(row)
			}
			
			$edit.insert(table, 'node')
		}
	});
	
	addMenu(rte, 'row', {
		title: 'table row actions',
		icon: `<img src='${rte.icons}row.svg'>`,
		'add row before': () => {
			var selected = $edit.getWrapped('tr');
			if (!selected) return;
			
			var newRow = create('tr');
			newRow.append(...Array.from(selected.children).map(() => create('td', { innerHTML: '&nbsp;' })))
			rte.doAction('add row before', () => selected.before(newRow))
		},
		'add row after': () => {
			var selected = $edit.getWrapped('tr');
			if (!selected) return;
			
			var newRow = create('tr');
			newRow.append(...Array.from(selected.children).map(() => create('td', { innerHTML: '&nbsp;' })))
			rte.doAction('add row after', () => selected.after(newRow))
		},
		
		'remove row': () => {
			var selected = $edit.getWrapped('tr');
			if (!selected) return;
			
			rte.doAction('remove row', () => selected.remove())
		},
	});
	
	addMenu(rte, 'column', {
		title: 'table column actions',
		icon: `<img src='${rte.icons}column.svg'>`,
		'add column before': () => {
			var table = $edit.getWrapped('table');
			if (!table) return;
			
			var temp = $edit.getWrapped('td');
			var colInd = [].indexOf.call(temp.parentElement.children, temp);
			
			rte.doAction('add column before', () => {
				Array.from(table.rows).forEach(
					row => row.children[colInd].before(create('td', { innerHTML: '&nbsp;' }))
				)
			})
		},
		'add column after': () => {
			var table = $edit.getWrapped('table');
			if (!table) return;
			
			var temp = $edit.getWrapped('td');
			var colInd = [].indexOf.call(temp.parentElement.children, temp);
			
			rte.doAction('add column before', () => {
				Array.from(table.rows).forEach(
					row => row.children[colInd].after(create('td', { innerHTML: '&nbsp;' }))
				)
			})
		},
		
		'remove column': () => {
			var table = $edit.getWrapped('table');
			if (!table) return;
			
			var temp = $edit.getWrapped('td');
			var colInd = [].indexOf.call(temp.parentElement.children, temp);
			
			rte.doAction('add column before', () => {
				Array.from(table.rows).forEach(
					row => row.children[colInd].remove()
				)
			})
		},
	});
	
	addInput(rte, 'table caption', {
		title: 'add table caption',
		icon: `<img src='${rte.icons}table-caption.svg'>`,
		type: 'textarea',
		placeholder: 'insert text',
		action: (value) => {
			var table = $edit.getWrapped('table');
			if (!table) return;
			table.prepend(create('caption', { innerHTML: value || '&nbsp;' }))
		}
	})
}