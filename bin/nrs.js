#!/usr/bin/env node

/**
 * Module dependencies
 */
var program = require('commander');
var shell = require('shelljs');
var Table = require('cli-table');

var pkg = require('./../package.json');
var configProvider = require('../lib/configProvider');

// Get the config
var config = configProvider.get();

var showCurrent;
var listRepositories;

showCurrent = function () {
  var current = shell.exec('npm config get registry', {silent : true});
  var table = new Table({
    head: ['Current']
  });
  if (current.code === 0) {
    table.push([current.output]);
    console.log(table.toString())
  } else {
    console.error(current.output)
  }
};

listRepositories = function () {
  config = configProvider.get();
  var table = new Table({
    head: ['Alias', 'Address']
  });

  var repository;
  for (repository in config.repositories) {
    table.push([repository, config.repositories[repository]])
  }

  console.log(table.toString());
};

program
  .version(pkg.version);

/**
 * Command: current
 */
program.command('current')
  .description('shows the current registry being used')
  .action(function() {
    showCurrent();
  });

/**
 * Command: list
 */
program.command('list')
  .description('lists all the added NPM repository')
  .action(function() {
    listRepositories();
  });

/**
 * Command: use
 */
program.command('use [alias]')
  .description('start using an existing NPM repository settings')
  .action(function() {
    var alias = program.rawArgs[3];
    var url = config.repositories[alias];
    var result;
    if (!alias) {
      return console.error('An alias must be specified.');
    }
    if (url) {
      result = shell.exec('npm config set registry ' + url, {silent : true});
      if (result.code ===0) {
        showCurrent();
      } else {
        console.error(result.output);
      }
    } else {
      return console.error('No repository found with alias:', + alias);
    }
  });

/**
 * Command: add
 */
program.command('add [alias] [url]')
  .description('adds a new NPM repository setting')
  .action(function() {
    var alias = program.rawArgs[3];
    var url = program.rawArgs[4];
    config.repositories[alias] = url;
    // save back to the file
    configProvider.set(config);
    listRepositories();
  });

/**
 * Command: remove
 */
program.command('rm [alias]')
  .description('deletes an existing NPM repository setting')
  .action(function() {
    var alias = program.rawArgs[3];
    delete config.repositories[alias];
    // save back to the file
    configProvider.set(config);
    listRepositories();
  });

/**
 * Command: restore
 */
program.command('restore')
  .description('restores the original config file')
  .action(function() {
    configProvider.restore();
    listRepositories();
  });

program.parse(process.argv);

// Display the help message if no arguments was passed
if (!program.args.length) {
  program.help();
}
