var auth = require('../lib/auth.js'),
	express = require('express'),
	app = express()

var app = module.exports = app

var html_dir = '../lib/views/'

//Edit page
app.get('/edit', auth.check, function (req, res) {
    res.sendfile(html_dir + 'edit.html')
})

//Config Page
app.get('/config', auth.check, function (req, res) {
    res.sendfile(html_dir + 'config.html')
})


