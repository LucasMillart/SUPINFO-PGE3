const store = require('../models/store');

exports.getCart = (req, res) =>
{
  const userId = req.headers['user-id']; // Simuler l'authentification
  if (!userId) return res.status(401).json({ message: "User ID requis" });

  const cart = store.carts.get(userId) || [];
  res.json(cart);
};

exports.addToCart = (req, res) =>
{
  const userId = req.headers['user-id'];
  if (!userId) return res.status(401).json({ message: "User ID requis" });

  const { productId, quantity = 1 } = req.body;
  const product = store.products.find(p => p.id === parseInt(productId));

  if (!product) return res.status(404).json({ message: "Produit non trouvé" });
  if (product.stock < quantity) return res.status(400).json({ message: "Stock insuffisant" });

  const cart = store.carts.get(userId) || [];
  const cartItem = cart.find(item => item.productId === productId);

  if (cartItem)
  {
    cartItem.quantity += quantity;
  } else
  {
    cart.push({ productId, quantity, name: product.name, price: product.price });
  }

  product.stock -= quantity;
  store.carts.set(userId, cart);

  res.json(cart);
};

exports.removeFromCart = (req, res) =>
{
  const userId = req.headers['user-id'];
  if (!userId) return res.status(401).json({ message: "User ID requis" });

  const { productId } = req.params;
  const cart = store.carts.get(userId);

  if (!cart) return res.status(404).json({ message: "Panier non trouvé" });

  const itemIndex = cart.findIndex(item => item.productId === parseInt(productId));
  if (itemIndex === -1) return res.status(404).json({ message: "Produit non trouvé dans le panier" });

  const item = cart[itemIndex];
  const product = store.products.find(p => p.id === parseInt(productId));
  product.stock += item.quantity;

  cart.splice(itemIndex, 1);
  res.json(cart);
};