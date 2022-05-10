let routes = require('./api/routes/gistRoutes');

let express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app); 
app.listen(port);
console.log('Server started on: ' + port);