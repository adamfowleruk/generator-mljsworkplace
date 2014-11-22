/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('mljsworkplace:app', function () {
  this.timeout(10000);

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        resthostname: "192.168.123.225",
        restport: 5001,
        restcreate: false,
        appname: "myworkplace",
        webserverport: 5001,
        alertserverport: 5002,
        mladminuser: "admin",
        mladminpass: "admin",
        mldefaultuser: "nobody",
        database:  "myworkplace-content",
        mlcp: "/Users/adamfowler/Documents/marklogic/software/mlcp-Hadoop2-1.2-1/bin/mlcp.sh"
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',/*
      '.editorconfig',
      '.jshintrc'*/
      'app'
    ]);
  });
});
