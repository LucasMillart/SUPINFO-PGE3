const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require("./routes/userRoutes");
const { userAuth } = require("./middleware/auth");

app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) =>
{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, user-id');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  req.method === 'OPTIONS' ? res.sendStatus(200) : next();
});


app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);

// Gestion cas d'erreur
app.use((req, res) =>
{
  res.status(404).send(`
    <h1>Page non trouvé :)</h1>
    `
  )
})

app.listen(3000, () => console.log('Server running on port 3000'));