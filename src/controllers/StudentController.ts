import { Request, Response} from 'express'
import Student from '../models/Student'

class StudentController{
    static async getAllStudents(req: Request, res: Response){
        try{
            const students = await Student.find()
            res.json(students)
        }catch(error){
            console.log(error)
        }
    }

    static async getStudentById(req: Request, res: Response){
        const studentId = req.params.id
    
        try{
            const student = await Student.findById(studentId)
            if(!student){
                return res.status(404).json({message: 'Student not found'})
            }
            res.json(student)
        }catch(error){
            console.log(error)
        }
    }

    static async createStudent(req: Request, res: Response){
        const {name, age, email} = req.body
        const student = new Student({name, age, email})
        try{
            const newStudent = await student.save()
            res.json(newStudent)
        }catch(error){
            console.log(error)
        }
    }

    static async updateStudent(req: Request, res: Response){
        const studentId = req.params.id;
        const {name, age, email} = req.body
        try{
            const updateStudent = await Student.findByIdAndUpdate(
                studentId,
                {name, age, email},
                {new: true}
            )

            if(!updateStudent){
                return res.status(404).json({ message: 'Student not found'})
            }

            res.json(updateStudent)
        }catch(error){
            console.log(error)
        }
    }

    static async deleteStudent(req: Request, res: Response){
        const studentId = req.params.id
        try{
            const deletedStudent = await Student.findByIdAndDelete(studentId) 

            if(!deletedStudent){
                return res.status(404).json({ message: 'Student not found'})
            }

            res.json({messsage: 'Student deleted successfully'})
        }catch(error){
            console.log(error)
        }
    }
}

export default StudentController