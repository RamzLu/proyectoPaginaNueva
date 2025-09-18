import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Perfil = sequelize.define('Perfil', {
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    compania: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Perfil;