const express = require("express");
const { db } = require("../db/db_postgres.js");

const createContact = async (req = express.request, res = express.response) => {
  const { name, description, email, phone } = req.body;
  try {
    const queryInserte = {
      text: "INSERT INTO contactos(name, phone, description, email, date_created, is_active) VALUES($1, $2, $3, $4, $5, $6)",
      values: [name, phone, description, email, new Date(), false],
    };

    const data = await db.query(queryInserte);
    return res.status(200).json({
      ok: true,
      msg: "Gracias por dejar tu mensajes en cualquier momento te estaremos contactando",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Surgio un error interno en el servidor validar logs",
    });
  }
};

const getContacts = async (req = express.request, res = express.response) => {
  try {
    const query = {
      text: "SELECT * FROM contactos",
    };
    const data = await db.query(query);
    res.status(200).json({
      ok: true,
      data: data.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Surgio un error interno en el servidor validar logs",
    });
  }
};

const getContactById = async (
  req = express.request,
  res = express.response
) => {
  const { id } = req.params;
  try {
    const query = {
      text: "SELECT * FROM contactos where id = $1::uuid",
      values: [id],
    };
    const data = await db.query(query);

    if (data.rows.length == 0) {
      return res.status(404).json({
        ok: false,
        msg: `El contacto con el id ${id} no se encuentra`,
      });
    }
    return res.status(200).json({
      ok: true,
      servicio: data.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Surgio un error interno en el servidor validar logs",
    });
  }
};

const putContactById = async (
  req = express.request,
  res = express.response
) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    const query = {
      text: "SELECT * FROM contactos where id = $1::uuid",
      values: [id],
    };
    const data = await db.query(query);

    if (data.rows.length == 0) {
      return res.status(404).json({
        ok: false,
        msg: `El contacto con el id ${id} no se encuentra`,
      });
    }

    const queryUpdate = {
      text: "UPDATE contactos SET  is_active = $1 WHERE id = $2::uuid",
      values: [isActive, id],
    };
    const dataUpdate = await db.query(queryUpdate);
    return res.status(200).json({
      ok: true,
      msg: "Contacto actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Surgio un error interno en el servidor validar logs",
    });
  }
};

module.exports = {
  createContact,
  getContactById,
  getContacts,
  putContactById,
};
