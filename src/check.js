export var checkel = (el, name) => {
	if (!(el instanceof Element)) throw new TypeError(`hyperRTE: ${name} of type (${el?.constructor?.name}), expected (Element)`);
}

export var checkstr = (str, name) => {
	if (typeof str !== 'string') throw new TypeError(`hyperRTE: ${name} of type (${str?.constructor?.name}), expected (String)`);
}

export var checkfn = (fn, name) => {
	if (typeof fn !== 'function') throw new TypeError(`hyperRTE: ${name} of type (${fn?.constructor?.name}), expected (Function)`);
}

export var checkarr = (arr, name) => {
	if (!Array.isArray(arr)) throw new TypeError(`hyperRTE: ${name} of type (${arr?.constructor?.name}), expected (Array)`)
}

export var checkpInt = (nb, name) => {
	if (typeof nb !== 'number') throw new TypeError(`hyperRTE: ${name} of type (${nb?.constructor?.name}), expected (Number)`);
	if (!Number.isInteger(nb)) throw new TypeError(`hyperRTE: ${name} is (${nb}), expected integer`);
}