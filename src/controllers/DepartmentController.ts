import { Request, Response} from 'express'
import Department from '../entities/Department'

class DepartmentController{
    static async getAllDepartments(req: Request, res: Response){
        try{
            const departments = await Department.find().populate('courses')
            res.json(departments)
        }catch(error){
            console.log(error)
        }
    }

    static async getDepartmentById(req: Request, res: Response){
        const departmentId = req.params.id

        try{
            const department = await Department.findById(departmentId).populate('courses')
            if(!department){
                return res.status(404).json({ message: 'Department not found'})
            }
            res.json(department)
        }catch(error){
            console.log(error)
        }
    }

    static async createDepartment(req: Request, res: Response){
        const {name, courses} = req.body
        try{
            const newDepartment = await Department.create({
                name,
                courses: courses || []
            })
            res.status(201).json(newDepartment)
        }catch(error){
            console.log(error)
        }
    }

    static async updateDepartment(req: Request, res: Response){
        const departmentId = req.params.id
        const {name, courses} = req.body
        try{
            const updatedDepartment = await Department.findByIdAndUpdate(
                departmentId,
                {name, courses},
                {new:true}
            ).populate('courses')

            if(!updatedDepartment){
                return res.status(404).json({ message: 'Department not found'})
            }

            res.json(updatedDepartment)

        }catch(error){
            console.log(error)
        }
    }

    static async deleteDepartment(req: Request, res: Response){
        const departmentId = req.params.id
        try{
            const deletedDepartment = await Department.findByIdAndDelete(departmentId)

            if(!deletedDepartment){
                return res.status(404).json({message: 'Department not found'})
            }

            res.json({ message: 'Department deleted successfully'})

        }catch(error){
            console.log(error)
        }
    }
}

export default DepartmentController