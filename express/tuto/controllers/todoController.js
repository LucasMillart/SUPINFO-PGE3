const fs = require('fs');
const file = 'todos.json';

// Charger les todos
function loadTodos()
{
  if (!fs.existsSync(file)) fs.writeFileSync(file, '[]');
  return JSON.parse(fs.readFileSync(file));
}

// Sauvegarder les todos
function saveTodos(todos)
{
  fs.writeFileSync(file, JSON.stringify(todos, null, 2));
}

// Créer un todo
function createTodo(text)
{
  const todos = loadTodos();
  todos.push(text);
  saveTodos(todos);
}

// Lire tous les todos
function readTodos()
{
  return loadTodos();
}

// Supprimer un todo par index
function deleteTodo(index)
{
  const todos = loadTodos();
  if (index < 0 || index >= todos.length) return null;
  const removed = todos.splice(index, 1)[0];
  saveTodos(todos);
  return removed;
}

function deleteByName(name)
{
  const todos = loadTodos();
  const index = todos.findIndex(todo => todo === name);
  if (index === -1) return null;
  const removed = todos.splice(index, 1)[0];
  saveTodos(todos);
  return removed;
}


// Supprimer tous les todos
function clearTodos()
{
  saveTodos([]);
}

module.exports = {
  createTodo,
  readTodos,
  deleteTodo,
  deleteByName,
  clearTodos
};
