require('dotenv').config();

module.exports = function logger(req, res, next)
{
  console.log('Environment variables loaded:');
  console.log('PORT:', process.env.PORT);
  console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Connected' : 'Not found');
  next();
};