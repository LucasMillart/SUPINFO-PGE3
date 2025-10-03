const express = require('express');
const router = express.Router();
const {
  createTodo,
  readTodos,
  deleteTodo,
  clearTodos
} = require('../controllers/todoController');

// Créer un todo
router.post('/', (req, res) =>
{
  const { text } = req.body;
  if (!text) return res.status(400).send("Le champ 'text' est requis.");
  createTodo(text);
  res.redirect('/index');
  res.send(`✅ Todo ajouté : "${text}"`);
});

// Lire tous les todos
router.get('/', (req, res) =>
{
  const todos = readTodos();
  res.json(todos);
});

// Supprimer un todo par index
router.delete('/:id', (req, res) =>
{
  const id = parseInt(req.params.id);
  const result = deleteTodo(id);
  if (!result) return res.status(404).send("Todo introuvable.");
  res.send(`🗑️ Supprimé : "${result}"`);
});

// Supprimer tous les todos
router.delete('/', (req, res) =>
{
  clearTodos();
  res.send("🧼 Tous les todos ont été supprimés.");
});

module.exports = router;
