import { perfilModel } from "../models/perfil.model.js";

export const createPerfil = async (req, res) => {
  try {
    const {
      usuario,
      nombre,
      email,
      compania,
      bio,
      cumple,
      pais,
      telefono,
      website,
      twitter,
      facebook,
      google,
      linkedin,
      instagram,
    } = req.body;


  } catch (error) {}
};


export const getAllPerfil = async (req, res) => {

}

