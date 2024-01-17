import { Request, Response } from 'express';
import Exam from '../models/Exam';
import log4js from '../../src/logger';
import { Types } from 'mongoose';

const logger = log4js.getLogger('file');

class ExamController {
  static async getAllExams(req: Request, res: Response) {
    try {
      const { location, course } = req.query;
      const filter: { location?: string; course?: Types.ObjectId } = {};
      if (typeof location === 'string') {
        filter.location = location;
      }
      if (course instanceof Types.ObjectId) {
        filter.course = course;
      }
      const exams = await Exam.find(filter)
        .populate('course')
        .populate('student');
      logger.info('Exams were found');
      res.json(exams);
    } catch (error) {
      logger.error('Error finding exams: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getExamById(req: Request, res: Response) {
    const examId = req.params.id;
    try {
      const exam = await Exam.findById(examId)
        .populate('course')
        .populate('student');
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
      logger.info(`Exam ${examId} found`);
      res.json(exam);
    } catch (error) {
      logger.error('Error getting exam by id', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async createExam(req: Request, res: Response) {
    const { date, location, course, students } = req.body;
    try {
      const newExam = await Exam.create({
        date,
        location,
        course: course,
        students: students,
      });
      logger.info('Exam created successfully');
      res.status(201).json(newExam);
    } catch (error) {
      logger.error('Error creating exam: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateExam(req: Request, res: Response) {
    const examId = req.params.id;
    const { date, location, course, students } = req.body;
    try {
      const updatedExam = await Exam.findByIdAndUpdate(
        examId,
        { date, location, course, students },
        { new: true }
      )
        .populate('course')
        .populate('students');
      if (!updatedExam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
      logger.info(`Exam ${examId} updated successfully`);
      res.json(updatedExam);
    } catch (error) {
      logger.error('Error updaing exam: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteExam(req: Request, res: Response) {
    const examId = req.params.id;
    try {
      const deletedExam = await Exam.findByIdAndDelete(examId);
      if (!deletedExam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
      logger.info(`Exam ${examId} deleted successfully`);
      res.json({ message: 'Exam deleted successfully' });
    } catch (error) {
      logger.error('Error deleting exam: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getExamByCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const exam = await Exam.find({ courseId });
      logger.info('Found exam by course');
      res.json(exam);
    } catch (error) {
      logger.error('Error finding exam by course: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getExamByLocation(req: Request, res: Response) {
    try {
      const location = req.params.location;
      const exam = await Exam.find({ location });
      res.json(exam);
    } catch (error) {
      logger.error('Error finding exam by location', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default ExamController;
