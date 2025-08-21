import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const perfilModel = sequelize.define("perfil", {
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    compania: {
        type: DataTypes.STRING
    },
    bio: {
        type: DataTypes.TEXT
    },
    cumple: {
        type: DataTypes.STRING
    },
    pais: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    website: {
        type: DataTypes.STRING
    },
    twitter: {
        type: DataTypes.STRING
    },
    facebook: {
        type: DataTypes.STRING
    },
    google: {
        type: DataTypes.STRING
    },
    linkedin: {
        type: DataTypes.STRING
    },
    instagram: {
        type: DataTypes.STRING
    }
});