var cradle = require('cradle'),
	config = require('./config.js')

	var db = new(cradle.Connection)(config.couchURL, config.couchPort, {
		auth: {
			username: config.couchUsername,
			password: config.couchPassword
		},
		cache: false
	}).database('goblin') //database name

//Check if DB exists
db.exists(function (err, exists) {
	if (err) {
		console.log("There has been an error finding your CouchDB. Please make sure you have it installed and properly pointed to in '/lib/config.js'.")
		console.log(err)
		process.exit()
	} else if (!exists) {
		db.create()
		console.log("Welcome! New database created.")
	} else {
		console.log("Talking to CouchDB at " + config.couchURL + " on port " + config.couchPort)
	}
})

module.exports = db