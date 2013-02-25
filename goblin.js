var http = require('http')
  , util = require('util')
  , mu   = require('mu2')
  , db = require('./db')
  , express = require('express')
  , app = express();

app.configure(function(){
  app.use(express.bodyParser());
});

mu.root = __dirname + '/templates';

app.get('/', function(req, res) {
  db.get('f038f1e46efe868af2a612d4ea0012c8', function (err, doc) {
      var stream = mu.compileAndRender('page.gob', doc);
      util.pump(stream, res);
    });
});

app.get('/admin', function(req, res) {
  db.get('3bc191edeaafb1185af0b02a87000856', function (err, doc) {
      var stream = mu.compileAndRender('gb-admin/index.gob', doc);
      util.pump(stream, res);
    });
});

app.post('/ajax-save.json', function(req, res) {
    db.merge('f038f1e46efe868af2a612d4ea0012c8', {
      page_title: req.body.page_title,
      page_content: req.body.page_content
    }, function (err, res) {
      console.log(' ajax post successful')
  });
  res.contentType('json');
  res.send({ some: JSON.stringify({response:'json'}) });
})

app.listen(8000);