import { Pregunta } from "../models/preguntas.model.js";

export const getPreguntas = async (req, res) => {
  try {
    const preguntas = await Pregunta.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(preguntas);
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar la pregunta" });
  }
};

export const updatePregunta = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, tema } = req.body;

    const pregunta = await Pregunta.findByPk(id);
    if (!pregunta) {
      return res.status(404).json({ error: "Pregunta no encontrada" });
    }

    pregunta.descripcion = descripcion || pregunta.descripcion;
    pregunta.tema = tema || pregunta.tema;
    await pregunta.save();

    res.json(pregunta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la pregunta" });
  }
};

export const deletePregunta = async (req, res) => {
  try {
    const { id } = req.params;

    const pregunta = await Pregunta.findByPk(id);
    if (!pregunta) {
      return res.status(404).json({ error: "Pregunta no encontrada" });
    }

    await pregunta.destroy();
    res.json({ message: "Pregunta eliminada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la pregunta" });
  }
};
