const AsyncCatcher = (fn) => (req, res, next) => fn(req, res, next).catch(next);

module.exports = { AsyncCatcher };
