const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/todos.json');
let todos = require(dataPath);

exports.getTodos = (req, res) =>
{
  res.json(todos);
};

exports.addTodo = (req, res) =>
{
  const { task, done } = req.body;
  if (!task) return res.status(400).json({ error: 'Le champ "task" est requis' });

  const newTodo = {
    id: Date.now(),
    task,
    done: done || false
  };

  todos.push(newTodo);
  fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2));
  res.status(201).json(newTodo);
};

exports.deleteTodo = (req, res) =>
{
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Todo non trouvé' });

  const deleted = todos.splice(index, 1);
  fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2));
  res.json(deleted[0]);
};

exports.updateTodo = (req, res) =>
{
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Todo non trouvé' });

  todos[index] = { ...todos[index], ...req.body };
  fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2));
  res.json(todos[index]);
};
