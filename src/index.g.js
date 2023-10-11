import HyperRTE from './index.js';
import * as creators from './creators.js';

globalThis.HyperRTE = HyperRTE;
Object.assign(HyperRTE, creators);

export default HyperRTE
export * from './creators.js'