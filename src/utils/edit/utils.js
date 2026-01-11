//edit utilities

import { checkel, checkstr, checkfn, checknode } from '../../check.js';

export var unwrap = (el) => {
	checkel(el, 'element');
	el.after(...el.childNodes);
	el.remove()
};

export var getContainer = () => { //get nearest parent with contenteditable in selection
	//get selection
	var selection = getSelection();
	if (!selection.rangeCount) return;
	var range = selection.getRangeAt(0);
	
	//walk upward until hit parent with contenteditable
	var curNode = range.startContainer;
	if (curNode.nodeType !== curNode.ELEMENT_NODE) curNode = curNode.parentElement;
	while (!curNode.hasAttribute('contenteditable')) {
		if (curNode === document.body) return;
		curNode = curNode.parentElement
	}
	
	return curNode
};

export var splitEl = (el, offsetEl, offsetPar) => {
	checkel(el, 'element');
	if (offsetEl) checknode(offsetEl, 'offset element');
	if (offsetPar) checkel(offsetPar, 'offset parent');
	
	//split element at offset (include it in the clone
	var cloneEl = el.cloneNode(false);
	var children = Array.from(el.childNodes), doclone = false;
	for (let i = 0; i < children.length; i++) {
		let child = children[i];
		if (doclone || child === offsetEl) {
			doclone = true;
			cloneEl.append(child)
		}
	}
	
	//prepend clone to offsetPar or after element
	offsetPar ? offsetPar.prepend(cloneEl) : el.after(cloneEl);
	
	return cloneEl
};

export var getWrapped = (tag, fun) => {
	//get nearest parent having tagname in selection
	checkstr(tag, 'tag');
	if (fun) checkfn(fun, 'function');
	
	//get selection and container
	var selection = getSelection();
	if (!selection.rangeCount) return;
	var range = selection.getRangeAt(0);
	var container = getContainer();
	if (!container) return;
	
	//walk upward until hit parent of tagname
	var curNode = range.commonAncestorContainer;
	while (curNode !== container) {
		if (curNode.tagName === tag.toUpperCase() && (fun ? fun(curNode) : true)) return curNode;
		curNode = curNode.parentElement
	}
	return
};