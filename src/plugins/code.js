import $edit from '@simplyjs/dom/edit.js';
import { addInput, addPanel } from '../creators.js';
import { checkfn } from '../check.js';
import { construct, create, query } from '@simplyjs/dom/base.js';

export default (rte, config) => {
	var sanitizer = config.sanitizer;
	if (sanitizer === undefined) sanitizer = v => {
		var temp = create('span');
		temp.innerHTML = v;
		return temp
	};
	else if (sanitizer === true) sanitizer = v => {
		var temp = create('span');
		temp.setHTML(v);
		return temp
	}
	
	checkfn(sanitizer, 'sanitizer');
	rte.sanitizer = sanitizer;
	
	addInput(rte, 'insert html', {
		title: 'insert html',
		icon: `<img src='${rte.icons}insert-html.svg'>`,
		type: 'textarea',
		placeholder: 'insert html string',
		action: (value) => $edit.insert(sanitizer(value), 'node')
	});
	
	addPanel(rte, 'source', {
		title: 'edit source',
		icon: `<img src='${rte.icons}source.svg'>`,
		creator: (rte, back) => {
			var panel = construct(`<div>
				<div class='hrte-panel-header'>source</div>
				<div id=source contenteditable class='hrte-content'></div>
				<button id=source-save class="hrte-button2">save</button>
				<button id=source-close class="hrte-button2">close</button>
			`);
			
			var inp = query('#source', panel)[0];
			
			query('#source-save', panel)[0].addEventListener('click', () => {
				rte.doAction('source', 
					() => rte.contentEl.replaceChildren(...sanitizer(inp.innerText).childNodes),
				true);
				back()
			});
			
			query('#source-close', panel)[0].addEventListener('click', () => back());
			
			var onopen = () => {
				inp.innerText = rte.content
			}
			
			return [panel, onopen]
		}
	})
}