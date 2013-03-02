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

function routesGetandSet(data) {
  for (key in data) {
    //Create a Closure because Javascript is strange, dude!
    (function(key1) {
      //In the looping, make sure you don't take the ID or Revision Number from the DB
      if (key1 !== "_id" && key1 !== "_rev") {
        //Set route for value
        app.get('/' + data[key1], function(req, res) {
          //Go into the DB and get that information, man!
           db.get(key1, function (err, doc) {
            var stream = mu.compileAndRender('page.gob', doc);
            util.pump(stream, res);
          });
        });
      }
     }
    )(key)
  }
}

//Run the Loop and Set Up all Pages
db.get('page_routes', function (err, doc) {
      routesGetandSet(doc);
});
  
//Set up the Index Page, by Default.
app.get('/', function(req, res) {
  db.get('index', function (err, doc) {
      var stream = mu.compileAndRender('page.gob', doc);
      util.pump(stream, res);
    });
});

//Admin Parts Start Here
app.get('/gb-admin', function(req, res) {
  db.get('admin', function (err, doc) {
      var stream = mu.compileAndRender('gb-admin/index.gob', doc);
      util.pump(stream, res);
    });
});

app.get('/gb-admin/new-page.html', function(req, res) {
  db.get('admin', function (err, doc) {
      var stream = mu.compileAndRender('gb-admin/index.gob', doc);
      util.pump(stream, res);
    });
});

//Ajax Calls and Responses
app.post('/admin-save.json', function(req, res) {
    db.merge(req.body.page_id, {
      page_title: req.body.page_title,
      page_content: req.body.page_content
    }, function (err, res) {
      console.log(' ajax post successful')
  });
  res.contentType('json');
  res.send({ some: JSON.stringify({response:'json'}) });
});

app.post('/page-edit.json', function(req, res) {
    db.get(req.body.page_id, function (err, doc) {
      res.contentType('json');
      res.send(doc);
    });
 });

//Set up Static File for Components
app.use(express.static(__dirname + '/components'));

app.listen(8000);