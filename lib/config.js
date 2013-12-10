// All configurable fields in one location! How cool?
var config = {};

// Goblin Admin user name
config.goblinUsername = "admin";

// Goblin Admin password
config.goblinPassword = "admin";

// What Port you want goblin deployed on
config.desiredPort = 8000;

// Couch Admin user name
config.couchUsername = "admin";

// Couch Admin Password
config.couchPassword = "admin";

// URL of the CouchDB instance
config.couchURL = "http://127.0.0.1";

// Port of the CouchDB instance
config.couchPort = 5984;

// Export the module
module.exports = config;