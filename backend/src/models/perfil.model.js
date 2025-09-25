import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Perfil = sequelize.define('Perfil', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, // ← Asegúrate de tener este campo ID
    usuario: DataTypes.STRING,
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    compania: DataTypes.STRING,
    twitter: DataTypes.STRING,
    facebook: DataTypes.STRING,
    google: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    instagram: DataTypes.STRING,
    notifica_comentario: DataTypes.BOOLEAN,
    notifica_respuesta: DataTypes.BOOLEAN,
    notifica_seguir: DataTypes.BOOLEAN,
    notifica_noticias: DataTypes.BOOLEAN,
    notifica_actualizaciones: DataTypes.BOOLEAN,
    notifica_blog: DataTypes.BOOLEAN
});

export default Perfil;