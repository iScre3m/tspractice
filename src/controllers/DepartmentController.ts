import { Request, Response } from 'express';
import Department from '../models/Department';
import log4js from '../../src/logger';

const logger = log4js.getLogger('file');

class DepartmentController {
  static async getAllDepartments(req: Request, res: Response) {
    try {
      const { name } = req.query;
      const filter: { name?: string } = {};
      if (typeof name === 'string') {
        filter.name = name;
      }
      const departments = await Department.find(filter).populate('courses');
      logger.info('Departments were found');
      res.json(departments);
    } catch (error) {
      logger.error('Error finding departments', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getDepartmentById(req: Request, res: Response) {
    const departmentId = req.params.id;
    try {
      const department =
        await Department.findById(departmentId).populate('courses');
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
      logger.info(`Department ${departmentId} found`);
      res.json(department);
    } catch (error) {
      logger.error('Error finding department by id: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async createDepartment(req: Request, res: Response) {
    const { name, courses } = req.body;
    try {
      const newDepartment = await Department.create({
        name,
        courses: courses || [],
      });
      logger.info('Department created successfully');
      res.status(201).json(newDepartment);
    } catch (error) {
      logger.error('Error creating department: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateDepartment(req: Request, res: Response) {
    const departmentId = req.params.id;
    const { name, courses } = req.body;
    try {
      const updatedDepartment = await Department.findByIdAndUpdate(
        departmentId,
        { name, courses },
        { new: true }
      ).populate('courses');
      if (!updatedDepartment) {
        return res.status(404).json({ message: 'Department not found' });
      }
      logger.info(`Department ${departmentId} updated successfully`);
      res.json(updatedDepartment);
    } catch (error) {
      logger.error('Error updating department: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteDepartment(req: Request, res: Response) {
    const departmentId = req.params.id;
    try {
      const deletedDepartment =
        await Department.findByIdAndDelete(departmentId);
      if (!deletedDepartment) {
        return res.status(404).json({ message: 'Department not found' });
      }
      logger.info(`Department ${departmentId} deleted successfully`);
      res.json({ message: 'Department deleted successfully' });
    } catch (error) {
      logger.error('Error deleting department: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default DepartmentController;
