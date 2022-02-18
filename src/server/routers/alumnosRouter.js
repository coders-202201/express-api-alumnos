const express = require("express");
const {
  getAllAlumnos,
  getAlumno,
} = require("../controllers/alumnosControllers");

const router = express.Router();

router.get("/all", getAllAlumnos);
router.get("/alumno/:id", getAlumno);

module.exports = router;
