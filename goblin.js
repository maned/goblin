var http = require('http')
  , util = require('util')
  , mu   = require('mu2')
  , db = require('./db')
  , express = require('express')
  , app = express();

//Let the nice System Admin know the server is running.
console.log('Goblin Lives.')

//Configure Body Parser
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

function setRoutes () {
  db.get('pages_routes', function (err, doc) {
      routesGetandSet(doc);
  });
}

//Run the Loop and Set Up all Pages
setRoutes();
  
//Set up the Index Page, by Default.
app.get('/', function(req, res) {
  db.get('index', function (err, doc) {
      var stream = mu.compileAndRender('page.gob', doc);
      util.pump(stream, res);
    });
});

//Ajax Calls and Responses
app.post('/admin-save.json', function(req, res) {

  db.get(req.body.page_id, function (err, doc) {
      if (doc === undefined) {
        //The document doesn't exist.

        var newPage = {};
        newPage[req.body.page_id] = req.body.page_url;
        console.log(newPage);
        //Add it to the page_routes
        db.merge('pages_routes', 
            newPage
          , function (err, res) {
              console.log('added to pages routes')
        });
        //Then make a document and add the new info, bro.
        db.save(req.body.page_id, {
            page_title: req.body.page_title,
            page_content: req.body.page_content,
            page_url: req.body.page_url,
            meta_description: req.body.meta_description,
            meta_keywords: req.body.meta_keywords
        }, function (err, res) {
            // Handle response
        });

        //Reset Routes (as of now, does not work until server restart).
        setRoutes();
      } else {
        //It exists, so just merge the new info
         db.merge(req.body.page_id, {
            page_title: req.body.page_title,
            page_content: req.body.page_content,
            page_url: req.body.page_url,
            meta_description: req.body.meta_description,
            meta_keywords: req.body.meta_keywords
          }, function (err, res) {
            console.log(' ajax post successful')
        });
      }
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

app.post('/get-pages.json', function(req, res) {
    db.get('pages_routes', function (err, doc) {
      res.contentType('json');
      res.send(doc);
    });
 });

//Set up Static File for Components
app.use(express.static(__dirname + '/components'));

app.listen(8000);