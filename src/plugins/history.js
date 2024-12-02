import $edit from '../utils/edit/index.js';
import { checkpInt, checkarr } from '../check.js';

export class History {
	constructor (rte, stackSize) {
		this.rte = rte;
		checkpInt(stackSize, 'history size');
		this.stackSize = stackSize;
		this.stack = [''];
		this.index = 0;
	}
	get canUndo () {
		return this.index !== 0
	}
	get canRedo () {
		return this.index !== this.stack.length -1
	}
	push () {
		this.stack = this.stack.slice(0, this.index + 1);
		this.stack.push(this.rte.content);
		if (this.stack.length > this.stackSize) this.stack.shift();
		this.index = this.stack.length -1
	}
	undo () {
		if (!this.canUndo) return;
		this.index--;
		this.rte.content = this.stack[this.index]
	}
	redo () {
		if (!this.canRedo) return;
		this.index++;
		this.rte.content = this.stack[this.index]
	}
}

export default (rte, config) => {
	var { size: stackSize, skipActions } = {
		size: 20,
		skipActions: ['undo', 'redo', 'copy', 'clean', 'select paragraph', 'select all', 'info'],
		...config.history
	}
	rte.history = new History(rte, stackSize);
	checkarr(skipActions, 'skip actions');
	
	rte.addButton('undo', {
		title: 'undo action',
		icon: `<img src='${rte.icons}undo.svg'>`,
		state: (rte) => rte.history.canUndo,
		action: (rte) => rte.history.undo()
	});
	
	rte.addButton('redo', {
		title: 'redo action',
		icon: `<img src='${rte.icons}redo.svg'>`,
		state: (rte) => rte.history.canRedo,
		action: (rte) => rte.history.redo()
	});
	
	//on input, wait 2.5 srconds after last input then push
	var isInputing = false, timerId = 0;
	rte.on('input', () => {
		isInputing = true;
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			if (isInputing) rte.history.push();
			isInputing = false;
		}, 2500)
	});
	
	//on before action, if was inputing push
	rte.on('beforeAction', () => {
		if (isInputing) rte.history.push();
		isInputing = false
	});
	
	//on after action, push
	rte.on('afterAction', (rte, name) => {
		if (!skipActions.includes(name)) rte.history.push();
	})
}