const store = require('../models/store');

exports.getAllProducts = (req, res) => res.json(store.products);

exports.getProductById = (req, res) =>
{
  const product = store.products.find(p => p.id === parseInt(req.params.id));
  !product ? res.status(404).json({ error: "Non trouvé" }) : res.json(product);
};

exports.createProduct = (req, res) =>
{
  const product = {
    id: store.products.length + 1,
    ...req.body
  };
  store.products.push(product);
  res.status(201).json(product);
};

exports.updateProduct = (req, res) =>
{
  const product = store.products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Non trouvé" });
  Object.assign(product, req.body);
  res.json(product);
};

exports.deleteProduct = (req, res) =>
{
  const index = store.products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Non trouvé" });
  store.products.splice(index, 1);
  res.status(204).send();
};