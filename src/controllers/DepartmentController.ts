import { Request, Response} from 'express'
import Department from '../models/Department'
import log4js from '../../src/logger'

const logger = log4js.getLogger("file")

class DepartmentController{
    static async getAllDepartments(req: Request, res: Response){
        try{
            const departments = await Department.find().populate('courses')
            logger.info('All departments were found')
            res.json(departments)
        }catch(error){
            logger.error(error)
        }
    }

    static async getDepartmentById(req: Request, res: Response){
        const departmentId = req.params.id
        try{
            const department = await Department.findById(departmentId).populate('courses')
            if(!department){
                return res.status(404).json({ message: 'Department not found'})
            }
            logger.info(`Department ${departmentId} found`)
            res.json(department)
        }catch(error){
            logger.error(error)
        }
    }

    static async createDepartment(req: Request, res: Response){
        const {name, courses} = req.body
        try{
            const newDepartment = await Department.create({
                name,
                courses: courses || []
            })
            logger.info(`Department created successfully`)
            res.status(201).json(newDepartment)
        }catch(error){
            logger.error(error)
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
            logger.info(`Department ${departmentId} updated successfully`)
            res.json(updatedDepartment)
        }catch(error){
            logger.error(error)
        }
    }

    static async deleteDepartment(req: Request, res: Response){
        const departmentId = req.params.id
        try{
            const deletedDepartment = await Department.findByIdAndDelete(departmentId)
            if(!deletedDepartment){
                return res.status(404).json({message: 'Department not found'})
            }
            logger.info(`Department ${departmentId} deleted successfully`)
            res.json({ message: 'Department deleted successfully'})
        }catch(error){
            logger.error(error)
        }
    }
}

export default DepartmentController