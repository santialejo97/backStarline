const express = require("express");
const { db } = require("../db/db_postgres.js");

const services = async (req = express.request, res = express.response) => {
  try {
    const query = {
      text: "SELECT * FROM servicios ",
    };
    const data = await db.query(query);
    res.status(200).json({
      ok: true,
      data: data.rows,
    });
    console.log(data.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Surgio un error interno en el servido validar logs",
    });
  }
};

const postServices = async (req = express.request, res = express.response) => {
  const body = req.body;
  try {
    const queryInserte = {
      text: "INSERT INTO servicios(nameservice, descripcion, precio, created_service, updated_service) VALUES($1, $2, $3, $4, $5)",
      values: [
        body.name,
        body.descripcion,
        body.precio,
        new Date(),
        new Date(),
      ],
    };
    await db.query(queryInserte);
    const query = {
      text: "SELECT * FROM servicios where nameservice = $1::text",
      values: [body.name],
    };
    const data = await db.query(query);
    res.status(200).json({
      ok: true,
      service: data.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Surgio un error interno en el servido validar logs",
    });
  }
};

const getService = async (req = express.request, res = express.response) => {
  const { id } = req.params;
  try {
    const query = {
      text: "SELECT * FROM servicios where id = $1::uuid",
      values: [id],
    };
    const data = await db.query(query);

    if (data.rows.length == 0) {
      res.status(404).json({
        ok: false,
        msg: `El servicio con el id ${id} no se encuentra`,
      });
    }
    res.status(200).json({
      ok: true,
      servicio: data.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Surgio un error interno en el servido validar logs",
    });
  }
};

const updateServices = async (
  req = express.request,
  res = express.response
) => {
  const { id } = req.params;
  const query = {
    text: "SELECT * FROM servicios where id = $1::uuid",
    values: [id],
  };
  const data = await db.query(query);

  if (data.rows.length == 0) {
    res.status(404).json({
      ok: false,
      msg: `El servicio con el id ${id} no se encuentra`,
    });
  }
  ("UPDATE nombre_de_tabla SET columna1 = nuevo_valor1, columna2 = nuevo_valor2 WHERE condición;");
  const queryInserte = {
    text: "UPDATE servicios SET nameservice = $1, descripcion = $2, precio = $3, isactive = $4, created_service = $5, updated_service = $6 WHERE id = $1::uuid",
    values: [
      id,
      body.name,
      body.descripcion,
      body.precio,
      body.isactive,
      data.rows[0].created_service,
      new Date(),
    ],
  };
  const dataUpdate = await db.query(queryInserte);
  console.log(dataUpdate);
};

module.exports = {
  services,
  postServices,
  getService,
  updateServices,
};
