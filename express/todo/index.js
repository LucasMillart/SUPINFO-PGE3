const express = require('express')
const app = express()
const path = require('path')
const port = 3000;
const todosRoutes = require("./routes/todo.js")

app.use(express.json());
app.use('/todos', todosRoutes)

app.get('/', (req, res) =>
{
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, () =>
{
  console.log("Serveur lancé sur http://localhost:3000")
})