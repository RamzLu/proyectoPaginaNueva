import { Respuesta } from "../models/pregunta.model.js";
import { Pregunta } from "../models/preguntas.model.js";

export const getRespuestas = async (req, res) => {
  try {
    const { preguntaId } = req.params;
    const respuestas = await Respuesta.findAll({
      where: { PreguntaId: preguntaId },
      order: [["createdAt", "ASC"]],
    });
    res.json(respuestas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener respuestas" });
  }
};

export const createRespuesta = async (req, res) => {
  try {
    const { preguntaId } = req.params;
    const { contenido } = req.body;

    // Esta lógica ya es correcta
    const nueva = await Respuesta.create({
      contenido,
      PreguntaId: preguntaId,
    });

    res.status(201).json(nueva);
  } catch (error) {
    console.error("Error al crear la respuesta:", error);
    res.status(500).json({ error: "Error al crear la respuesta" });
  }
};
