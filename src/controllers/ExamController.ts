import { Request, Response} from 'express'
import Exam from '../models/Exam'

class ExamController{
    static async getAllExams(req: Request, res: Response){
        try{
            const exams = await Exam.find().populate('course').populate('student')
            res.json(exams)
        }catch(error){
            console.log(error)
        }
    }

    static async getExamById(req: Request, res: Response){
        const ExamId = req.params.id
        try{
            const exam = await Exam.findById(ExamId).populate('course').populate('student')
            if(!exam){
                return res.status(404).json({ message: 'Exam not found'})
            }
            res.json(exam)
        }catch(error){
            console.log(error)
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
            res.status(201).json(newExam)
        }catch(error){
            console.log(error)
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
            res.json(updatedExam)
        }catch(error){
            console.log(error)
        }
    }

    static async deleteExam(req: Request, res: Response){
        const examId = req.params.id
        try{
            const deletedExam = await Exam.findByIdAndDelete(examId)
            if(!deletedExam){
                return res.status(404).json({message:'Exam not found'})
            }
            res.json({message:'Exam deleted successfully'})
        }catch(error){
            console.log(error)
        }
    }
}

export default ExamController