import { parseArgs } from 'node:util';

const [, , operation, ...args] = process.argv;
const numbers = args.map(Number);

console.log(operation)
console.log(numbers)

export function fibonacci(n)
{
  let fibo = [0, 1];
  for (let i = 2; i <= n; i++)
  {
    fibo.push(fibo[i - 2] + fibo[i - 1])
  }
  return fibo[n];
}

export function add(nums)
{
  return nums.reduce((a, b) => a + b);
}

export function divide(nums)
{
  return nums.reduce((a, b) => a / b);
}

const operations = { add, divide };

console.log(operations[operation](numbers))