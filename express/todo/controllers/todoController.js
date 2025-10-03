const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');

const TODOS_FILE = path.join(__dirname, "../todos.json");

exports.getTodos = (req, res) =>
{
  const data = fs.readFileSync(TODOS_FILE);
  const todos = JSON.parse(data);
  res.send(todos);
};

exports.createTodo = (req, res) =>
{
  const data = fs.readFileSync(TODOS_FILE);
  const todos = JSON.parse(data);

  const newTodo = {
    id: Date.now(),
    name: req.body.name,
    date: req.body.date
  };

  todos.push(newTodo);
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos))
  res.status(201).json(newTodo);
};

exports.deleteTodo = (req, res) =>
{
  const data = fs.readFileSync(TODOS_FILE)
  let todos = JSON.parse(data);

  const id = parseInt(req.params.id);
  const initialLength = todos.length;

  todos = todos.filter(todo => (todo.id !== id));

  if (initialLength === todos.length)
  {
    res.send("Pas trouvé");
  }
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos))
  res.status(200).json({ message: "Effacé" })
}

exports.updateTodo = (req, res) =>
{
  const data = fs.readFileSync(TODOS_FILE);
  let todos = JSON.parse(data);

  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => (todo.id === id));

  if (todoIndex === -1)
  {
    return res.status(404).json({ message: "Todo non trouvée" });
  }

  todos[todoIndex].name = req.body.name;
  todos[todoIndex].date = req.body.date;

  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos));
  res.status(200).json({ message: "update" });

}