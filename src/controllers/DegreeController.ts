import { Request, Response} from 'express'
import Degree from '../models/Degree'
import log4js from '../../src/logger'

const logger = log4js.getLogger("file")

class DegreeController{
    static async getAllDegrees(req: Request, res: Response){
        try{
            const degrees = await Degree.find().populate('courses').populate('students')
            logger.info('All degrees were found')
            res.json(degrees)
        }catch(error){
            logger.error(error)
        }
    }

    static async getDegreeById(req: Request, res: Response){
        const degreeId = req.params.id
        try{
            const degree = await Degree.findById(degreeId).populate('courses').populate('students')
            if(!degree){
                return res.status(404).json({ message: 'Degree not found'})
            }
            logger.info(`Degree ${degreeId} found`)
            res.json(degree)
        }catch(error){
            logger.error(error)
        }
    }

    static async createDegree(req: Request, res: Response){
        const {name, courses, students} = req.body
        try{
            const newDegree = await Degree.create({
                name,
                courses: courses || [],
                students: students || []
            })
            logger.info(`Course created successfully`)
            res.status(201).json(newDegree)
        }catch(error){
            logger.error(error)
        }
    }

    static async updateDegree(req: Request, res: Response){
        const degreeId = req.params.id
        const{name,courses,students} = req.body
        try{
            const updatedDegree = await Degree.findByIdAndUpdate(
                degreeId,
                {name, courses, students},
                {new:true}
            ).populate('courses').populate('students')
            if(!updatedDegree){
                return res.status(404).json({message: 'Degree not found'})
            }
            logger.info(`Degree ${degreeId} updated successfully`)
            res.json(updatedDegree)
        }catch(error){
            logger.error(error)
        }
    }

    static async deleteDegree(req: Request, res: Response){
        const degreeId = req.params.id
        try{
            const deletedDegree = await Degree.findByIdAndDelete(degreeId)
            if(!deletedDegree){
                return res.status(404).json({message:'Degree not found'})
            }
            logger.info(`Degree ${degreeId} deleted successfully`)
            res.json({message:'Degree deleted successfully'})
        }catch(error){
            logger.error(error)
        }
    }
}

export default DegreeController