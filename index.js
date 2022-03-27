const core = require('@actions/core');
const fs = require('fs');

const fileName = core.getInput('file-name');
const inputPrefix = "INPUT_"; // This is the prefix used by GitHub Actions
const path = require("path");
const fullPath = path.join(process.env.GITHUB_WORKSPACE, fileName);

const toLowerCase = process.env["INPUT_TO-LOWER-CASE"];

var obj = {};

Object.keys(process.env).forEach(function(key) {
  if(key.startsWith(inputPrefix) && key != "INPUT_FILE-NAME") {
    const keySubstring = key.substring(inputPrefix.length);
    obj[toLowerCase ? keySubstring.toLowerCase() : keySubstring] = process.env[key];
  }
});
  
const fileContent = JSON.stringify(obj);

fs.writeFile(fullPath, fileContent, function (error) {
  if (error) {
    core.setFailed(error.message);
  }
  
  console.log(`Successfully written file ${fullPath} with content ${fileContent}`);
  core.setOutput("full-path", fullPath);
});