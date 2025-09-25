import Perfil from '../models/perfil.model.js';

export const crearPerfil = async (req, res) => {
    try {
        const {
            usuario, nombre, email, compania,
            twitter, facebook, google, linkedin, instagram,
            notifica_comentario, notifica_respuesta, notifica_seguir,
            notifica_noticias, notifica_actualizaciones, notifica_blog
        } = req.body;
        let perfil = await Perfil.findOne();
        if (perfil) {
            Object.assign(perfil, {
                usuario, nombre, email, compania,
                twitter, facebook, google, linkedin, instagram,
                notifica_comentario, notifica_respuesta, notifica_seguir,
                notifica_noticias, notifica_actualizaciones, notifica_blog
            });
            await perfil.save();
            res.json(perfil);
        } else {
            const nuevoPerfil = await Perfil.create({
                usuario, nombre, email, compania,
                twitter, facebook, google, linkedin, instagram,
                notifica_comentario, notifica_respuesta, notifica_seguir,
                notifica_noticias, notifica_actualizaciones, notifica_blog
            });
            res.json(nuevoPerfil);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar el perfil' });
    }
};

export const obtenerPerfil = async (req, res) => {
    try {
        const perfil = await Perfil.findOne();
        res.json(perfil);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el perfil' });
    }
};

export const actualizarPerfil = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            usuario, nombre, email, compania,
            twitter, facebook, google, linkedin, instagram,
            notifica_comentario, notifica_respuesta, notifica_seguir,
            notifica_noticias, notifica_actualizaciones, notifica_blog
        } = req.body;

        const perfil = await Perfil.findByPk(id); 

        if (!perfil) {
            return res.status(404).json({ error: 'Perfil no encontrado' });
        }

        // Actualizar solo los campos que vienen en el request
        const camposActualizables = {
            usuario, nombre, email, compania,
            twitter, facebook, google, linkedin, instagram,
            notifica_comentario, notifica_respuesta, notifica_seguir,
            notifica_noticias, notifica_actualizaciones, notifica_blog
        };

        // Remover campos undefined o null
        Object.keys(camposActualizables).forEach(key => {
            if (camposActualizables[key] !== undefined && camposActualizables[key] !== null) {
                perfil[key] = camposActualizables[key];
            }
        });

        await perfil.save();
        res.json(perfil);

    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
};