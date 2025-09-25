import { Router } from 'express';
import { crearPerfil, obtenerPerfil , actualizarPerfil} from '../controllers/perfil.controller.js';

const router = Router();

router.post('/api/perfil', crearPerfil);
router.get('/api/perfil', obtenerPerfil);
router.put('/api/perfil/:id', actualizarPerfil);

export default router;