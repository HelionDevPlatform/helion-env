var klass = require('klass');

var Logger = module.exports = klass(function () {
  // constructor
}).methods({
  log : function(message, data, logLevel) {
    console.log(message);
    if(data){
      console.dir(data);
    }
  }
});
