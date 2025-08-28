import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Pregunta = sequelize.define("Pregunta", {
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tema: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});
