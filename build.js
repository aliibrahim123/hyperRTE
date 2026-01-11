//build source files into compressed files

import * as esbuild from 'esbuild';

var scripts = [
	'index.js',
	'index.g.js',
	'presets/basic.js',
	'presets/standared.js',
	'presets/full.js',
];

esbuild.build({
	entryPoints: scripts.map(file => 'src/' + file),
	bundle: true,
	minify: true,
	platform: 'neutral',
	keepNames: true,
	metafile: true,
	outdir: './'
}).then(result => esbuild.analyzeMetafile(result.metafile)).then(result => console.log(result))
