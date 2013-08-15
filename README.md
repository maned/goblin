# goblin: a MEI Technology
## a pure content management system

goblin in a Javascript-based Content Management System, built on Node.js and utilizing CouchDB as it's data store.
It's focus is to be as easily templateable as possible, so that front-end developers can just hop in and do what
they do best.

**What makes goblin so special?**

goblin is lightweight, nimble, fast and incredibly easy-to-theme. It's written entirely in javascript, making it
super friendly for front-end developers (you know, the ones that will be themeing!) to customize and understand.

**Why Javascript?**

It's a great, and very versitile language. It's also the lingua franca of the web, and is one that front-end
developers are more likely to be comfortable with.

**Why is goblin so great?**

It just is! Let's get on to the details...

----

### How to Install goblin

Installing goblin is easy. First you must have these two dependencies installed:

1. Node.js (currently tested on v0.10.5 - http://nodejs.org/)
2. Node Package Manager (npm) (currently tested on 1.2.14 - http://howtonode.org/introduction-to-npm)
3. CouchDB (currently tested on 1.2.0 - http://couchdb.apache.org/)

Then, here are the steps:

1. Download goblin and place it in a directory
2. Create a database in CouchDB. Write down the name of it, as well as CouchDB's url, port and credientials (You will have to create a default user for your database; goblin now looks for 'admin', 'admin').
3. Take this information, and place it in the appropriate fields in 'db.js'.
4. Change the default username and password in 'goblin.js' (by default, it is gb-admin and admin, respectively).
5. Navigate to the directory in the command line, run 'npm install' to install dependencies, and then run the 'goblin.js' file with node. ('nodejs goblin.js' in linux, 'node goblin.js' in OS X/Unix).
6. Go to 'localhost:8000/' in your browser, and 'localhost:8000/gb-admin', and you'll see goblin run!

In addition, you can feel free to use an already hosted CouchDB instance -- like signing up for one for free at IrisCouch (http://iriscouch.com) if you don't want to install couch locally (see the next part for more details!). 

---

##Using IrisCouch for your CouchDB instance

I've found that, for developement, it's often too much to download and run CouchDB on your local machine. If you want to get started faster, without installing it, you can follow these instructions and create a CouchDB instance on a remote host (like IrisCouch.com)

These steps explain how to do it with a hosted CouchDB on IrisCouch (for free)
1. Go to IrisCouch.com and sign up for a free instance.
2. Take the url for the instance you recieved and visit it.
3. For security, in the lower right hand corner, add an admin account. Write the credientials down.
4. Create a new database (like you would in any CouchDB instance) and write it down.
5. Go to db.js in Gobln.
6. Insert the name, port (443 if it's over HTTPS), username, password and database name in the file.
7. Go and get started, like a boss!

Here is an example:

     var db = new(cradle.Connection)('https://subdomain.iriscouch.com', 443, {
	     auth: {
		    username: 'username',
		    password: 'password'
	     },
	     cache: false
     }).database('db_name');

If you have any issues installing, please provide feedback on where these instructions are not illumintating enough! You can report an issue on GitHub for this to be fixed, or even email me directly (see: Feedback).

---

### Theming goblin

The ability to easily theme is at the heart of goblin's mission. The bulk of this work happens within the .gob file
system.

To create a .gob file, just create an HTML file and place all/some of the goblin variables in the place where you
want it to render.

These are the variables currently supported in this release of goblin:

1. site title - {{site_title}}
2. site description - {{site_description}}
3. navigation - {{#nav}}  {{url}} {{item_name}} {{id}}   {{/nav}}
4. page title - {{page_title}}
5. page content - {{{page_content}}}
6. meta description - {{meta_description}}
7. meta keywords - {{meta_keywords}}
8. Google Analytics Id - {{ga_id}}

After you are done, change the extension from .html to .gob, and place it in the templates folder.

Place all of your customized CSS and JS files into components > custom. All the files will render in the /custom/
directory in the browser, so make sure you point to them using '/custom/' path in your .gob file.

goblin adopts mustache's great templating language (https://github.com/janl/mustache.js/), so anything you can
do with mustache you can use here (this information will come in handy when creating themes with custom variables).

As of right now, goblin only supports one .gob file at a time (call it page.gob, to make it easy to implement
out of the box). However, multiple .gob file support is forthcoming and will soon be implemented!

---

###So go get started, amigo!

goblin is built to be as flexible as possible, so a lot of customization can be built into this, and documentation
on this will come soon! In the meantime, please use, run, theme and explore goblin, and please report any issues
you run into (no matter how small) and submit improvements if you can!

---

###Current Limitations / To-do List

goblin is currently in a development, alpha phase. We are looking for feedback to help build the product out based on some great user feedback. However, there are a few things we are looking to do sooner than later (and would love your help with!):

1. Redesigned Admin Area
2. Multiple .gob file support
3. Better, bootstrapped default theme.
4. Nested navigation support.
5. Multiple users support.
6. A script to make installing easier.

---
###Feedback

Please, please, please provide feedback! We would *love* to hear your thoughts on goblin, as well as field any and all bugs
and issues thrown our way. If you find a defect, or have a feature suggestion, please log an 'issue' in GitHub, and we
will address it as soon as possible! If you're having an issue figuring things out, you can either go to StackOverflow and
post, use / develop our wiki here, and even just email me (nweingartner@maned.com) and I can try to help you out personally.

Regardless of the method, please get in touch without any hesitation. Did we mention we love feedback?

---

###License

Copyright (C) 2013  Managing Editor Inc (http://www.maned.com/)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
