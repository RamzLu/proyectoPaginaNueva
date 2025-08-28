import { Router } from "express";
import {
  getPreguntas,
  createPregunta,
} from "../controllers/preguntas.controller.js";

export const routerPreguntas = Router();

routerPreguntas.get("/", getPreguntas);
routerPreguntas.post("/", createPregunta);
