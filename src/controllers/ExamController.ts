import { Request, Response} from 'express'
import Exam from '../models/Exam'
import log4js from '../../src/logger'

const logger = log4js.getLogger("file")

class ExamController{
    static async getAllExams(req: Request, res: Response){
        try{
            const exams = await Exam.find().populate('course').populate('student')
            logger.info('All exams were found')
            res.json(exams)
        }catch(error){
            logger.error(error)
        }
    }

    static async getExamById(req: Request, res: Response){
        const examId = req.params.id
        try{
            const exam = await Exam.findById(examId).populate('course').populate('student')
            if(!exam){
                return res.status(404).json({ message: 'Exam not found'})
            }
            logger.info(`Exam ${examId} found`)
            res.json(exam)
        }catch(error){
            logger.error(error)
        }
    }

    static async createExam(req: Request, res: Response){
        const {date, location, course, students} = req.body
        try{
            const newExam = await Exam.create({
                date,
                location,
                course: course,
                students: students
            })
            logger.info(`Exam created successfully`)
            res.status(201).json(newExam)
        }catch(error){
            logger.error(error)
        }
    }

    static async updateExam(req: Request, res: Response){
        const examId = req.params.id
        const {date, location, course, students} = req.body
        try{
            const updatedExam = await Exam.findByIdAndUpdate(
                examId,
                {date, location, course, students},
                {new:true}
            ).populate('course').populate('students')
            if(!updatedExam){
                return res.status(404).json({message: 'Exam not found'})
            }
            logger.info(`Exam ${examId} updated successfully`)
            res.json(updatedExam)
        }catch(error){
            logger.error(error)
        }
    }

    static async deleteExam(req: Request, res: Response){
        const examId = req.params.id
        try{
            const deletedExam = await Exam.findByIdAndDelete(examId)
            if(!deletedExam){
                return res.status(404).json({message:'Exam not found'})
            }
            logger.info(`Exam ${examId} deleted successfully`)
            res.json({message:'Exam deleted successfully'})
        }catch(error){
            logger.error(error)
        }
    }
}

export default ExamController