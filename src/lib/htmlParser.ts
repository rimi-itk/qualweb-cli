'use strict';
import { validateHTML, validatePrinciples, validateLevels, printError } from './parserUtils';
import { readJsonFile, fileExists } from './fileUtils';
import clone from 'lodash.clone';

async function parseHTML(mainOptions, options) {
  options['html-techniques'] = {};

  if(mainOptions['html-techniques']){
    if(mainOptions.module && !options['execute']['html']) {
      printError("Wrong module selected.");
    }else{
      console.log("Warning: Module html has options but is not select. Will be select automatically");
      options['execute']["html"] = true;
    }

    if(mainOptions['html-techniques'].length === 1){
      if(await fileExists(mainOptions['html-techniques'][0])){
        let rules = await readJsonFile(mainOptions['html-techniques'][0]);
        options['html-techniques']['techniques'] = clone(rules['html-techniques']['rules']);
      }else{
        options['html-techniques']['techniques'] = clone(mainOptions['html-techniques']);
      }
    }else{
      options['html-techniques']['techniques'] = clone(mainOptions['html-techniques']);
    }

    validateHTML(options['html-techniques']['techniques']);
  }

  if(mainOptions['html-levels']){
    if(mainOptions.module && !options['execute']['html']) {
      printError("Wrong module selected.");
    }else{
      console.log("Warning: Module html has options but is not select. Will be select automatically");
      options['execute']["html"] = true;
    }


    options['html-techniques']['levels'] = clone(mainOptions['html-levels']);
    validateLevels(options['html-techniques']['levels']);
  }

  if(mainOptions['html-principles']){
    if(mainOptions.module && !options['execute']['html']) {
      printError("Wrong module selected.");
    }else{
      console.log("Warning: Module html has options but is not select. Will be select automatically");
      options['execute']["html"] = true;
    }


    options['html-techniques']['principles'] = clone(mainOptions['html-principles']);
    validatePrinciples(options['html-techniques']['principles']);
  }

  if(Object.keys(options['html-techniques']).length === 0){
    delete options['html-techniques'];
  }

  return options;
}

export {
  parseHTML
}