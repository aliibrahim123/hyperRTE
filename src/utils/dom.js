import { checkstr, checknode, checkarr } from '../check.js';

var checkEls = (els) => {
	els.forEach((el, i) => {
		if (!(el instanceof Node)) throw new TypeError(`hyperRTE: element at index (${i}) of type (${el?.constructor?.name}), expected (Element)`)
	});
	return els
}

var firstIsLowerReg = /[a-z]/;

var $el = (a, b = document, c) => {
	//case string
	if (typeof a === 'string') {
		//if the first letter is lower, create element using create
		if (a[0]?.match(firstIsLowerReg)) return [create(a, b instanceof Node ? [] : b, c)];
		
		//if first letter is <, construct element from html string
		if (a[0] === '<') {
			let temp = document.createElement('div');
			temp.innerHTML = a;
			return Array.from(temp.children);
		}
		
		//else it is query
		checknode(b, 'root');
		return Array.from(b.querySelectorAll(a))
	}
	
	if (a instanceof Element) return [a];
	
	if (Array.isArray(a)) return checkEls(a);
	
	//case array like, cast to array
	if (a?.length !== undefined) return checkEls(Array.from(a));
	
	throw new TypeError(`hyperRTE: a of type (${a?.constructor?.name}), expected (String) or (Element) or (ArrayLike)}`)
}

export var create = (tag, props = {}, children = []) => {
	checkstr(tag, 'tag');
	checkarr(children, 'children')
	
	//create element
	var el = document.createElement(tag);
	
	//add properties
	for (let prop in props) {
		let value = props[prop];
		
		if      (prop === 'text') el.innerText = value;
		else if (prop === 'classList') el.classList = Array.isArray(value) ? value.join(' ') : value;
		else if (prop === 'style') Object.assign(el.style, value);
		else if (prop === 'attr') {
			for (let attr in value) el.setAttribute(attr, value[attr]);
		}
		else if (prop === 'events') {
			for (let type in value) el.addEventListener(type, value[type]);
		}
		else el[prop] = value
	}
	
	//append children
	el.append(...children);
	
	return el
}

export var query = (query, root = document) => {
	checkstr(query, 'query');
	checknode(root, 'root');
	return Array.from(root.querySelectorAll(query))
}

export var construct = (str, asArray = false) => {
	checkstr(str, 'string');
	var temp = document.createElement('div');
	temp.innerHTML = str;
	return (!asArray && temp.children.length === 1) ? temp.children[0] : Array.from(temp.children);
}

export default $el