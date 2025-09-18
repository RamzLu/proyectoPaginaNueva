import { Router } from 'express';
import { crearPerfil } from '../controllers/perfil.controller.js';

const router = Router();

router.post('/api/perfil', crearPerfil);

export default router;