function getSelection (): [Selection, Range] {
	let selection = window.getSelection();
	return selection?.rangeCount === 1 ? [selection, selection.getRangeAt(0)] : [] as any;
}

export function getContainer () {
	let [selection, range] = getSelection();
	if (!selection) return;
	let curEl = range.commonAncestorContainer;
	while (!(curEl instanceof Element && curEl.hasAttribute('contenteditable'))) {
		if (curEl === document.body) return;
		curEl = curEl.parentElement!;
	}
	return curEl
}

function isTextNode (node: Node): node is Text {
	return node.nodeType === Node.TEXT_NODE
}

function wrap (el: HTMLElement, node: Node) {
	node.parentElement!.insertBefore(el, node);
	el.append(node);
	return el
}
function split (el: HTMLElement, at: Node) {
	let cloned = el.cloneNode(false);
	while(at.nextSibling) cloned.appendChild(at.nextSibling);
	el.after(cloned);
	return el
} 

function matchParent (match: string | ((el: HTMLElement) => boolean)) {
	let [selection, range] = getSelection();
	if (!selection) return;

	let container = getContainer()!;
	let curEl = range.commonAncestorContainer;
	while (curEl !== container) {
		if (curEl instanceof HTMLElement) {
			if (typeof(match) === 'string' ? curEl.tagName === match.toUpperCase() : match(curEl))
				return curEl
		}
		curEl = curEl.parentElement!;
	}
	return 
}
export function isInside (match: string | ((el: HTMLElement) => boolean)) {
	return !!matchParent(match)
} 

function splitBoundry (range: Range) {
	let { startContainer, startOffset, endContainer, endOffset } = range;

	function splitSpan (node: Node) {
		let parent = node.parentElement!;
		if (parent.tagName === 'SPAN') split(parent, node);
	}

	if (isTextNode(startContainer)) {
		let newStart = startContainer.splitText(startOffset);
		splitSpan(startContainer)
		range.setStart(newStart, 0);
	}
	if (isTextNode(endContainer)) {
		endContainer.splitText(endOffset);
		splitSpan(endContainer);
	} 
}

export function style(styler: (el: HTMLElement) => void) {
	let [selection, range] = getSelection();
	if (!selection) return;
	
	splitBoundry(range);

	let walker = document.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_TEXT, 
		(node) => range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
	);
	walker.nextNode();

	let curNode = walker.currentNode, nodes: Node[] = [];
	while (curNode) {
		nodes.push(curNode);
		curNode = walker.nextNode()!;
	}

	for (let node of nodes) {
		let el = node.parentElement!;
		if (el.tagName !== 'SPAN') 
			el = wrap(document.createElement('span'), node);

		styler(el);
	}
}

export function surround (wrapper: Element | string, force = false) {
	let [selection, range] = getSelection();
	if (!selection) return;

	if (typeof wrapper === 'string') wrapper = document.createElement(wrapper);

	if (!force && isInside(wrapper.tagName)) return;

	range.surroundContents(wrapper);
}

export function unwrap (el: string | ((el: HTMLElement) => boolean)) {
	let [selection, range] = getSelection();
	if (!selection) return;

	let parent = matchParent(el);
	if (!parent) return;

	throw new Error('this is hard, for now');
}