const { validationResult } = require("express-validator");
const { request, response } = require("express");

const validarCampos = (req = request, res = response, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(402).json({
      ok: false,
      err: errores.mapped(),
    });
  }
  next();
};

module.exports = {
  validarCampos,
};
