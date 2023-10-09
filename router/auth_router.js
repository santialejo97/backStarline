const express = require("express");
const authController = require("../controller/auth_controller");
const router = express.Router();
const { check } = require("express-validator");
const { validarJwt } = require("../middleware/validarjwt");
const { validarCampos } = require("../middleware/validarCampo");

router.post(
  "/register",
  [
    check("email", "Tiene que ser un email Valido").isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  authController.register
);
router.post(
  "/login",
  [
    check("email", "Tiene que ser un email Valido").isEmail(),
    check("email", "es obligatorio el email").not().isEmpty(),
    check("password", "Tiene que ser minimo 8 caracteres ").isLength({
      min: 8,
    }),
    check("password", "es obligatorio password").not().isEmpty(),
    validarCampos,
  ],
  authController.login
);

router.get("/newtoken", validarJwt, authController.newJwt);

module.exports = router;
