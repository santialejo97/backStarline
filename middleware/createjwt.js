const jwt = require("jsonwebtoken");

const createJwt = (id, email) => {
  const payload = {
    uuid: id,
    email,
  };

  return jwt.sign(payload, process.env.JWTKEYSECRET, { expiresIn: "24h" });
};

module.exports = { createJwt };
