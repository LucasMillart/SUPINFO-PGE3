export function fibonacci(n)
{
  let fibo = [0, 1];
  for (let i = 2; i <= n; i++)
  {
    fibo.push(fibo[i - 2] + fibo[i - 1])
  }
  return fibo[n];
}

export function add(a, b)
{
  return a + b;
}

export function divide(a, b)
{
  return a / b;
}

console.log(fibonacci(0))
console.log(fibonacci(1))
console.log(fibonacci(2))
console.log(fibonacci(3))
console.log(fibonacci(4))
console.log(fibonacci(5))