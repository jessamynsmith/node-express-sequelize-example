'use strict';

const express = require('express');

const { Product } = require('./models');

const app = express();

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// API Routes
app.get('/api/v1/products', async function(request, response) {

  const products = await Product.findAll();
  response.send(products);

});

app.get('*', function(req, res) {
    res.redirect('/api/v1/products');
});

app.set('port', process.env.PORT || 5001);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
