const express = require("express");
const authController = require("../controller/auth_controller");
const router = express.Router();
const { check } = require("express-validator");
const { validarJwt } = require("../middleware/validarjwt");

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
    check("password").isLength({ min: 8 }),
  ],
  authController.login
);

router.get("/newtoken", validarJwt, authController.newJwt);

module.exports = router;
