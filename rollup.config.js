/* eslint-disable import/no-extraneous-dependencies */
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
/* eslint-enable import/no-extraneous-dependencies */

import nodePath from 'path';

import WisebotPackage from './packages/wisebot/package.json';

import TelegramPackage from './packages/telegram/package.json';
import DiscordPackage from './packages/discord/package.json';
import VKPackage from './packages/vk/package.json';

import I18nPackage from './packages/i18n/package.json';

const babelrc = require('./babel.config');

const ROOT_PACKAGES = nodePath.join(__dirname, 'packages');

const packages = [
	{
		name: 'wisebot',
		pkg: WisebotPackage
	},

	{
		name: 'telegram',
		pkg: TelegramPackage
	},
	{
		name: 'discord',
		pkg: DiscordPackage
	},
	{
		name: 'vk',
		pkg: VKPackage
	},
	{
		name: 'i18n',
		pkg: I18nPackage
	}
];

export default packages.map(pack => ({
	input: nodePath.join(ROOT_PACKAGES, pack.name, 'src/index.mjs'),
	plugins: [
		json(),
		babel({
			...babelrc,

			exclude: [
				'node_modules/**'
			],

			babelrc: false
		}),
		resolve({
			preferBuiltins: true
		}),
		commonjs()
	],
	external: [
		...Object.keys(pack.pkg.dependencies),
		'crypto',
		'stream',
		'https',
		'path',
		'http',
		'util',
		'url',
		'fs',
		'os',
		'vm'
	],
	output: [
		{
			file: nodePath.join(ROOT_PACKAGES, pack.name, `${pack.pkg.main}.js`),
			format: 'cjs',
			exports: 'named'
		},
		{
			file: nodePath.join(ROOT_PACKAGES, pack.name, `${pack.pkg.main}.mjs`),
			format: 'esm'
		}
	]
}));
