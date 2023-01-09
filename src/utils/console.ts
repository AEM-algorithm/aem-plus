import {environment} from '@environments/environment';

if (environment.production) {
	// remove console.log
	console.log = () => {};
}
