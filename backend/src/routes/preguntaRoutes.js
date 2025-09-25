import { Router } from "express";
import multer from "multer";
import {
  getPreguntas,
  createPregunta,
  updatePregunta,
  deletePregunta,
} from "../controllers/preguntas.controller.js";
import { upload } from "../config/multer.js";

export const routerPreguntas = Router();

routerPreguntas.get("/", getPreguntas);
routerPreguntas.post("/", upload.single("imagen"), createPregunta);
routerPreguntas.put("/:id", updatePregunta);
routerPreguntas.delete("/:id", deletePregunta);
