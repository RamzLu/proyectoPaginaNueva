import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { startDB } from "./src/config/database.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "front")));

const preguntas = [];

app.post("/api/preguntas", (req, res) => {
  const { descripcion, tema } = req.body;

  const nuevaPregunta = { descripcion, tema, fecha: new Date() };
  preguntas.unshift(nuevaPregunta);
  console.log(" > Pregunta guardada:", nuevaPregunta);
  res.status(201).json(nuevaPregunta);

  console.log("   > Tema:", tema);
  console.log("   > Descripción:", descripcion);
  res.status(201).json({ message: "Pregunta recibida con éxito" });
});

app.get("/api/preguntas", (req, res) => {
  res.json(preguntas);
});

app.listen(PORT, async () => {
  await startDB;
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
