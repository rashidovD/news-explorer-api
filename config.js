const { PORT = 3000, DB = 'newsdb', JWT_SECRET = 'JWT_SECRET' } = process.env;

module.exports = {
  PORT,
  DB,
  JWT_SECRET,
};
