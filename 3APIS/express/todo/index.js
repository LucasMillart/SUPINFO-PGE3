const express = require('express');
const app = express();
const todosRoutes = require("./routers/todos");

app.use(express.json());
app.use(express.static('public'));
app.use("/todos", todosRoutes);

app.listen(3000, () => console.log("Serveur lancé sur le port 3000"));