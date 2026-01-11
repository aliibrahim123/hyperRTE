import { checkarr } from '../check.js';
import { createDropDown } from '../creators.js';
import { create, construct, query } from '../utils/dom.js';

var find = (el, str, blockTags, skipTags, handler) => {
	if (el.childNodes.length === 0) return;
	var curNode = el, hasBeenVisited;
	while (true) {
		//if it is element
		if (curNode.nodeType === 1) {
			//if has been visited, just escape
			if (hasBeenVisited) hasBeenVisited = false;
			
			//if it has children and not skipable, jump to first child, else escape
			else if (!skipTags.includes(curNode.tagName.toLowerCase()) && curNode.childNodes.length) {
				curNode = curNode.childNodes[0];
				continue
			}
		}
		
		//case text node
		else if (curNode.nodeType === 3) {
			var text = curNode.textContent;
			for (let i = 0; i < text.length; i++) {
				if (text[i] !== str[0]) continue;
				//finded first character, maybe a complete search
				var maybeNewIndex = onFirstHit(curNode, i, str, el, blockTags, skipTags, handler);
				
				//if a complete search, update with new index
				if (maybeNewIndex) {
					curNode = maybeNewIndex;
					break
				}
			}
		}
		
		//escape
		//if has next sibling, jump to it
		if (curNode.nextSibling) curNode = curNode.nextSibling;
		
		//else jump to parent
		else {
			curNode = curNode.parentNode;
			if (curNode === el) break; //case top element, break all
			hasBeenVisited = true
		}
	}
}

var onFirstHit = (node, startInd, str, topNode, blockTags, skipTags, handler) => {
	if (str.length === 1) return afterFullSearch([node], startInd, startInd, handler);
	var curNode = node, ind = 1, parts = [], hasBeenVisited, isFirst = true;
	while (true) {
		//case element
		if (curNode.nodeType === 1) {
			//if it is topNode or blocking or skipable, no result
			if (
				curNode === topNode || 
				blockTags.includes(curNode.tagName.toLowerCase()) || 
				skipTags.includes(curNode.tagName.toLowerCase())
			) return;
			
			if (hasBeenVisited) hasBeenVisited = false;
			
			//if has children, go to first
			else if (curNode.childNodes.length) {
				curNode = curNode.childNodes[0];
				continue
			}
		}
		
		//case text node
		else if (curNode.nodeType === 3) {
			parts.push(curNode);
			let text = curNode.textContent;
			
			//loop through text
			for (let i = isFirst ? startInd + 1 : 0; i < text.length; i++) {
				//if not same, no result
				if (text[i] !== str[ind]) return;
				ind++;
				if (ind === str.length) return afterFullSearch(parts, startInd, i, handler)
			}
			
			isFirst = false;
		}
		
		//escape
		//if has next sibling, jump to it
		if (curNode.nextSibling) curNode = curNode.nextSibling;
		
		//else jump to parent
		else {
			curNode = curNode.parentNode;
			hasBeenVisited = true
		}
	}
}

var afterFullSearch = (parts, start, end, handler) => {
	//split result from textnodes
	//if single textnode, slice it
	if (parts.length === 1) {
		var textNode = parts[0], text = textNode.textContent;
		textNode.before(text.slice(0, start));
		textNode.after(text.slice(end +1));
		textNode.textContent = text.slice(start, end+1)
	} 
	
	//else slice from first and last
	else {
		var startNode = parts[0], startText = startNode.textContent;
		startNode.before(startText.slice(0, start));
		startNode.textContent = startText.slice(start);
		
		var endNode = parts[parts.length -1], endText = endNode.textContent;
		endNode.after(endText.slice(end +1));
		endNode.textContent = endText.slice(0, end +1);
	}
	
	//call handler
	handler(parts);
	return parts[parts.length -1]
}

export default (rte, config) => {
	var { blockTags, skipTags } = {
		blockTags: [
			'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'table', 'tbody', 'thead', 'th', 'tr', 'td', 'caption', 'col', 
			'tfoot', 'colgroup', 'li', 'ol', 'ul', 'q', 'div'
		],
		skipTags: [
			'br', 'hr', 'script', 'style', 'img', 'video', 'audio', 'canvas', 'svg', 'map', 'object', 'input', 'textarea',
			'select', 'option', 'optgroup', 'button'
		],
		...config.find
	}
	
	globalThis.a = (s, h) => find(rte.contentEl, s, blockTags, skipTags, h);
	rte.addButton('find', {
		title: 'find specified text',
		creator: (el) => {
			var [dropDown, open, close] = createDropDown();
			
			dropDown.append(...construct(`
				<input id=findinp placeholder='to find'>
				<br>
				<input id=findreplace placeholder='to replace'>
				<br>
				<button id=findbut class=hrte-button2>find</button>
				<button id=findreplacebut class=hrte-button2>replace</button>
				<button id=findnext class=hrte-button2>next</button>
				<button id=findclear class=hrte-button2>clear</button>
			`));
			
			var fInp = query('#findinp', dropDown)[0];
			var rInp = query('#findreplace', dropDown)[0];
			
			var selectedInd = 0;
			var resultCount = 0;
			
			var clear = () => {
				selectedInd = 0;
				resultCount = 0;
				query('.finded', rte.contentEl).forEach(node => {
					node.after(...node.childNodes);
					node.remove()
				});
			}
			//find button
			query('#findbut', dropDown)[0].addEventListener('click', () => {
				clear();
				find(rte.contentEl, fInp.value, blockTags, skipTags, (parts) => {
					resultCount++;
					parts.forEach(node => {
						var el = create('mark', { classList: 'finded finded-' + resultCount });
						node.before(el);
						el.append(node)
					})
				})
			});
			
			//replace button
			query('#findreplacebut', dropDown)[0].addEventListener('click', () => {
				clear();
				find(rte.contentEl, fInp.value, blockTags, skipTags, (parts) => {
					parts.forEach((node, i) => node.textContent = i === 0 ? rInp.value : '')
				})
			});
			
			//clear button
			query('#findclear', dropDown)[0].addEventListener('click', clear);
			
			//find next button
			query('#findnext', dropDown)[0].addEventListener('click', () => {
				if (resultCount === 0) return;
				//calculate index
				selectedInd++;
				if (selectedInd === resultCount +1) selectedInd = 1;
				
				//select it
				var finded = query('.finded-' + selectedInd, rte.contentEl);
				var range = getSelection().getRangeAt(0);
				range.setStartBefore(finded[0]);
				range.setEndAfter(finded[finded.length -1]);
			});
			
			el.addEventListener('click', (e) => {
				e.stopPropagation();
				open()
			});
			
			rte.toolbarEl.append(dropDown);
			el.append(construct(`<img src='${rte.icons}find.svg'>`))
		}
	})
}