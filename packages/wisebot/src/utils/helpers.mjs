import chalk from 'chalk';
import uuid4 from 'uuid/v4';

// const errorLabel = chalk.red('error');
const warningLabel = chalk.yellow('warning');

export const generateServiceId = () => uuid4();

export const generateServiceWarning = (serviceName, message) => {
	const service = chalk.magenta(serviceName);

	// eslint-disable-next-line no-console
	console.log(warningLabel, `${service}: ${message}`);
};
