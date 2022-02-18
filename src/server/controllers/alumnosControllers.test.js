const Alumno = require("../../database/models/Alumno");
const { getAllAlumnos, getAlumno } = require("./alumnosControllers");

jest.mock("../../database/models/Alumno");

describe("Given an getAllAlumnos controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a response", () => {
    test("Then it should call method json with a list of alumnos of the received response", async () => {
      const res = {
        json: jest.fn(),
      };
      const alumnos = [
        {
          id: "01010101010101",
          name: "Luis",
          age: 30,
        },
      ];
      Alumno.find = jest.fn().mockResolvedValue(alumnos);

      await getAllAlumnos(null, res);

      expect(Alumno.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ alumnos });
    });
  });
});

describe("Given a getAlumno controller", () => {
  describe("When it receives a response", () => {
    test("Then if the alumno exists it should call method json with the alumno", async () => {
      const req = {
        params: {
          id: "blablabla",
        },
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      const alumno = {
        id: "blablabla",
        name: "Marta",
        age: 32,
      };
      Alumno.findById = jest.fn().mockResolvedValue(alumno);

      await getAlumno(req, res, next);

      expect(res.json).toHaveBeenCalledWith(alumno);
      expect(next).not.toHaveBeenCalled();
    });

    test("Then if the alumno doesn't exist it should call next with a not found error", async () => {
      const req = {
        params: {
          id: "blablabla",
        },
      };
      const next = jest.fn();
      const error = new Error("Alumno not found");

      Alumno.findById = jest.fn().mockResolvedValue(null);

      await getAlumno(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    test("Then if the id format is invalid it should call next", async () => {
      const req = {
        params: {
          id: "blablabla",
        },
      };
      const next = jest.fn();
      const error = new Error("Invalid id");

      Alumno.findById = jest.fn().mockRejectedValue(error);

      await getAlumno(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
