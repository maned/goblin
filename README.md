# goblin
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
2. Install CouchDB. Write CouchDB's url, port and credientials (You will have to create a default user for your database; goblin now looks for 'admin', 'admin').
3. Go to 'lib/config.js' and place in the information you just wrote down, as well as the admin username, password and port (defaults to 'admin', 'admin', and 8000, respectively).
4. Navigate to the directory in the command line, run 'npm install' to install dependencies, and then run the 'index.js' file with node. ('nodejs index.js' in linux, 'node index.js' in OS X/Unix).
5. Go to 'localhost:8000/' in your browser, and 'localhost:8000/login', and you'll see goblin run!

In addition, you can feel free to use an already hosted CouchDB instance -- like signing up for one for free at IrisCouch (http://iriscouch.com) if you don't want to install couch locally (see the next part for more details!). 

---

##Using IrisCouch for your CouchDB instance

I've found that, for developement, it's often too much to download and run CouchDB on your local machine. If you want to get started faster, without installing it, you can follow these instructions and create a CouchDB instance on a remote host (like IrisCouch.com)

These steps explain how to do it with a hosted CouchDB on IrisCouch (for free)
1. Go to IrisCouch.com and sign up for a free instance.
2. Take the url for the instance you recieved and visit it.
3. For security, in the lower right hand corner, add an admin account. Write the credientials down.
4. Go to 'lib/config.js' in goblin, insert the db URL, port (443 if it's over HTTPS), username, password, as well as the goblin admin information as well.
6. Go and get started, like a boss!

Here is an example (from 'lib/config.js'):

	// Couch Admin user name
	config.couchUsername = "username"
	
	// Couch Admin Password
	config.couchPassword = "password"
	
	// URL of the CouchDB instance
	config.couchURL = "https://subdomain.iriscouch.com"
	
	// Port of the CouchDB instance
	config.couchPort = 443

If you have any issues installing, please provide feedback on where these instructions are not illumintating enough! You can report an issue on GitHub for this to be fixed, or even email me directly (see: Feedback).

---

##Using Cloud9 IDE for your Goblin Development

If you want to keep all your Goblin development work in the cloud, you can use the awesome Cloud9 IDE (which has both free and premium options).

These steps explain how to setup your cloud9 IDE with a goblin workspace:
1. Go to http://c9.io and create a new free account (you can even login using your github credentials).
2. In your dashboard, go to the "Your Account" section and activate the github add-on. This will add your github projects to the dashboard.
3. Follow the steps at http://support.cloud9ide.com/entries/20548092-Lesson-2-Creating-a-new-project to create a new project and clone the goblin project into a workspace.
4. Start editing that workspace. You'll see your workspace files all nice and neat. 
5. Go to goblin/lib/ and modify your conifg.js. Set your config.desiredPort = process.env.PORT, and any other settings you need to here. (I used IrisCouch, but you may want to install CouchDB into your workspace.)
6. Open index.js, and click the Run button. Goblin should start up!

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

Place all of your customized CSS and JS files into the 'public/theme' folder. All the files will render in the '/theme'
directory in the browser.

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

1. ~~Break up 'index.js' into multiple modules for easier development.~~
2. ~~Move admin to Backbone/Marionette single-page app~~
3. ~~Bootstrap new Admin area based on new designs (see '/design-files')~~
4. ~~Multiple .gob file support~~
5. ~~Better, bootstrapped default theme.~~
6. Nested navigation support.
7. Multiple users support.
8. A script to make installing easier.
9. Further CSS work to bring admin closer to designs.
10. Implementation of node-unit, qunit and grunt to secure code quality and testing.
11. Document API.

---
###Feedback

Please, please, please provide feedback! We would *love* to hear your thoughts on goblin, as well as field any and all bugs
and issues thrown our way. If you find a defect, or have a feature suggestion, please log an 'issue' in GitHub, and we
will address it as soon as possible! If you're having an issue figuring things out, you can either go to StackOverflow and
post, use / develop our wiki here, and even just email me (nweingartner@maned.com) and I can try to help you out personally.

Regardless of the method, please get in touch without any hesitation. Did we mention we love feedback?

--
###Related Projects

goblin has some sibilings! Below are projects that either directly correspond with the goblin project, or have been inspired
by and/or help the goblin cause. Please consider getting involved in these great projects as well!

1. [Official goblin marketing website](http://www.github.com/maned/goblin-website)
2. [CouchDB Puppet Module](https://github.com/jonbrouse/puppet-couchdb)

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
