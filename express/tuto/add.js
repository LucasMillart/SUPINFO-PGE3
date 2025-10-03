const { createTodo } = require('./controllers/todoController.js');

const [, , ...args] = process.argv;
const todo = args.join(' ');

if (!todo)
{
  console.log("❌ Tu dois entrer un texte.");
  process.exit(1);
}

createTodo(todo);
console.log(`✅ Todo ajouté : "${todo}"`);
