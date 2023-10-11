export var cleanStyles = (el) => {
	//if element is styled and has 1 children, start merging
	merge: if (el.children.length === 1 && el.classList.contains('styled')) {
		var curNode = el.children[0], lastNode = el;
		var styles = {};
		
		handleStyles(el, styles)
		
		//loop downward where element is styled and same tag and are lonely siblings
		while (
			lastNode.children.length === 1 && lastNode.childNodes.length === 1 && 
			curNode.tagName === lastNode.tagName && curNode.classList.contains('styled')
		) {
			lastNode = curNode;
			curNode = curNode.children[0];
			handleStyles(lastNode, styles)
		}
		
		//sometimes, a false merge would happend where top element and lowest element are same
		if (lastNode === el) break merge;
		
		//apply styles to lowest element
		Object.keys(styles).forEach(prop => {
			lastNode.classList.add('styled-' + prop);
			lastNode.style[prop] = styles[prop]
		});
		
		//replace top element with lowest element
		el.after(lastNode);
		el.remove();
		el = lastNode
	}
	
	//loop through children
	Array.from(el.children).forEach(el => cleanStyles(el))
}

//get styles applied to an element and add them to styles object
var handleStyles = (el, styles) => 
	Array.from(el.classList)
	.filter(cls => cls.startsWith('styled-'))
	.map(cls => {
		var prop = cls.slice('styled-'.length);
		styles[prop] = el.style[prop]
});