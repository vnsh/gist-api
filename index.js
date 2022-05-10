let express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');
  
//SQL Connection here


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


let routes = require('./api/routes/gistRoutes');

routes(app); 
app.listen(port);

console.log('Server started on: ' + port);