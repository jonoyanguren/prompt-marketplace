import express from "express";
import multer from "multer";
import { getAll, create, update, getOneById } from "./platform.controller";

const router = express.Router();
// Configurar el almacenamiento de los archivos cargados
const storage = multer.diskStorage({
  destination: "./platformsLogos",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg"); // Nombre del archivo
  },
});

const upload = multer({ storage });

router.get("/", getAll);
router.get("/:id", getOneById);
router.post("/", upload.single("file"), create);
router.put("/:id", update);

export default router;
