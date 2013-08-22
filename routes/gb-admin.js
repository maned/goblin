var auth = require('../lib/auth.js'),
	express = require('express')

var app = module.exports = express.createServer()

var html_dir = '../lib/views/'

//Edit page
app.get('/edit', auth.check, function (req, res) {
    res.sendfile(html_dir + 'edit.html')
})

//Config Page
app.get('/config', auth.check, function (req, res) {
    res.sendfile(html_dir + 'config.html')
})