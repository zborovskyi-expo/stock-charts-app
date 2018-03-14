const express = require('express'),
      path = require('path'),
      port = 8000,
      routes = require('./routes'),
      app = express()

class Server {

  constructor(){
    this.initStaticFolder()
    this.initRoutes()
    this.start()
  }

  start(){
    app.set('port', (process.env.PORT || port));
    app.listen(app.get('port'), ()=>
      console.log('Server listening on port ' + app.get('port')))
  }

  initStaticFolder(){
    //app.use(express.static(path.join(__dirname, 'public')))
    app.use(express.static(path.join(__dirname, '../app/client/dist/')));
  }


  initRoutes(){

    app.use((req, res, next) => {
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
      next();
    });
    app.use('/', routes)
  }

}

new Server()
