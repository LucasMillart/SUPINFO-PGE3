const [, , sauce, size, ...toppings] = process.argv

if (sauce != "tomate" && sauce != "cream")
{
  console.log("Tomate ou cream");
  process.exit(1)

}

console.log(`🍕 Pizza commandée :`);
console.log(`- Sauce : ${sauce}`);
console.log(`- Taille : ${size}`);
console.log(`- Toppings : ${toppings.join(', ')}`);
