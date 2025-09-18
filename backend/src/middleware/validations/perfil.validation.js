import { perfilModel } from "../../models/perfil.model.js";
import { body } from express-validator;

export const validacionPerfil = [
    body("usuario")
    .isString().withMessage("El usuario debe ser un string"),
   
]



