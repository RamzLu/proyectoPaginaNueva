import express from "express";
import cors from "cors";
import { routerPreguntas } from "./router/preguntaRoutes.js";
import { sequelize } from "./config/database.js";
import { routerRespuestas } from "./router/respuestasRouters.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // <- Asegúrate de tener este middleware para parsear JSON

// Rutas
app.use("/api/preguntas", routerPreguntas);
app.use("/api/respuestas", routerRespuestas); // <- Añade las nuevas rutas
app.use("/uploads", express.static("uploads"));

// Sincronizar BD
sequelize
  .sync()
  .then(() => console.log("📦 BD conectada"))
  .catch((err) => console.error("❌ Error BD:", err));

export default app;
