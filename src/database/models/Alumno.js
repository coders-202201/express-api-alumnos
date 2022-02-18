const { model, Schema } = require("mongoose");

const AlumnoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    length: 9,
    unique: true,
  },
  age: Number,
  pets: [
    {
      type: String,
    },
  ],
});

const Alumno = model("Alumno", AlumnoSchema, "alumnos");

module.exports = Alumno;
