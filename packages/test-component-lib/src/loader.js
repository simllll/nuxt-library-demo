/* eslint-disable */
if (process.modern && process.env.NODE_ENV) {
	module.exports = require('./modern');
} else if (process.client) {
	module.exports = require('./client');
} else {
	module.exports = require('./server');
}

module.exports.meta = require('../package.json')
