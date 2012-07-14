var Router = {
  init: function(app) {
    this.app = app;
    this.setupRedirects();
    this.setupRoutes();
  },
  setupRedirects: function() {

    var app = this.app;

    (function(redirects){
      for(var redirect in redirects) {
        
        (function(from, to) {

          app.get(from, function(req, res) { res.redirect(to, 301); });
        
        })(redirect, redirects[redirect]);
      }
    })(
      {
        '/post/26862850058/nodejs-and-apache-on-port-80-using-different-ip': '/post/nodejs-and-apache-on-port-80-using-different-ip',
        '/post/17208446015/absolute-basics-how-to-set-up-ssl-under-apache2-on': '/post/absolute-basics-how-to-set-up-ssl-under-apache2-on',
        '/post/16918180486/custom-select-dropdowns-select-height-in-ie7-using': '/post/custom-select-dropdowns-select-height-in-ie7-using',
        '/post/16422090709/useful-kohana-3-2-compatible-modules-and-code': '/post/useful-kohana-3-2-compatible-modules-and-code',
        '/post/10994088231/kohana-3-image-config': '/post/kohana-3-image-config',
        '/post/5553952337/tinymce-dojo-dijit-inline-popup-dialogs': '/post/tinymce-dojo-dijit-inline-popup-dialogs',
        '/post/3814131863/fast-and-password-less-ssh-login': '/post/fast-and-password-less-ssh-login',
        '/post/3014159260/github-web-hook-post-receive': '/post/github-web-hook-post-receive',
        '/post/3013686159/set-up-postgresql-phppgadmin-on-ubuntu-server': '/post/set-up-postgresql-phppgadmin-on-ubuntu-server',
        '/post/2892776925/javascript-email-validation-rfc822': '/post/javascript-email-validation-rfc822',
        '/post/2687267432/kohana-3-lazy-man-breadcrumbs': '/post/kohana-3-lazy-man-breadcrumbs',
        '/post/2365205144/tinymce-jquery-ui-inline-popups': '/post/tinymce-jquery-ui-inline-popups',
        '/post/2178451049/kohana-3-orm-tree-pages': '/post/kohana-3-orm-tree-pages',
        '/post/2107973052/kohana-3-config-database-reader': '/post/kohana-3-config-database-reader',
        '/post/1668974231/kohana-3-openid-library': '/post/kohana-3-openid-library',
        '/post/1465134196/minifying-javascript-using-google-closure-compiler-and': '/post/minifying-javascript-using-google-closure-compiler-and',
        '/post/2892776925/javascript-email-validation-rfc822': '/post/javascript-email-validation-rfc822',
      }
    );
  },
  setupRoutes: function() {
    
    var app = this.app;
    var PostController = require('../controllers/post');
    var PageController = require('../controllers/page');
    var BlogController = require('../controllers/blog');

    app.get('/', function(req, res) {
      new PageController(app, req, res);
    });
 
    app.get('/blog', function(req, res) {
      new BlogController(app, req, res);
    });

    app.get('/post/:uri', function(req, res) {
      new PostController(app, req, res);
    });
    
    app.get('/:uri', function(req, res) {
      new PageController(app, req, res);
    });
  }
};

module.exports = Router;