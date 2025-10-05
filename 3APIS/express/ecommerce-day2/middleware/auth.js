exports.userAuth = (req, res, next) => !req.headers.authorization || req.headers.authorization !== 'user'
  ? res.status(401).json({ error: "Auth requise" })
  : next();

exports.adminAuth = (req, res, next) => !req.headers.authorization || req.headers.authorization !== 'admin'
  ? res.status(403).json({ error: "Admin requis" })
  : next();