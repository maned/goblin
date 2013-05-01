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

**Why is Goblin so great?**

It just is! Let's get on to the details...

---

### How to Install goblin

Installing goblin is easy. First you must have these two dependencies installed:

1. Node.js
2. Node Package Manager (npm)
3. CouchDB

Then, here are the steps:

1. Download goblin and place it in a directory
2. Create a database in CouchDB. Write down the name, url, port and credientials.
3. Take this information, and place it in the appropriate fields in 'db.js'.
4. Change the default username and password in 'goblin.js' (by default, it is gb-admin and admin, respectively).
5. Navigate to the directory in the command line, and run the 'goblin.js' file with node. ('nodejs goblin.js' in linux, 'node goblin.js' in OS X/Unix).
6. Go to 'localhost:8000/' in your browser, and 'localhost:8000/gb-admin', and you'll see goblin run!

---

### Themeing goblin

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

