const bcrypt = require("bcrypt");

function encodePassword(req, res, next) {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 10);
  req.body = user;
  next();
}

module.exports = encodePassword;
