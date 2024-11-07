const rate_limit_options = {
  windowMs: 60 * 60 * 1000,
  max: 200,
  message: "Too many requests 😰, please try again after an hour",
};

module.exports = { rate_limit_options };
