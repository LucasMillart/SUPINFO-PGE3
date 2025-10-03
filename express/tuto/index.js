const express = require('express');
const path = require('path');
const app = express();
const todoRoutes = require('./routes/todos');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/todos', todoRoutes);

app.get('/index', (req, res) =>
{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/form', (req, res) =>
{
  res.sendFile(path.join(__dirname, 'public/form.html'));
})

app.listen(3000, () =>
{
  console.log("🚀 Serveur lancé sur http://localhost:3000");
});
