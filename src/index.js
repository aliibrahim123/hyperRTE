import { checkel, checkstr, checkarr, checkfn } from './check.js';
import { construct, query } from '@simplyjs/dom/base.js';
import { EventEmmiter } from '@simplyjs/com/structure/events.js';
import { constructMainUI, constructToolbar } from './ui.js';
import './calcStyles.js';
import { cleanStyles } from './clean.js';

export * from './creators.js';

export default class HyperRTE {
	buttons = {};
	events = new EventEmmiter();
	
	constructor (config) {
		//handle config
		var { el, plugins, toolbar, icons, clean } = {
			el: null,
			plugins: [],
			toolbar: [],
			icons: './icons/',
			clean: {
				cleanAfterAction: true,
				doNotMergeTags: ['div', 'span', 'p', 'li', 'ul', 'ol', 'a', 'mark'],
				doNotCleanTags: ['hr', 'br', 'img', 'video', 'iframe', 'td', 'tr', 'table', 'caption'],
				skipTags: ['svg', 'math'],
			},
			...config
		};
		
		var { cleanAfterAction, doNotCleanTags, doNotMergeTags, skipTags } = clean;
		
		this.cleanAfterAction = cleanAfterAction;
		checkstr(icons, 'icons path');
		this.icons = icons;
		checkarr(doNotCleanTags, 'doNotCleanTags');
		this.doNotCleanTags = doNotCleanTags;
		checkarr(doNotMergeTags, 'doNotMergeTags');
		this.doNotMergeTags = doNotMergeTags;
		checkarr(skipTags, 'skipTags');
		this.skipTags = skipTags;
		
		//add events
		[
			'stateChange', 'beforeAction', 'afterAction', 'input', 'cut', 'copy', 'paste', 'export',
			'showMain', 'hideMain'
		].forEach(event => this.events.add(event));
		
		//construct main ui
		constructMainUI(this, el);
		
		//run plugins
		checkarr(plugins, 'plugins');
		plugins.forEach(plugin => {
			checkfn(plugin, 'plugin');
			plugin(this, config)
		});
		
		//construct toolbar
		checkarr(toolbar, 'toolbar');
		//if toolbar is empty, use all buttons in the order of insertion
		if (toolbar.length === 0) toolbar = Object.keys(this.buttons);
		constructToolbar(this, toolbar)
	}
	
	on (event, fn) {
		this.events.on(event, fn)
	}
	off (event, fn) {
		this.events.off(event, fn)
	}
	once (event, fn) {
		this.events.once(event, fn)
	}
	trigger (event, ...args) {
		this.events.trigger(event, this, ...args)
	}
	
	doAction (name, handler, force = false) {
		checkstr(name, 'action name');
		checkfn(handler, 'handler');
		
		if (!force && !this.contentEl.contains(document.activeElement)) return;
		
		this.trigger('beforeAction', name);
		handler(this);
		if (this.cleanAfterAction) this.clean();
		this.trigger('afterAction', name);
		this.contentEl.focus();
		
		this.trigger('stateChange')
	}
	
	get content () {
		return this.contentEl.innerHTML
	}
	set content (content) {
		this.contentEl.innerHTML = content
	}
	
	clean () {
		if (this.contentEl.childNodes.length === 0) return;
		$edit.cleanDom(this.contentEl, this.doNotCleanTags, this.doNotMergeTags, this.skipTags);
		cleanStyles(this.contentEl)
	}
	focus () {
		this.contentEl.focus();
	}
	
	export () {
		var el = this.contentEl.cloneNode(true);
		this.trigger('export', el);
		return el.innerHTML
	}
	
	captureSelection () {
		var selection = getSelection();
		if (!selection.rangeCount) return () => {};
		
		var selected = selection.getRangeAt(0).cloneRange();
		return () => {
			selection.removeAllRanges();
			selection.addRange(selected)
		}
	}
	
	addButton (name, definition) {
		checkstr(name, 'button name');
		if (!definition) throw new TypeError(`HyperRTE: definition of type (${definition}), expected (Object)`);
		
		var { title, icon, creator, state, action } = definition;
		
		checkstr(title, 'title');
		if (icon) {
			checkstr(icon, 'icon');
			creator = (el) => el.append(construct(icon))
		}
		checkfn(creator, 'creator');
		if (state) checkfn(state, 'state');
		if (action) checkfn(action, 'action');
		
		this.buttons[name] = { title, creator, state, action }
	}
}