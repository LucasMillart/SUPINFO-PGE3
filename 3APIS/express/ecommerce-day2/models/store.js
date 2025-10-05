const store = {
  products: [
    { id: 1, name: "iPhone 15", price: 999, stock: 10 },
    { id: 2, name: "MacBook Pro", price: 1499, stock: 5 }
  ],
  carts: new Map()
};

module.exports = store;