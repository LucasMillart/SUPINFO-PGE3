const express = require('express');
const app = express();

app.get('/', (req, res) =>
{
  res.send("Bienvenue");
});

app.get('/contact', (req, res) =>
{
  res.send("Contact!");
})

app.listen(3000, () =>
{
  console.log("le serveur tourne sur localhost:3000")
})