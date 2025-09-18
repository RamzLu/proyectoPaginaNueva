import express from "express";
import cors from "cors";
import { routerPreguntas } from "./router/preguntaRoutes.js";
import { sequelize } from "./config/database.js";

const app = express();

// Middlewares
app.use(cors());

// Rutas
app.use("/api/preguntas", routerPreguntas);
app.use("/uploads", express.static("uploads"));

// Sincronizar BD
sequelize
  .sync()
  .then(() => console.log("📦 BD conectada"))
  .catch((err) => console.error("❌ Error BD:", err));

export default app;
