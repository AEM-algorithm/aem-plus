const fs = require('fs');
const f =
	'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

fs.readFile(f, 'utf8', function(err, data) {
	if (err) {
		return console.log(err);
	}
	const result = data.replace(
		/node: false/g,
		"node: {crypto: true, stream: true, net: 'empty', fs: 'empty', tls: 'empty'}"
	);

	fs.writeFile(f, result, 'utf8', function(err) {
		if (err) {
			return console.log(err);
		}
	});
});


const bitcoreLib = 'node_modules/bitcore-explorers/node_modules/bitcore-lib/index.js';

fs.readFile(bitcoreLib, 'utf8', function(err, data) {
	if (err) {
		return console.log(err);
	}
	const result = data.replace(
		`throw new Error(message);`,
		`return null;`
	);
	console.log(result)
	fs.writeFile(bitcoreLib, result, 'utf8', function(err) {
		if (err) {
			return console.log(err);
		}
	});
});
