import { Pregunta } from "../models/preguntas.model.js";

export const getPreguntas = async (req, res) => {
  try {
    const preguntas = await Pregunta.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(preguntas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener preguntas" });
  }
};

export const createPregunta = async (req, res) => {
  try {
    const { descripcion, tema } = req.body;
    if (!descripcion || !tema) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    const nuevaPregunta = await Pregunta.create({ descripcion, tema });
    res.status(201).json(nuevaPregunta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar la pregunta" });
  }
};
