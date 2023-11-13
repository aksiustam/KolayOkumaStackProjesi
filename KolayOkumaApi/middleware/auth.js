const checkIsInRole =
  (...roles) =>
  (req, res, next) => {
    const hasRole = roles.find((role) => req.user.role === role);

    if (!hasRole) {
      return res.sendStatus(401).end();
    }
    return next();
  };

module.exports = { checkIsInRole };
