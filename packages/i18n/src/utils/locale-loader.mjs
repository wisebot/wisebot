import nodeFs from 'fs';
import nodeUtil from 'util';
import nodePath from 'path';

import { JSONParser, YAMLParser } from '../structures/parsers';

const { promisify } = nodeUtil;

const readDir = promisify(nodeFs.readdir);
const readFile = promisify(nodeFs.readFile);

export default class LocaleLoader {
	/**
	 * Constructor
	 */
	constructor() {
		const parsers = [
			new JSONParser(),
			new YAMLParser()
		];

		this.mapFileParsers = Object.assign(
			{},
			...parsers.map(parser => (
				Object.assign(
					{},
					...parser.fileExtensions.map(extension => ({
						[extension]: content => (
							parser.parse(content)
						)
					}))
				)
			))
		);
	}

	/**
	 * Read directory locales
	 *
	 * @param {string} directoryPath
	 *
	 * @return {Object[]}
	 */
	async readDir(directoryPath) {
		directoryPath = nodePath.resolve(directoryPath);

		const paths = await readDir(directoryPath);

		const allowExtensions = Object.keys(this.mapFileParsers);

		const files = paths
			.map((path) => {
				const extension = nodePath.extname(path);
				const filename = nodePath.basename(path, extension);

				return {
					extension,
					filename,

					path: nodePath.join(directoryPath, path)
				};
			})
			.filter(file => (
				allowExtensions.includes(file.extension)
			));

		const promises = files.map(async (file) => {
			const content = await readFile(file.path, 'utf-8');

			const parser = this.mapFileParsers[file.extension];

			const data = await parser(content);

			return {
				...file,

				data
			};
		});

		const locales = await Promise.all(promises);

		return locales;
	}
}
