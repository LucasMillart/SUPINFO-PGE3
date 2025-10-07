const { client } = require("../config/database");

exports.getAllProducts = async (req, res) =>
{
  try
  {
    await client.connect();
    const database = client.db("ecommerce");
    const products = database.collection("products");
    const result = await products.find({}).toArray();
    res.json(result);
  } catch (error)
  {
    res.status(500).json({ error: error.message });
  } finally
  {
    await client.close();
  }
};

exports.getProductById = async (req, res) =>
{
  try
  {
    await client.connect();
    const database = client.db("ecommerce");
    const products = database.collection("products");
    const product = await products.findOne({ _id: parseInt(req.params.id) });
    if (!product)
    {
      return res.status(404).json({ error: "Non trouvé" });
    }
    res.json(product);
  } catch (error)
  {
    res.status(500).json({ error: error.message });
  } finally
  {
    await client.close();
  }
};

exports.createProduct = async (req, res) =>
{
  try
  {
    await client.connect();
    const database = client.db("ecommerce");
    const products = database.collection("products");
    const product = {
      _id: Date.now(), // Génère un ID unique basé sur le timestamp
      ...req.body
    };
    const result = await products.insertOne(product);
    res.status(201).json(product);
  } catch (error)
  {
    res.status(500).json({ error: error.message });
  } finally
  {
    await client.close();
  }
};

exports.updateProduct = async (req, res) =>
{
  try
  {
    await client.connect();
    const database = client.db("ecommerce");
    const products = database.collection("products");
    const result = await products.updateOne(
      { _id: parseInt(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0)
    {
      return res.status(404).json({ error: "Non trouvé" });
    }
    res.json({ message: "Produit mis à jour avec succès" });
  } catch (error)
  {
    res.status(500).json({ error: error.message });
  } finally
  {
    await client.close();
  }
};

exports.deleteProduct = async (req, res) =>
{
  try
  {
    await client.connect();
    const database = client.db("ecommerce");
    const products = database.collection("products");
    const result = await products.deleteOne({ _id: parseInt(req.params.id) });
    if (result.deletedCount === 0)
    {
      return res.status(404).json({ error: "Non trouvé" });
    }
    res.status(204).send();
  } catch (error)
  {
    res.status(500).json({ error: error.message });
  } finally
  {
    await client.close();
  }
};