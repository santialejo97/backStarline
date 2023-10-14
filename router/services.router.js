const express = require("express");
const {
  services,
  postServices,
  getService,
  updateServices,
  deleteService,
} = require("../controller/service_controller");
const router = express.Router();
const { validarJwt } = require("../middleware/validarjwt");

router.get("/listService", validarJwt, services);
router.post("/createService", validarJwt, postServices);
router.get("/getService/:id", validarJwt, getService);
router.put("/updateService/:id", validarJwt, updateServices);
router.delete("/deletService/:id", validarJwt, deleteService);

module.exports = router;
