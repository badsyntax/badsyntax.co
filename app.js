var express = require('express');
var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'mustache');
  app.register('.mustache', require('stache'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
require('./routes').route(app);

app.listen(80, 'badsyntax.co', function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
