module.exports = {
	presets: [
		['@babel/env', {
			targets: {
				node: '10.0.0'
			},
			useBuiltIns: 'usage',
			modules: process.env.BABEL_ENV === 'test'
				? 'cjs'
				: false
		}]
	],
	plugins: ['@babel/proposal-object-rest-spread']
};
