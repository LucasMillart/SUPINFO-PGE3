import fs from "fs"

const [, , operation, todo] = process.argv

console.log(operation)
console.log(todo)


function read()
{
  const data = fs.readFileSync("todos.json");
  console.log(data.toString());
}

read()