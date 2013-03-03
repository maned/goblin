/*
var fakeData = {
   "_id": "pages_info",
   "_rev": "1-c0f9ea18e67631024f346de9257781e4",
   "pages": [
       {
           "name": "Home",
           "page_id": "index",
           "url": "index.html"
       },
       {
           "name": "About",
           "page_id": "about",
           "url": "about.html"
       },
       {
           "name": "How It Works",
           "page_id": "how_it_works",
           "url": "how_it_works.html"
       },
       {
           "name": "Contribute",
           "page_id": "contribute",
           "url": "contribute.html"
       },
       {
           "name": "Contact",
           "page_id": "contact",
           "url": "contact.html"
       }
   ]
}


function routesGetandSetNew(data) {


  for (key in data) {
    //Create a Closure because Javascript is strange, dude!
    (function(key1) {
      //In the looping, make sure you don't take the ID or Revision Number from the DB
      if (key1 !== "_id" && key1 !== "_rev") {
        console.log('ahhpeing')
        console.log(data[key].name)
        console.log(key1)
        //Set route for val
        
        app.get('/' + data[key].url, function(req, res) {
          //Go into the DB and get that information, man!
           db.get(data[key].page_id, function (err, doc) {
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
db.get('page_info', function (err, doc) {
      routesGetandSetNew(doc.pages);
});
*/

// Loop in Admin
var dataY = {
   "_id": "page_routes",
   "_rev": "6-02854f29e782f2f929271fea05a70216",
   "about": "about.html",
   "how_it_works": "how_it_works.html",
   "contribute": "contribute.html",
   "contact": "contact.html"
};

function getEditPageData(data) {
  for (key in data) {
    //Create a Closure because Javascript is strange, dude!
    (function(key1) {
      //In the looping, make sure you don't take the ID or Revision Number from the DB
      if (key1 !== "_id" && key1 !== "_rev") {
        //Set route for value
        alert(key1);
        alert(data[key1]);
        $('#page_to_edit').append('<option'
      }
     }
    )(key)
  }
}

getEditPageData(dataY);