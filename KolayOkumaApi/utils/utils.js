const jwt = require("jsonwebtoken");
const login = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, { session: false }, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve(signToken(user));
    });
  });
};
const signToken = (user) => {
  const data = {
    id: user._id,
    name: user.name,
  };
  return jwt.sign({ data: data }, process.env.JWT_SECRET);
};
module.exports = { signToken, login };
