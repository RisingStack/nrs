#!/usr/bin/env node

var program = require('commander');
var shell = require('shelljs');

var pkg = require('./../package.json');

program
  .version(pkg.version)

program.command('use')
  .description('start using an existing NPM repository settings')
  .action(function(options) {

  });

program.command('list')
  .description('lists all the added NPM repository')
  .action(function(options) {

  });

program.command('add')
  .description('adds a new NPM repository setting')
  .action(function(options) {

  });

program.command('remove')
  .description('deletes an new NPM repository setting')
  .action(function(options) {

  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
