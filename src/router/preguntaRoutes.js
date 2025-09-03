import { Router } from "express";
import {
  getPreguntas,
  createPregunta,
  updatePregunta,
  deletePregunta,
} from "../controllers/preguntas.controller.js";

export const routerPreguntas = Router();

routerPreguntas.get("/", getPreguntas);
routerPreguntas.post("/", createPregunta);
routerPreguntas.put("/:id", updatePregunta);
routerPreguntas.delete("/:id", deletePregunta);
