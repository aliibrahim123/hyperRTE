//ui handlers

import { construct } from './utils/dom.js';
import $el from './utils/dom.js';

export var constructMainUI = (rte, el) => {
	var mainEl = rte.mainEl = $el(el)[0];
	if (!mainEl) throw new Error(`HyperRTE: no element with selector (${el})`);
	
	mainEl.classList.add('hrte');
	
	var toolbarEl = rte.toolbarEl = construct('<div class="hrte-toolbar">')
	mainEl.append(toolbarEl);
	
	var contentEl = rte.contentEl = construct('<div class="hrte-content">');
	mainEl.append(contentEl);
	contentEl.contentEditable = true;
	
	contentEl.addEventListener('keyup',   ()  => rte.trigger('stateChange'));
	contentEl.addEventListener('mouseup', ()  => rte.trigger('stateChange'));
	contentEl.addEventListener('input',   (e) => rte.trigger('input', e));
	contentEl.addEventListener('cut',    (e) => rte.trigger('cut', e));
	contentEl.addEventListener('copy',    (e) => rte.trigger('copy', e));
	contentEl.addEventListener('paste',   (e) => rte.trigger('paste', e));
}

export var constructToolbar = (rte, toolbar) => {
	var { buttons, toolbarEl } = rte;
	toolbar.forEach(button => {
		//case separator
		if (button === 'separator') return toolbarEl.append(construct(`<span class='hrte-button-separator'>&nbsp;</span>`));
			
		//get button definition
		var definition = buttons[button];
		if (!definition) throw new TypeError(`HyperRTE: undefined button (${button})`);
		var { title, creator, state, action } = definition;
			
		//construct element
		var el = construct(`<button class='hrte-button' title='${title || ''}'>`);
		creator(el, rte);
	
		if(action) el.addEventListener('click', (e) => {
			rte.contentEl.focus();
			rte.doAction(button, action)
		});
		if (state) rte.on('stateChange', 
			() => state(rte, el) ? 
				el.classList.add('hrte-button-selected') :
				el.classList.remove('hrte-button-selected')
		);
			
		toolbarEl.append(el)
	});
}