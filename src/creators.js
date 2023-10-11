import { checkarr, checkstr, checkfn } from './check.js';
import { construct, create } from '@simplyjs/dom/base.js';
import $el from '@simplyjs/dom/base.js';

export var createDropDown = (autoclose = true) => {
	var dropDown = construct("<span class='hrte-dropDown'>");
	//if clicked outside dropDown, close it
	var clickListner = (e) => {
		if (autoclose && !dropDown.contains(e.target)) close()
	}
	
	var open = () => {
		dropDown.classList.add('hrte-dropDown-open');
		document.body.addEventListener('click', clickListner);
	}
	var close = () => {
		document.body.removeEventListener('click', clickListner);
		dropDown.classList.remove('hrte-dropDown-open')
	}
		
	return [dropDown, open, close]
}

export var createDialog = (autoclose = true) => {
	var dialog = construct("<span class='hrte-dialog'>");
	//if clicked outside dropDown, close it
	var clickListner = (e) => {
		if (autoclose && !dialog.contains(e.target)) close()
	}
	
	var open = () => {
		dialog.classList.add('hrte-dialog-open');
		document.body.addEventListener('click', clickListner);
	}
	var close = () => {
		document.body.removeEventListener('click', clickListner);
		dialog.classList.remove('hrte-dialog-open')
	}
		
	return [dialog, open, close]
}

export var addList = (rte, name, definition) => {
	var { title, icon, data, item, action, state } = definition;
	checkarr(data, 'data');
	checkstr(icon, 'icon');
	checkfn(item, 'item transformer');
	checkfn(action, 'action');
	
	rte.addButton(name, {
		title, state,
		creator: (el) => {
			var [dropDown, open, close] = createDropDown();
			data.forEach((value, ind) => {
				if (ind !== 0) dropDown.append(construct(`<div class='hrte-list-separator'>`));
				var el = construct(`<div class='hrte-list-item'>`);
				el.append(item(value));
				el.addEventListener('click', () => {
					close();
					reselect();
					rte.doAction(name, () => action(value, rte))
				});
				dropDown.append(el)
			});
			var reselect;
		
			el.addEventListener('click', (e) => {
				e.stopPropagation();
				reselect = rte.captureSelection();
				open()
			});
		
			rte.toolbarEl.append(dropDown);
			
			el.append(construct(icon))
		}
	})
}

export var addInput = (rte, name, definition) => {
	var { title, icon, action, state, type, reset, ...props } = definition;
	checkstr(icon, 'icon');
	checkstr(icon, 'type');
	checkfn(action, 'action');
	
	rte.addButton(name, {
		title, state,
		creator: (el) => {
			var [dropDown, open, close] = createDropDown();
			var reselect;
			
			el.addEventListener('click', (e) => {
				e.stopPropagation();
				reselect = rte.captureSelection();
				open()
			});
			
			var inp = construct(type === 'textarea' ? '<textarea>' : '<input>');
			if (type !== 'textarea') inp.type = type;
			Object.assign(inp, props);
			
			var applyButton = construct('<span class="hrte-button2">apply</span>');
			applyButton.addEventListener('click', () => {
				close();
				reselect();
				rte.doAction(name, () => action(inp.value, rte))
			});
			
			if (reset) {
				var resetButton = construct('<span class="hrte-button2">remove</span>');
				resetButton.addEventListener('click', () => {
					close();
					reselect();
					rte.doAction(name, () => action('initial', rte))
				});
			} else var resetButton = ''; //transform into empty text node
			
			dropDown.append(inp, create('div', {}, [applyButton, resetButton]));
			rte.toolbarEl.append(dropDown);
			el.append(construct(icon))
		}
	})
}

export var addNumber = (rte, name, definition) => addInput(rte, name, {type: 'number', ...definition})
export var addColor = (rte, name, definition) => addInput(rte, name, {type: 'color', reset: true, ...definition})

export var addInputs = (rte, name, definition) => {
	var { title, icon, action, state, inputs } = definition;
	checkarr(inputs, 'inputs');
	checkfn(action, 'action');
	
	rte.addButton(name, {
		title, state,
		creator: (el) => {
			var [dropDown, open, close] = createDropDown();
			var reselect;
			
			el.addEventListener('click', (e) => {
				e.stopPropagation();
				reselect = rte.captureSelection();
				open()
			});
			
			var inps = inputs.map(inp => {
				var el = create('input');
				Object.assign(el, inp);
				return el
			});
			
			var applyButton = construct('<span class="hrte-button2">apply</span>');
			applyButton.addEventListener('click', () => {
				close();
				reselect();
				rte.doAction(name, () => action(...inps.map(inp => inp.value), rte))
			});
			
			dropDown.append(...inps, create('div', {}, [applyButton]));
			rte.toolbarEl.append(dropDown);
			el.append(construct(icon))
		}
	})
}

export var addPanel = (rte, name, definition) => {
	var { title, icon, creator } = definition;
	checkfn(creator, 'creator');
	
	var back = () => {
		panel.style.display = 'none';
		rte.toolbarEl.style.display = '';
		rte.contentEl.style.display = '';
		rte.trigger('showMain')
	}
	
	var [panel, onopen] = creator(rte, back);
	panel.classList.add('hrte-panel');
	panel.style.display = 'none';
	rte.mainEl.append(panel);
	
	rte.addButton(name, { 
		title, 
		creator: (el) => {
			el.append(construct(icon))
			el.addEventListener('click', () => {
				panel.style.display = '';
				rte.toolbarEl.style.display = 'none';
				rte.contentEl.style.display = 'none';
				rte.trigger('hideMain');
				onopen(rte)
			})
		}
	})
}

export var createMenu = (rte, items) => {
	var [menu, dOpen, close] = createDropDown();
	var reselect, isFirst = true;
	
	for (let item in items) {
		checkfn(items[item], 'menu item (' + item + ')');
		
		let el = construct(`<div class='hrte-list-item'>${item}`);
		el.addEventListener('click', () => {
			reselect();
			items[item](rte);
			close()
		});
		
		if (!isFirst) menu.append(construct(`<div class='hrte-list-separator'>`));
		menu.append(el);
		
		isFirst = false;
	}
	
	var open = () => {
		reselect = rte.captureSelection();
		dOpen();
	}
	
	return [menu, open, close]
}

export var addMenu = (rte, name, definition) => {
	var { title, state, icon, ...items } = definition;
	checkstr(icon, 'icon');
	
	rte.addButton(name, {
		title, state,
		creator: (el) => {
			var [menu, open] = createMenu(rte, items);
			
			el.addEventListener('click', (e) => {
				e.stopPropagation();
				open()
			});
			
			rte.toolbarEl.append(menu);
			el.append(construct(icon))
		}
	})
}