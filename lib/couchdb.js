var cradle = require('cradle')

var db = new(cradle.Connection)('https://nwtest.iriscouch.com', 443, {
	auth: {
		username: 'admin',
		password: 'admin'
	},
	cache: false
}).database('goblin') //database name

module.exports = db