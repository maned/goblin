var cradle = require('cradle')

var db = new(cradle.Connection)('http://127.0.0.1', 5984, {
	auth: {
		username: 'admin',
		password: 'admin'
	},
	cache: false
}).database('goblin') //database name

//Check if DB exists
db.exists(function (err, exists) {
	if (!exists) {
		console.log("Your database does not exist. Please make sure your CouchDB is set up and properly set up in /lib/couchdb.js")
		process.exit()
	}
});

module.exports = db