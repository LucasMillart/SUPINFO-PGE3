const { client } = require('../config/database');

exports.createUser = async (req, res) =>
{
  const { _id } = req.body;
  if (!_id) return res.status(400).json({ error: 'Champ _id requis' });

  try
  {
    await client.connect();
    const db = client.db("ecommerce");
    const users = db.collection("users");

    const existing = await users.findOne({ _id });
    if (existing) return res.status(409).json({ error: 'Utilisateur déjà existant' });

    const newUser = { _id, createdAt: new Date() };
    await users.insertOne(newUser);
    res.status(201).json(newUser);
  } catch (err)
  {
    console.error('Erreur création utilisateur :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  } finally
  {
    await client.close();
  }
};

exports.getUser = async (req, res) =>
{
  const userId = req.headers['user-id'];
  if (!userId) return res.status(400).json({ error: 'Header userId requis' });

  try
  {
    await client.connect();
    const db = client.db("ecommerce");
    const users = db.collection("users");

    const user = await users.findOne({ _id: userId });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    res.status(200).json(user);
  } catch (err)
  {
    console.error('Erreur récupération utilisateur :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  } finally
  {
    await client.close();
    console.log("connecté");
  }
};

exports.getAllUsers = async (req, res) =>
{
  try
  {
    await client.connect();
    const db = client.db("ecommerce");
    const users = db.collection("users");

    const allUsers = await users.find({}).toArray();
    res.status(200).json(allUsers);
  } catch (err)
  {
    console.error('Erreur récupération utilisateurs :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  } finally
  {
    await client.close();
  }
};
