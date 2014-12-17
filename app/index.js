'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var mljs = require('mljs');

var MljsworkplaceGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },
/*
  installingMljs: function() {
    var done = this.async();
    this.npmInstall(['mljs'], {  }, done);
  },
*/
  prompting: function () {
    var done = this.async();
    this.config = {};

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the marvelous MLJS Workplace generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'resthostname',
      message: 'The MarkLogic database server hostname or IP Address',
      default: 'localhost'
    },{
      type: 'input',
      name: 'restport',
      message: 'The port of the REST API instance on MarkLogic Server to use or create',
      default: 7001
    },{
      type: 'input',
      name: 'restcreate',
      message: 'Create the REST API instance, and content and modules databases?',
      default: true
    },{
      type: 'input',
      name: 'appname',
      message: 'Application name (will be used to create appname-content, appname-modules databases)',
      default: this.appname
    },{
      type: 'input',
      name: 'triggersdatabase',
      message: 'Trigger database',
      default: 'Triggers'
    },{
      type: 'input',
      name: 'mladminuser',
      message: 'MarkLogic admin username to create and configure application',
      default: "admin"
    },{
      type: 'input',
      name: 'mladminpass',
      message: 'MarkLogic admin password to create and configure application',
      default: "admin"
    },{
      type: 'input',
      name: 'mldefaultuser',
      message: 'Default user for web application before authentication',
      default: "nobody"
    },{
      type: 'input',
      name: 'mlauth',
      message: 'Authentication to use for MarkLogic (digest, basic, application)',
      default: "digest"
    },/*{
      type: 'input',
      name: 'mlcp',
      message: 'Path to MLCP on the local machine',
      default: "/Users/adamfowler/Documents/marklogic/software/mlcp-Hadoop2-1.2-1/bin/mlcp.sh"
    },*/{
      type: 'input',
      name: 'webserverport',
      message: 'The MLJS Web Server Node.js application\'s web app port',
      default: 5001
    },{
      type: 'input',
      name: 'alertserverport',
      message: 'The MLJS Web Server Node.js alert receiving server port',
      default: 5002
    }];

    this.log("About to run prompts");

    var self = this;
    this.prompt(prompts, function (props) {
      self.config = props;

      self.log("Set prompt properties");

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.log("Copying app files");
      this.dest.mkdir('app');
      this.dest.mkdir('app/templates');
      this.dest.mkdir('app/templates/files');

      /*
      for (var name in this) {
        console.log("this." + name);
      }*/

      this.src.copy('files/package.json', 'package.json');
      this.src.copy('files/bower.json', 'bower.json');

      this.directory('files/src','app');
      this.directory('files/modules','modules');
      this.directory('files/rest-api','rest-api');
      this.directory('files/config','config');
      this.directory('files/util','util');
      this.directory('files/data','data');
      this.directory('files/packages','packages');
      //this.src.copy('files/add-search-options.sh','add-search-options.sh');
      //this.src.copy('files/all.xml','all.xml');
      //this.src.copy('files/capture-workplace.sh','capture-workplace.sh');
      //this.src.copy('files/create-rest-server.sh','create-rest-server.sh');
      //this.src.copy('files/install-extensions.sh','install-extensions.sh');
      //this.src.copy('files/install-workplace.sh','install-workplace.sh');
      //this.src.copy('files/mljs-webserver.js','mljs-webserver.js');
      //this.src.copy('files/run-mljs-webserver.js','run-mljs-webserver.js');
      this.src.copy('files/mljsserve','mljsserve');
      this.src.copy('files/mljsadmin','mljsadmin');
      this.src.copy('files/mljsserve.bat','mljsserve.bat');
      this.src.copy('files/mljsadmin.bat','mljsadmin.bat');
      //this.src.copy('webserver-settings.sh','webserver-settings.sh');

      // overwrite webserver-settings.sh to have correct app server settings

      var settings = "#!/bin/sh\n\n# CREATED BY YEOMAN generator-mljsworkplace!\n\n";
      settings +=    "RESTHOST=" + this.config.resthostname + "\n";
      settings +=    "RESTPORT=" + this.config.restport + "\n";
      settings +=    "DATABASE=" + this.config.appname + "-content\n";
      settings +=    "MLADMINUSER=" + this.config.mladminuser + "\n";
      settings +=    "MLADMINPASS=" + this.config.mladminpass + "\n";
      settings +=    "MLAUTH=" + this.config.mlauth + "\n";
      settings +=    "MLDEFAULTUSER=" + this.config.mldefaultuser + "\n";
      settings +=    "WEBPORT=" + this.config.webserverport + "\n";
      settings +=    "ALERTPORT=" + this.config.alertserverport + "\n";
      settings +=    "APPPATH=./app\n";
      settings +=    "DEFAULTPATH=/workplace.html5\n";
      settings +=    "MLCP=" + (this.config.mlcp||"") + "\n";

      this.dest.write('config/webserver-settings.sh',settings);

      var env = {
        host: this.config.resthostname, port: this.config.restport, database: this.config.appname + "-content",
        username: this.config.mladminuser, password: this.config.mladminpass, auth: this.config.mlauth,
        defaultuser: this.config.mldefaultuser, webport: this.config.webserverport, alertport: this.config.alertserverport,
        apppath: "./app", defaultpath: "/workplace.html5", modulesport: this.config.restport - 1,
        modulesdatabase: this.config.appname + "-modules",
        ssl: false, adminport: 8002, triggersdatabase: this.config.triggersdatabase
      };
      this.dest.write('config/env.js',"module.exports = " + JSON.stringify(env));

      this.log("finished copying app files");
    },

    projectfiles: function () {
      this.log("Copying project files");
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.log("Finished copying project files");
    }
  },

  end: function () {
    this.log("In end");
    this.installDependencies();

    // Now run set up scripts, if required
    /*
    if (true === this.config.restcreate) {
      this.log("Creating rest api instance...");
      this.spawnCommand('./mljsadmin',['install']);
    }
    */
    // CANNOT run above as deps not installed yet

    // this.spawnCommand('composer', ['install']); -> to fire off shell scripts
    //this.log("Finishing end");
  }
});

module.exports = MljsworkplaceGenerator;
