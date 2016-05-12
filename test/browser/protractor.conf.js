require('dotenv').config({path:"../../.env"});
var _ = require('lodash');
var localConfig = {
  "protractor": {
    seleniumAddress: 'http://127.94.0.1:4444/wd/hub',
    capabilities: {
      'browserName': 'chrome',
      //      'browserName': ['chrome','firefox']
      'browserstack.debug':true, //tested not much overhead
      // Needed for testing localhost
      'browserstack.local': 'true'
    },
    jasmineNodeOpts: {
      defaultTimeoutInterval: 30000
    }
  },
  "application":{
    "url":""
  }
}
var bsConfig = {
  "protractor": {
    seleniumAddress: 'http://hub.browserstack.com/wd/hub',
    capabilities: {
      'browserName': 'chrome',
      //      'browserName': ['chrome','firefox']
      'browserstack.user': process.env.BROWSER_STACK_USER,
      'browserstack.key': process.env.BROWSER_STACK_KEY,
      'browserstack.debug':true //tested not much overhead
      // Needed for testing localhost
      // 'browserstack.local': 'true'
    },
    jasmineNodeOpts: {
      defaultTimeoutInterval: 30000
    }
  },
  "application":{
    "url":""
  }
}

var config = {
  specs: ['*.js']
}
var mode = process.env.BROWSER_TEST_MODE

if(!mode){
  console.error('specify in env variable BROWSER_TEST_MODE as local or bs_local or bs')
}
console.log("Using Mode:"+mode);
if(mode === "bs_local"){
  _.assign(config,bsConfig["protractor"])
  config["capabilities"]["browserstack.local"]=true;
}else if (mode === "bs"){
  _.assign(config,bsConfig["protractor"])
}else {
  _.assign(config,localConfig)
}
exports.config = config
