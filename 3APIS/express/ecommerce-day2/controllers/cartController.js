const { client } = require('../config/database');

exports.getCart = async (req, res) =>
{
  try
  {
    await client.connect();
    const db = client.db("ecommerce");
    const carts = db.collection("carts");

    const userId = req.headers['user-id'] || req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ message: "User ID requis" });

    const cart = await carts.findOne({ userId });
    console.log(cart)
    res.json(cart.items || []);
  } catch (error)
  {
    console.error('Erreur getCart :', error);
    res.status(500).json({ error: error.message });
  } finally
  {
    await client.close();
  }
};

exports.addToCart = async (req, res) =>
{
  try
  {
    await client.connect();
    const database = client.db("ecommerce");
    const carts = database.collection("carts");
    const products = database.collection("products");

    const userId = req.headers['user-id'];
    if (!userId) return res.status(401).json({ message: "User ID requis" });

    const { productId, quantity = 1 } = req.body;

    // Vérifier le produit
    const product = await products.findOne({ _id: parseInt(productId) });
    if (!product) return res.status(404).json({ message: "Produit non trouvé" });
    if (product.stock < quantity) return res.status(400).json({ message: "Stock insuffisant" });

    // Mettre à jour ou créer le panier
    const result = await carts.findOneAndUpdate(
      { userId },
      {
        $push: {
          items: {
            productId,
            quantity,
            name: product.name,
            price: product.price
          }
        }
      },
      { upsert: true, returnDocument: 'after' }
    );

    // Mettre à jour le stock
    await products.updateOne(
      { _id: parseInt(productId) },
      { $inc: { stock: -quantity } }
    );

    res.json(result.items || []);
  } catch (error)
  {
    res.status(500).json({ error: error.message });
  } finally
  {
    await client.close();
  }
};

exports.removeFromCart = async (req, res) =>
{
  try
  {
    await client.connect();
    const database = client.db("ecommerce");
    const carts = database.collection("carts");
    const products = database.collection("products");

    const userId = req.headers['user-id'];
    if (!userId) return res.status(401).json({ message: "User ID requis" });

    const { productId } = req.params;

    // Trouver le panier et l'item
    const cart = await carts.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Panier non trouvé" });

    const itemToRemove = cart.items.find(item => item.productId === parseInt(productId));
    if (!itemToRemove) return res.status(404).json({ message: "Produit non trouvé dans le panier" });

    // Mettre à jour le stock
    await products.updateOne(
      { _id: parseInt(productId) },
      { $inc: { stock: itemToRemove.quantity } }
    );

    // Supprimer l'item du panier
    const result = await carts.findOneAndUpdate(
      { userId },
      {
        $pull: {
          items: { productId: parseInt(productId) }
        }
      },
      { returnDocument: 'after' }
    );

    res.json(result.items || []);
  } catch (error)
  {
    res.status(500).json({ error: error.message });
  } finally
  {
    await client.close();
  }
};