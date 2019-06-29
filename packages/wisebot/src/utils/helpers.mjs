import colorette from 'colorette';
import uuid4 from 'uuid/v4';

// const errorLabel = colorette.red('error');
const warningLabel = colorette.yellow('warning');

export const generateServiceId = () => uuid4();

export const generateServiceWarning = (serviceName, message) => {
	const service = colorette.magenta(serviceName);

	// eslint-disable-next-line no-console
	console.log(warningLabel, `${service}: ${message}`);
};
