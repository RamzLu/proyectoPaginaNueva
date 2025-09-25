import express from "express";
import perfilRoutes from "./src/routes/perfil.routes.js";
import { initDB } from "./src/config/database.js";
import { routerPreguntas } from "./src/routes/preguntaRoutes.js";
import { routerRespuestas } from "./src/routes/respuestasRouters.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use(perfilRoutes);
app.use("/api/preguntas", routerPreguntas);
app.use("/api/respuestas", routerRespuestas); // <- Añade las nuevas rutas
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
  });
});
