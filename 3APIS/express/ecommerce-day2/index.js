const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { userAuth } = require("./middleware/auth");
const logger = require("./middleware/test");

app.use(express.json());
app.use(express.static('public'));

app.use(logger);

app.use((req, res, next) =>
{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, user-id');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  req.method === 'OPTIONS' ? res.sendStatus(200) : next();
});

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api', userAuth);

app.listen(3000, () => console.log('Server running on port 3000'));