//clean
//clean class: an element class specifing a custom clean handler
//clean handler: custom functon to handle specific cleaning

import { unwrap } from './utils.js';
import { checkarr, checkfn, checkstr, checkel, checknode } from '../../check.js';

export var clean = (el, tag, includeParent = true, fun, data = {}) => { 
	//unwrap elements with tagname
	
	checkel(el, 'element');
	checkstr(tag, 'tag');
	if (fun) checkfn(fun, 'cleaner');
	
	//get elements
	tag = tag.toLowerCase();
	var els = [...el.getElementsByTagName(tag)];
	if (includeParent && el.tagName === tag.toUpperCase()) els.push(el);
	
	//filter them based on their class and clean function
	els = els.filter(el => Array.from(el.classList)
		.every(cls => cls in cleanMap ? cleanMap[cls](el, data[cls]) : true)
	);
	if (fun) els = els.filter(fun);
	
	//unwrap 
	els.forEach(el => unwrap(el))
};

export var cleanDom = (node, doNotCleanTags = [], doNotMergeTags = [], skipTags = [], tagset = new Set()) => {
	checknode(node, 'node');
	checkarr(doNotCleanTags, 'doNotCleanTags');
	
	//case element
	if (node.nodeType === node.ELEMENT_NODE) {
		var children = Array.from(node.childNodes),
		tag = node.tagName.toLowerCase();
		
		//skip element if possible
		if (skipTags.includes(tag)) return;
		else if (doNotCleanTags.includes(tag)) {}
		
		//if empty, remove
		else if (node.childNodes.length === 0) node.remove();

		//do not merge tags are cleaned only if they are empty, not merged with sibling or parent
		else if (doNotMergeTags.includes(tag)) {}
		
		//if it and previous sibling share same tag, merge
		else if (node.tagName === node.previousSibling?.tagName) { 
			node.previousSibling.append(...children);
			node.remove()
		}
		
		//if tagname is like one of parents and is cleanable, remove
		else if (tagset.has(tag) && !(Array.from(node.classList).some(item => item in cleanMap))) {
			node.after(...children);
			node.remove()
		}
		
		//loop through children
		children.forEach(child => cleanDom(child, doNotCleanTags, doNotMergeTags, skipTags, new Set([...tagset, tag])))
	} 
	
	//case text node
	else if (node.nodeType === 3) {
		//if empty, remove
		if (node.textContent === '') node.remove();
		
		//if its previous sibling is text node, merge
		else if (node.previousSibling?.nodeType === node.TEXT_NODE) { 
			node.previousSibling.textContent += node.textContent;
			node.remove()
		}
	}
};

//custom clean by class
export var cleanMap = {
	styled (el, data) { //handle styling cleaning
		//if called without css method, do not clean
		if (!data) return false; 
		
		var [prop, className] = data;
		
		//if it is styled with property, remove
		if (el.classList.contains(className + '-' + prop)) {
			el.classList.remove(className + '-' + prop);
			el.style[prop] = ''
		}
		
		//if have no more styles, clean
		if ([...el.classList].reduce((n, cls) => cls.startsWith(className) ? n+1 : n, 0) === 1) return true
		
		return false
	}
};