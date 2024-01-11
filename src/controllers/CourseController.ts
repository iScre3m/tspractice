import { Request, Response} from 'express'
import Course from '../models/Course'
import log4js from '../../src/logger'

const logger = log4js.getLogger("file")

class CourseController{
    static async getAllCourses(req: Request, res: Response){
        try{
            const courses = await Course.find().populate('professor').populate('students')
            logger.info('All courses were found')
            res.json(courses)
        }catch(error){
            logger.error(error)
        }
    }

    static async getCourseById(req: Request, res: Response){
        const courseId = req.params.id
        try{
            const course = await Course.findById(courseId).populate('professor').populate('students')
            if(!course){
                return res.status(404).json({ message: 'Course not found'})
            }
            logger.info(`Course ${courseId} found`)
            res.json(course)
        }catch(error){
            logger.error(error)
        }
    }

    static async createCourse(req: Request, res: Response){
        const {name, professor, students} = req.body
        try{
            const newCourse = await Course.create({
                name,
                professor,
                students: students || []
            })
            logger.info(`Course ${newCourse} created successfully`)
            res.status(201).json(newCourse)
        }catch(error){
            logger.error(error)
        }
    }

    static async updateCourse(req: Request, res: Response){
        const courseId = req.params.id
        const{name,professor,students} = req.body
        try{
            const updatedCourse = await Course.findByIdAndUpdate(
                courseId,
                {name, professor, students},
                {new:true}
            ).populate('professor').populate('students')
            if(!updatedCourse){
                return res.status(404).json({message: 'Course not found'})
            }
            logger.info(`Course ${courseId} updated successfully`)
            res.json(updatedCourse)
        }catch(error){
            logger.error(error)
        }
    }

    static async deleteCourse(req: Request, res: Response){
        const courseId = req.params.id
        try{
            const deletedCourse = await Course.findByIdAndDelete(courseId)
            if(!deletedCourse){
                return res.status(404).json({message:'Course not found'})
            }
            logger.info(`Course deleted successfully`)
            res.json({message:'Course deleted successfully'})
        }catch(error){
            logger.error(error)
        }
    }
}

export default CourseController