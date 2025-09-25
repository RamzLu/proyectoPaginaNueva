import { Router } from "express";
import {
  getRespuestas,
  createRespuesta,
} from "../controllers/respuestas.controller.js";

export const routerRespuestas = Router();

routerRespuestas.get("/:preguntaId", getRespuestas);
routerRespuestas.post("/:preguntaId", createRespuesta);
