const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  createContact,
  getContacts,
  getContactById,
  putContactById,
} = require("../controller/contact_controller");
const { validarCampos } = require("../middleware/validarCampo");

router.post(
  "/create",
  [
    check("email", "tiene que se un email valido").isEmail().not().isEmpty(),
    check("phone", "Es obligatorio es campo de telefono")
      .isString()
      .not()
      .isEmpty(),
    check("description", "Es obligatorio es campo del descripcion")
      .isString()
      .not()
      .isEmpty(),
    check("name", "Es obligatorio es campo del nombre")
      .isString()
      .not()
      .isEmpty(),
    validarCampos,
  ],
  createContact
);
router.get("/list", getContacts);
router.get("/:id", getContactById);
router.put("/:id", putContactById);

module.exports = router;
