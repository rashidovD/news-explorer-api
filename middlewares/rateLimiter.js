const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMs: 15 * 60 * 100,
  max: 100,
});

module.exports = limiter;
