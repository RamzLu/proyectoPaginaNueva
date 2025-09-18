import Perfil from '../models/perfil.model.js';

export const crearPerfil = async (req, res) => {
    try {
        const { usuario, nombre, email, compania } = req.body;
        const nuevoPerfil = await Perfil.create({ usuario, nombre, email, compania });
        res.json(nuevoPerfil);
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar el perfil' });
    }
};


