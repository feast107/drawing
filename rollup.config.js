import {terser} from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

const mode = process.env.MODE;
const isProd = mode === 'prod';
const lib = 'index'

export default {
	input  : './src/index.ts',
	output : [
		{ file: `dist/${ lib }.umd.js`, format: 'iife', name : 'drawing', sourcemap: !isProd, },
		{ file: pkg.main, format: 'cjs', sourcemap: !isProd, },
		{ file: pkg.module, format: 'es', sourcemap: !isProd, },
	],
	plugins: [
		typescript(
		{
			removeComments: true,
			// 使用声明生成路径配置
			useTsconfigDeclarationDir: true,
		}),
		terser(),
	],
};
