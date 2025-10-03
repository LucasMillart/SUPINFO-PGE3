const { deleteByName } = require("./controllers/todoController.js");

const [, , ...args] = process.argv;
const todo = args.join('');

if (!todo)
{
  process.exit(1)
}

deleteByName(todo);
console.log(`Todo enlevé : "${todo}"`);

