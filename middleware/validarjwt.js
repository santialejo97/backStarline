const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { db } = require("../db/db_postgres.js");

const validarJwt = async (req = request, res = response, next) => {
  const token = req.headers.token;
  try {
    const payload = jwt.verify(token, process.env.JWTKEYSECRET);
    const query = {
      text: "SELECT * FROM usuarios where email = $1::text and id = $2::uuid",
      values: [payload.email, payload.uuid],
    };
    const data = await db.query(query);
    if (data.rows.length == 0) {
      res.status(404).json({
        ok: false,
        msg: "El usuario no existe en la BD",
      });
    }
    req.body.email = payload.email;
    req.body.id = payload.uuid;
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({
      ok: false,
      msg: "Validar el envio del token",
    });
  }
};

module.exports = {
  validarJwt,
};
