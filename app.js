var PORT = (process.env.PORT || 3000)
  , HOST = (process.env.VCAP_APP_HOST || 'localhost');

var fs = require('fs')
  , express = require('express')
  , app = express.createServer()
  , domain = require('domain')
  , shelljs = require('shelljs/global');

// Config
app.set('views', __dirname + '/app/views');
app.register('.html', require('ejs'));
app.set('view engine', 'html');
app.configure(function(){
  app.use(express.logger('\x1b[33m:method\x1b[0m \x1b[32m:url\x1b[0m :response-time'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('SEKR37'));
  app.use(express.session({
    key: 'app.sess',
    secret: 'SEKR37'
  }))
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

});

// Resources
function bootResources(app) {
  fs.readdir(__dirname + '/app/resource', function (err, files){
    if (err) { throw err; }
    files.forEach(function (file){
      if ((file.indexOf("~") > -1) || (file.indexOf(".svn") > -1)) {
        return;
      }

      var name = file.replace('.js', '')
        , Res = require('./app/resource/' + name);

      if (typeof Res !== 'function') {
        return; // since this isn't a resource
      }

      if (typeof Res.prototype.route !== 'function') {
        return; // since this isn't a resource
      }

      var r = new Res();
      r.route(app);
    });
  });
}

bootResources(app);

if (!module.parent) {
  var d = domain.create();

  d.on('error', function (err) {
    console.log(' uncaught error : ',err);
  });

  d.run (function () {
    app.listen(PORT);
    if(which('stackato')) {
      process.env.Stackato_CLI_Path = which('stackato');
    }
    else {
      process.env.Stackato_CLI_Path = "./binaries/stackato";
    }
    console.log("Stackato CLI Path :" + process.env.Stackato_CLI_Path);
    console.log('App started on port: ' + PORT);
  });
}

module.exports = app;
