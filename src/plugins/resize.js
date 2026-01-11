import { query, construct } from '../utils/dom.js';

var checked = Symbol('checked');

var handleResize = (e) => {
	var el = e.target;
	
	//in some edge cases, when resizing then click on the element, a new container would be added above the container
	if (el.parentElement.classList.contains('resizable-container')) return;
	
	//wrap element with a resizable container
	var container = construct("<div class='resizable-container'>");
	el.after(container);
	container.append(el);
	
	//if element have specified dimensions, add them
	if (el.style.width) container.style.width = el.style.width;
	if (el.style.height) container.style.height = el.style.height;
	
	//make element fit container
	el.style.width = '100%';
	el.style.height = '100%';
	
	//used when clicked outside container to close it
	var listner = (e) => {
		if (container === e.target) return;
		
		//apply dimensions to element
		el.style.width = container.style.width;
		el.style.height = container.style.height;
		
		//remove container
		container.after(el);
		container.remove();
		document.body.removeEventListener('click', listner)
	}
	
	//defer since without it, it start after this function
	setTimeout(() => document.body.addEventListener('click', listner), 1)
}

var attach = (el) => query('.resizable', el).forEach(el => {
	if (el[checked]) return;
	el.addEventListener('click', handleResize);
	el[checked] = true
})

export default (rte, config) => {
	//attach after each action
	rte.on('afterAction', rte => attach(rte.contentEl));
	
	//clean when export
	rte.on('export', 
		(rte, el) => query('.resizable', el).forEach(el => el.classList.remove('resizable'))
	);
}