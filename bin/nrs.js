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

program
  .version(pkg.version);

/**
 * Command: use
 */
program.command('use')
  .description('start using an existing NPM repository settings')
  .action(function(options) {

  });

/**
 * Command: current
 */
program.command('current')
  .description('shows the current registry being used')
  .action(function(options) {
    var current = shell.exec('npm config get registry', {silent : true});
    var table = new Table({
      head: ['Current']
    });
    if (current.code === 0) {
      table.push([current.output]);
      console.log(table.toString())
    } else {
      console.log(current.output)
    }
  });

/**
 * Command: list
 */
program.command('list')
  .description('lists all the added NPM repository')
  .action(function(options) {
    var table = new Table({
      head: ['Alias', 'Address']
    });

    var repository;
    for (repository in config.repositories) {
      table.push([repository, config.repositories[repository]])
    }

    console.log(table.toString());
  });

/**
 * Command: add
 */
program.command('add')
  .description('adds a new NPM repository setting')
  .action(function(options) {

  });

/**
 * Command: remove
 */
program.command('remove')
  .description('deletes an new NPM repository setting')
  .action(function(options) {

  });

program.parse(process.argv);

// Display the help message if no arguments was passed
if (!program.args.length) {
  program.help();
}
