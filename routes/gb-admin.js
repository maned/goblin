var auth = require('../lib/auth.js')

var app = module.exports = express.createServer()

var html_dir = '../lib/views/'

console.log(auth);

//Edit page
app.get('/edit', function (req, res) {
    res.sendfile(html_dir + 'edit.html')
})

//Config Page
app.get('/config', auth.check, function (req, res) {
    res.sendfile(html_dir + 'config.html')
})


