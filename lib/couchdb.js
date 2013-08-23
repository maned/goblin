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
	if (err) {
		console.log("There has been an error finding your CouchDB. Please make sure you have it installed and properly pointed to in '/lib/couchdb.js'.")
		process.exit()
	} else if (!exists) {
		db.create()
	}
})

module.exports = db