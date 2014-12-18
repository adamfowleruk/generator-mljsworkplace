# generator-mljsworkplace [![Build Status](https://secure.travis-ci.org/adamfowleruk/generator-mljsworkplace.png?branch=master)](https://travis-ci.org/adamfowleruk/generator-mljsworkplace)

> [Yeoman](http://yeoman.io) generator


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-mljsworkplace from npm, run:

```bash
npm install -g yo
npm install -g generator-mljsworkplace
```

Finally, initiate the generator:

```bash
yo mljsworkplace
```

### The MLJS Workplace Generator

This package contains the MLJS Workplace application generator. You get several things when you do yo mljsworkplace:-

- You are prompted for your MarkLogic server's and application's configuration settings (with sensible defaults provided)
- The MLJS Workplace webapp in the app/ folder
- The mljsadmin command to install, update, capture settings, and remove an application, extensions, search options and app servers from MarkLogic, and install and remove content
- The mljsserve command to start an advanced, MarkLogic alerting aware and WebSockets compatible, Node.js webserver for the MLJS Workplace app
- All settings in the data/env.js file for your environment
- All from the comfort of Node.js!

#### How to use mljsadmin

mljsadmin allows you to install and configure your entire app in a single hit! Simply:-

```bash
chmod u+x mljsadmin
./mljsadmin install
./mljsadmin update
```

(The update line is only required due to a temporary bug.)

To see all the functions this command can do (which are many!), type

```bash
./mljsadmin
```

#### How to use mljsserve

mljsserve starts the MLJS Web and Alert Server for your MLJS Workplace app! To start this type:-

```bash
chmod u+x ./mljsserve
./mljsserve
```

#### Loading content

By default the mljsadmin install loads content as specified in the ./data/.initial.json file, if it exists. You can
also create any folder and place a .load.json file in there, and tell mljsadmin to load that folder:-

```bash
./mljsadmin load
```

Or to load a specific folder (with its settings from .load.json in the same folder):-

```bash
./mljsadmin --load=folder -f ./data/some/folder/somewhere
```


The format of the settings for .initial.json and .load.json is the same:-

```json
{
  "folder": "./data", "recursive": true, "ignore": [".load.json", ".initial.json"],
  "prefix": "/", "stripBaseFolder": true, "collections": ["col1","col2"]
}
```

#### You're all set!

Now visit http://localhost:7001/index.html5 to see the application!!!

That's you ready to go with the MLJS Workplace app!!!

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
