import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Pregunta } from "./preguntas.model.js";

export const Respuesta = sequelize.define("Respuesta", {
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Pregunta.hasMany(Respuesta, {
  foreignKey: "PreguntaId",
  as: "respuestas",
});
Respuesta.belongsTo(Pregunta, {
  foreignKey: "PreguntaId",
});
