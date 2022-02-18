const Alumno = require("../../database/models/Alumno");

const getAllAlumnos = async (req, res) => {
  const alumnos = await Alumno.find();
  res.json({ alumnos });
};

const getAlumno = async (req, res, next) => {
  const { id } = req.params;
  try {
    const alumno = await Alumno.findById(id);
    if (alumno) {
      res.json(alumno);
    } else {
      const error = new Error("Alumno not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

module.exports = {
  getAllAlumnos,
  getAlumno,
};
