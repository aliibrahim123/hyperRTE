//document.execCommand alternative

import { checkel, checkstr, checkarr } from '../../check.js';
import { unwrap, getContainer, splitEl, getWrapped } from './utils.js';
import { clean, cleanDom, cleanMap } from './clean.js';

var $edit = {
	unwrap,
	getContainer, 
	splitEl, 
	getWrapped,
	clean,
	cleanDom,
	cleanMap,
	isWrappedWith (tag, fun) {
		//is selection wrapped with tagname
		return !!getWrapped(tag, fun)
	},
	surround (wrapper, doclean = true, cleanFun, cleanData) {
		//surround selection by element, optinally clean
		checkel(wrapper, 'wrapper');
		
		//get selection
		var selection = getSelection();
		if (!selection.rangeCount) return { success: false };
		var range = selection.getRangeAt(0);
		
		//append selected elements into wrapper
		wrapper.append(...range.cloneContents().childNodes);
		range.deleteContents();
		
		//clean if possible
		if (doclean) clean(wrapper, wrapper.tagName, false, cleanFun, cleanData);
		
		//insert wrapper into selection
		range.insertNode(wrapper);
		
		return { success: true, type: 'surround', node: wrapper }
	},
	undo (tag, fun, cleanData) { 
		//unsurround selection by tagname
		
		//get selection
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		
		//extract nodes
		var nodes = range.cloneContents();
		range.deleteContents();
		
		//append nodes into temp
		var temp = document.createElement('span');
		temp.append(nodes);
		
		//clean
		clean(temp, tag, false, fun, cleanData);
		
		//insert temp into dom
		range.insertNode(temp);
		
		//if selection not wrapped with tagname, insert into dom and return
		var topNode = getWrapped(tag, fun);
		if (!topNode) {
			var start = temp.childNodes[0], end = temp.childNodes[temp.childNodes.length -1];
			unwrap(temp);
			range.setStartBefore(start);
			range.setEndAfter(end);
			return {success: true, type: 'undo'}
		}
		
		//get parents until topNode
		var curNode = temp, pars = [curNode];
		while (curNode !== topNode) {
			curNode = curNode.parentElement;
			pars.unshift(curNode);
		}
		
		//split parents at temp
		var lastClonedNode;
		pars.forEach((el, i) => {
			if (el === topNode) return; //skip topNode
			lastClonedNode = splitEl(el.parentElement, el.nextSibling, lastClonedNode);
		});
		
		//readd text modifiers for temp without the undo one
		//clone parents without topnode
		var lastClonedPar = pars.reduce((par, el, i) => {
			if (i === pars.length -1) return par;//skip last
			var cloned = el.cloneNode(false);
			if (par === topNode) par.after(cloned);
			else par.append(cloned);
			return cloned
		});
		
		//append temp
		if (lastClonedPar === topNode) topNode.after(temp);
		else lastClonedPar.append(temp);
		
		//reselect content
		var start = temp.childNodes[0], end = temp.childNodes[temp.childNodes.length -1];
		unwrap(temp);
		range.setStartBefore(start);
		range.setEndAfter(end);
		
		return {success: true, type: 'undo'}
	},
	replace (topaste = '', type = 'text', unwrap = false) {
		//replace selection
		checkstr(type, 'replace type');
		
		//get selection
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		
		//delete content
		range.deleteContents();
		
		//handle insertion
		if (type === 'node') range.insertNode(topaste);
		else {
			checkstr(topaste, 'topaste');
			let el = document.createElement('span');
			
			if      (type === 'text') el.innerText = topaste;
			else if (type === 'html') el.innerHTML = topaste;
			
			else throw new TypeError('edit: undefined replace type (' + type + ')');
			
			range.insertNode(el);
			if (unwrap) unwrap(el)
		}
		return {success: true, type: 'replace'}
	},
	applyCss (prop, value, tag = 'span', className = 'styled', clean = true, cleanFun) {
		//apply style for selection
		checkstr(prop, 'property');
		checkstr(value, 'value');
		
		//create element
		var el = document.createElement(tag);
		el.classList.add(className);
		el.classList.add(className + '-' + prop);
		el.style[prop] = value;
		
		//surround selection with it
		return this.surround(el, clean, cleanFun, {styled: [prop, className]})
	},
	copy () { 
		//return selected text as string
		var selection = getSelection();
		if (!selection.rangeCount) return '';
		var range = selection.getRangeAt(0);
		
		var temp = document.createElement('div');
		temp.append(range.cloneContents());
		return temp.innerHTML
	},
	cut () { 
		//return selected text as string
		var selection = getSelection();
		if (!selection.rangeCount) return '';
		var range = selection.getRangeAt(0);
		
		var temp = document.createElement('div');
		temp.append(range.extractContents());
		return temp.innerHTML
	},
	delete () {
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		
		range.deleteContents();
		return {success: true, type: 'delete'}
	},
	insert (toinsert, type = 'text', unwrap = false) {
		checkstr(type, 'insert type');
		
		//get selection
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		
		//handle insertion
		if (type === 'node') range.insertNode(toinsert);
		else {
			checkstr(toinsert, 'toinsert');
			var el = document.createElement('span');
			
			if (type === 'text') el.innerText = toinsert;
			else if (type === 'html') el.innerHTML = toinsert;
			
			else throw new Error('edit: undefined insert type (' + type + ')');
			
			range.insertNode(el);
			if (unwrap) unwrap(el)
		}
		return {success: true, type: 'insert'}
	},
	toggle (tag, type = 0, doclean, cleanFun, cleanData) { //toggle surounding of selection with 
		//handle element
		var el;
		if (tag?.nodeType) {//element
			el = tag;
			tag = tag.tagName.toLowerCase();
		} 
		else el = document.createElement(tag); //tagname
		
		//surround/undo
		if (type === 0) { 
			if (this.isWrappedWith(tag)) return this.undo(tag, cleanFun, cleanData);
			else return this.surround(el, doclean, cleanFun, cleanData)
		} 
		
		//forced surround
		else if (type === 1) return this.surround(el, doclean, cleanFun, cleanData);
		
		//forced undo
		else if (type === 2) return this.undo(tag, cleanFun, cleanData)
		
		else throw new Error('edit: toggle type is (' + type + '), expected 0, 1, or 2')
	},
	removeFormat (tagNames = ['b', 'i', 'u', 's', 'sup', 'sub', 'span', 'div']) {
		checkarr(tagNames, 'tagNames');
		//get selection
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		
		//translate into string
		var str = selection.toString();
		
		//replace with text node
		range.deleteContents();
		range.insertNode(new Text(str));
		
		//undo all modifiers
		tagNames.forEach(tag => this.undo(tag));
		
		return {success: true, type: 'remove-format'}
	},
	getSelectedElement () {
		var selection = getSelection();
		if (!selection.rangeCount) return;
		var node = selection.getRangeAt(0).commonAncestorContainer;
		return node.nodeType === 3 ? node.parentNode : node
	},
	selectParagraph () {
		//get selection
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		
		//get node and select it or all
		var topnode = getWrapped('p');
		if (!topnode) return this.selectAll();
		range.selectNode(topnode);
		return {success: true, type: 'select'}
	},
	selectAll () {
		//get selection
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		
		//get container and select it
		var container = this.getContainer()
		range.setStartBefore(container.firstChild);
		range.setEndAfter(container.lastChild);
		return {success: true, type: 'select'}
	},
	
	//common text modifiers
	bold (type) {
		return this.toggle('b', type);
	},
	underline (type) {
		return this.toggle('u', type);
	},
	italic (type) {
		return this.toggle('i', type);
	},
	strikeThrough (type) {
		return this.toggle('s', type);
	},
	subscript (type) {
		return this.toggle('sub', type);
	},
	superscript (type) {
		return this.toggle('sup', type);
	},
	
	//colors 
	backColor (color) {
		return this.applyCss('background-color', color ? color : '')
	},
	fontColor (color) {
		return this.applyCss('color', color ? color : '')
	},
	
	//font
	fontName (name) {
		return this.applyCss('font-family', name ? name : '')
	},
	fontSize (size) {
		return this.applyCss('font-size', size ? size : '')
	},
	
	//embedings
	link (url, undo = false) {
		checkstr(url, 'url')
		var el = document.createElement('a');
		el.href = url;
		if (undo && this.isWrappedWith('a')) return this.undo('a');
		else return this.surround(el)
	},
	img (url) {
		checkstr(url, 'url')
		var el = document.createElement('img');
		el.src = url;
		return this.insert(el, 'node')
	},
	
	//containers
	heading (size=1, type) {
		return this.toggle('h' + size, type)
	},
	orderedList () {
		//surround by <ol><li>...</li><ol>
		var result = this.surround(document.createElement('li'));
		var parent = document.createElement('ol');
		result.node.before(parent);
		parent.append(result.node)
		return result;
	},
	unorderedList () {
		//surround by <ul><li>...</li><ul>
		var result = this.surround(document.createElement('li'));
		var parent = document.createElement('ul');
		result.node.before(parent);
		parent.append(result.node);
		return result;
	},
	block (type) {
		return this.toggle('div', type);
	},
	inline (type) {
		return this.toggle('span', type);
	},
	paragraph () {
		var el = getWrapped('p');
		if (el) {
			unwrap(el);
			return { success: true, type: 'undo' }
		}
		return this.surround(document.createElement('p'));
	},
	quote (type) {
		return this.toggle('q', type);
	},
	
	//other text style
	indent (size) {
		this.selectParagraph();
		return this.applyCss('text-indent', size ? size : '', 'div')
	},
	align (type) {
		this.selectParagraph();
		return this.applyCss('text-align', type ? type : '', 'div')
	},
	direction (type) {
		return this.applyCss('direction', type ? type : '', 'div')
	},
	
	//others
	hr () {
		return this.insert(document.createElement('hr'), 'node')
	},
}

export default $edit