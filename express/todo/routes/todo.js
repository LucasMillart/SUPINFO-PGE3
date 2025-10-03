const express = require('express');
const router = express.Router();
const todosControllers = require("../controllers/todoController.js")

router.get("/", todosControllers.getTodos);
router.post("/", todosControllers.createTodo);
router.delete("/:id", todosControllers.deleteTodo);
router.put("/:id", todosControllers.updateTodo);

module.exports = router;