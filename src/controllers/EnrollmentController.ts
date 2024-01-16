import { Request, Response} from 'express'
import Enrollment from '../models/Enrollment'
import log4js from '../../src/logger'

const logger = log4js.getLogger("file")

class EnrollmentController{
    static async getAllEnrollments(req: Request, res: Response){
        try{
            const {course,student} = req.query

            const filter: any = {}

            if(course){
                filter.course = course
            }
            if(student){
                filter.student = student
            }

            const enrollments = await Enrollment.find(filter).populate('course').populate('student')
            logger.info('Enrollments were found')
            res.json(enrollments)
        }catch(error){
            logger.error("Error finding enrollments: ",error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getEnrollmentById(req: Request, res: Response){
        const enrollmentId = req.params.id
        try{
            const enrollment = await Enrollment.findById(enrollmentId).populate('course').populate('student')
            if(!enrollment){
                return res.status(404).json({ message: 'Enrollment not found'})
            }
            logger.info(`Enrollment ${enrollmentId} found`)
            res.json(enrollment)
        }catch(error){
            logger.error("Error getting enrollment by id: ",error)
            res.status(500).json({ error: 'Internal Server Error' });
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
            logger.info(`Enrollment created successfully`)
            res.status(201).json(newEnrollment)
        }catch(error){
            logger.error("Error creating enrollment: ",error)
            res.status(500).json({ error: 'Internal Server Error' });
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
            logger.info(`Enrollment ${enrollmentId} updated successfully`)
            res.json(updatedEnrollment)
        }catch(error){
            logger.error("Error updating enrollment: ",error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async deleteEnrollment(req: Request, res: Response){
        const enrollmentId = req.params.id
        try{
            const deletedEnrollment = await Enrollment.findByIdAndDelete(enrollmentId)
            if(!deletedEnrollment){
                return res.status(404).json({message:'Enrollment not found'})
            }
            logger.info(`Enrollment ${enrollmentId} deleted successfully`)
            res.json({message:'Enrollment deleted successfully'})
        }catch(error){
            logger.error("Error deleting enrollment: ",error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default EnrollmentController