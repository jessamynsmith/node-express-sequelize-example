'use strict';

const express = require('express');

const { Product } = require('./models');

const app = express();
app.use(express.json());

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// API Routes
app.post('/api/v1/products', async function(request, response) {
  const product = await Product.create(request.body);
  response.send(product);
});

app.get('/api/v1/products', async function(request, response) {
  const products = await Product.findAll();
  response.send(products);
});

app.get('/api/v1/products/:productId', async function(request, response) {
  const product = await Product.findOne({ where: {id: request.params.productId} });
  response.send(product);
});

app.delete('/api/v1/products/:productId', async function(request, response) {
  await Product.destroy({ where: {id: request.params.productId} });
  response.send({message: `deleted ${request.params.productId}`});
});

app.get('*', function(req, res) {
    res.redirect('/api/v1/products');
});

app.set('port', process.env.PORT || 5001);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
