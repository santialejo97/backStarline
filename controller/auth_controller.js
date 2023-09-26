const express = require("express");
const { db } = require("../db/db_postgres.js");
const bcrypt = require("bcrypt");
const { createJwt } = require("../middleware/createjwt.js");

const register = async (req = express.request, res = express.response) => {
  const body = req.body;
  try {
    // ..................................................... //
    //   * Inicio Consulta de BD para validar que no exista el usuario por email
    const query = {
      text: "SELECT * FROM usuarios where email = $1::text",
      values: [body.email],
    };
    const data = await db.query(query);
    if (data.rows.length != 0) {
      res.status(400).json({
        ok: false,
        msg: "El usuario ya existe en DB",
      });
    }
    //   * Final  Consulta de BD para validar que no exista el usuario por email
    // ..................................................... //
    //   * Inicio Se codifica la contraseña del usuario
    const { password } = body;
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(password, salt);
    console.log(password, body.password);
    //   * Final Se codifica la contraseña del usuario
    // ..................................................... //
    //   * Inicio Creacion de usuario en BD
    const queryInserte = {
      text: "INSERT INTO usuarios(fullname, password, email, created, updated) VALUES($1, $2, $3, $4, $5)",
      values: [body.name, body.password, body.email, new Date(), new Date()],
    };
    await db.query(queryInserte);
    //   * Final Creacion de usuario en BD
    // ..................................................... //
    //   * Respuesta de la peticion
    const usuario = await db.query(query);
    delete usuario.password;
    res.status(200).json({
      ok: true,
      msg: "El usuario fue registrado",
      usuario: usuario.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Surgio un error interno en el servido validar logs",
    });
  }
};

const login = async (req = express.request, res = express.response) => {
  const body = req.body;
  try {
    // ..................................................... //
    //   * Inicio Consulta de BD para validar que exista el usuario por email
    const query = {
      text: "SELECT * FROM usuarios where email = $1::text",
      values: [body.email],
    };
    const data = await db.query(query);
    if (data.rows.length == 0) {
      res.status(400).json({
        ok: false,
        msg: "Validar password o email",
      });
    }
    const usuario = data.rows[0];
    //   * Final  Consulta de BD para validar que exista el usuario por email
    // ..................................................... //
    //   * Inicio Validar la password del usuario
    const validPassword = bcrypt.compareSync(body.password, usuario.password);
    if (!validPassword) {
      res.status(404).json({
        ok: false,
        msg: "Validar password o email",
      });
    }
    const token = createJwt(usuario.id, usuario.email);
    delete usuario.password;
    res.status(200).json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Surgio un error interno en el servido validar logs",
    });
  }
};

const newJwt = async (req = express.request, res = express.response) => {
  const { id, email } = req.body;
  try {
    const token = createJwt(id, email);
    res.status(200).json({
      ok: true,
      msg: "Token validado",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Surgio un error interno en el servido validar logs",
    });
  }
};

module.exports = {
  register,
  login,
  newJwt,
};
