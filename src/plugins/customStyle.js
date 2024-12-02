import $edit from '../utils/edit/index.js';
import { addInputs } from '../creators.js';

export default (rte, config) => {
	addInputs(rte, 'custom style', {
		title: 'custom style text',
		icon: `<img src='${rte.icons}custom-style.svg'>`,
		inputs: [
			{ placeholder: 'property name' },
			{ placeholder: 'value (default: initial)' }
		],
		action: (prop, value) => $edit.applyCss(prop, value)
	})
}