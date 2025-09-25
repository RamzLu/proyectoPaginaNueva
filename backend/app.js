import express from 'express';
import perfilRoutes from './src/routes/perfil.routes.js';
import { initDB } from './src/config/database.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use(perfilRoutes);

const PORT = process.env.PORT || 3000;

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
    });
});
