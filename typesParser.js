const fs = require('fs');

// interface regex
const intregex  = /^(export interface)(.*)\{/g;

// multi or single line comment
const comregex = /(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)|(\<![\-\-\s\w\>\/]*\>)/g;

function formTypeDef(string){

  const name = string.match(intregex)[0].split('export interface ')[1].split('{')[0];
  let td = `/**\n * @typedef {${name}\n`;
  
  const body = string.split(string.match(intregex))[1].split('}')[0].split('\n').filter(g => !!g);
  for (const l of body){
    if (comregex.test(l)){

    }
  }
}

