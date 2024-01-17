import { Request, Response } from "express";
import Student from "../models/Student";
import log4js from "../../src/logger";

const logger = log4js.getLogger("file");

class StudentController {
  static async getAllStudents(req: Request, res: Response) {
    try {
      const { name, age, email } = req.query;
      const filter: any = {};
      if (name) {
        filter.name = name;
      }
      if (age) {
        filter.age = age;
      }
      if (email) {
        filter.email = email;
      }
      const students = await Student.find(filter);
      logger.info("Students were found");
      res.json(students);
    } catch (error) {
      logger.error("Error finding students: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getStudentById(req: Request, res: Response) {
    const studentId = req.params.id;
    try {
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      logger.info(`Student ${studentId} found`);
      res.json(student);
    } catch (error) {
      logger.error("Error finding student by id: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async createStudent(req: Request, res: Response) {
    const { name, age, email } = req.body;
    try {
      const newStudent = await Student.create({
        name,
        age,
        email,
      });
      logger.info("Student created successfully");
      res.json(newStudent);
    } catch (error) {
      logger.error("Error creating student: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateStudent(req: Request, res: Response) {
    const studentId = req.params.id;
    const { name, age, email } = req.body;
    try {
      const updateStudent = await Student.findByIdAndUpdate(
        studentId,
        { name, age, email },
        { new: true }
      );
      if (!updateStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      logger.info(`Student ${studentId} updated successfully`);
      res.json(updateStudent);
    } catch (error) {
      logger.error("Error updating student: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async deleteStudent(req: Request, res: Response) {
    const studentId = req.params.id;
    try {
      const deletedStudent = await Student.findByIdAndDelete(studentId);
      if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      logger.info(`Student ${studentId} deleted successfully`);
      res.json({ messsage: "Student deleted successfully" });
    } catch (error) {
      logger.error("Error deleting student: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default StudentController;
