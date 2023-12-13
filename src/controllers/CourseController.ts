import { Request, Response} from 'express'
import Course from '../entities/Course'

class CourseController{
    async getAllCourses(req: Request, res: Response){
        try{
            const courses = await Course.find()
            res.json(courses)
        }catch(error){
            console.log(error)
        }
    }

    async getCourseById(req: Request, res: Response){
        const courseId = req.params.id
        try{
            const course = await Course.findById(courseId).populate('professor').populate('students')
            if(!course){
                return res.status(404).json({ message: 'Course not found'})
            }
            res.json(course)
        }catch(error){
            console.log(error)
        }
    }

    async createCourse(req: Request, res: Response){
        const {name, professor, students} = req.body
        try{
            const newCourse = await Course.create({
                name,
                professor,
                students: students || []
            })
            res.status(201).json(newCourse)
        }catch(error){
            console.log(error)
        }
    }

    async updateCourse(req: Request, res: Response){
        const courseId = req.params.id
        const{name,professor,students} = req.body
        try{
            const updatedCourse = await Course.findByIdAndUpdate(
                courseId,
                {name, professor, students},
                {new:true}
            ).populate('professor').populate('students')
        }catch(error){
            console.log(error)
        }
    }

    async deleteCourse(req: Request, res: Response){
        const courseId = req.params.id
        try{
            const deletedCourse = await Course.findByIdAndDelete(courseId)
            if(!deletedCourse){
                return res.status(404).json({message:'Course not found'})
            }
            res.json({message:'Course deleted successfully'})
        }catch(error){
            console.log(error)
        }
    }
}

export default CourseController