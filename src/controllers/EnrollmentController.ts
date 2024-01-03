import { Request, Response} from 'express'
import Enrollment from '../models/Enrollment'

class EnrollmentController{
    static async getAllEnrollments(req: Request, res: Response){
        try{
            const enrollments = await Enrollment.find().populate('course').populate('student')
            res.json(enrollments)
        }catch(error){
            console.log(error)
        }
    }

    static async getEnrollmentById(req: Request, res: Response){
        const EnrollmentId = req.params.id
        try{
            const enrollment = await Enrollment.findById(EnrollmentId).populate('course').populate('student')
            if(!enrollment){
                return res.status(404).json({ message: 'Enrollment not found'})
            }
            res.json(enrollment)
        }catch(error){
            console.log(error)
        }
    }

    static async createEnrollment(req: Request, res: Response){
        const {date, course, student} = req.body
        try{
            const newEnrollment = await Enrollment.create({
                date,
                course: course,
                student: student
            })
            res.status(201).json(newEnrollment)
        }catch(error){
            console.log(error)
        }
    }

    static async updateEnrollment(req: Request, res: Response){
        const enrollmentId = req.params.id
        const{date,course,student} = req.body
        try{
            const updatedEnrollment = await Enrollment.findByIdAndUpdate(
                enrollmentId,
                {date, course, student},
                {new:true}
            ).populate('course').populate('student')
            if(!updatedEnrollment){
                return res.status(404).json({message: 'Enrollment not found'})
            }
            res.json(updatedEnrollment)
        }catch(error){
            console.log(error)
        }
    }

    static async deleteEnrollment(req: Request, res: Response){
        const enrollmentId = req.params.id
        try{
            const deletedEnrollment = await Enrollment.findByIdAndDelete(enrollmentId)
            if(!deletedEnrollment){
                return res.status(404).json({message:'Enrollment not found'})
            }
            res.json({message:'Enrollment deleted successfully'})
        }catch(error){
            console.log(error)
        }
    }
}

export default EnrollmentController