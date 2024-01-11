import { Request, Response} from 'express'
import Professor from '../models/Professor'
import log4js from '../../src/logger'

const logger = log4js.getLogger("file")

class ProfessorController{
    static async getAllProfessors(req: Request, res: Response){
        try{
            const professors = await Professor.find()
            logger.info('All professors were found')
            res.json(professors)
        }catch(error){
            logger.error(error)
        }
    }

    static async getProfessorById(req: Request, res: Response){
        const professorId = req.params.id
        try{
            const professor = await Professor.findById(professorId).populate('courses')
            if(!professor){
                return res.status(404).json({ message: 'Professor not found'})
            }
            logger.info(`Professor ${professorId} found`)
            res.json(professor)
        }catch(error){
            logger.error(error)
        }
    }

    static async createProfessor(req: Request, res: Response){
        const {name, email, courses} = req.body
        try{
            const newProfessor = await Professor.create({
                name, 
                email, 
                courses : courses || []
            })
            logger.info(`Professor created successfully`)
            res.json(newProfessor)
        }catch(error){
            logger.error(error)
        }
    }

    static async updateProfessor(req: Request, res:Response){
        const professorId = req.params.id
        const {name, email, courses} = req.body
        try{
            const updatedProfessor = await Professor.findByIdAndUpdate(
                professorId,
                {name, email, courses},
                {new: true}
                ).populate('courses')
                if(!this.updateProfessor){
                    return res.status(404).json({message: 'Professor not found'})
                }
                logger.info(`Professor ${professorId} updated successfully`)
                res.json(updatedProfessor)
        }catch(error){
            logger.error(error)
        }
    }

    static async deleteProfessor(req: Request, res: Response){
        const professorId = req.params.id
        try{
            const deletedProfessor = await Professor.findByIdAndDelete(professorId)
            if(!deletedProfessor){
                return res.status(404).json({message: 'Professor not found'})
            }
            logger.info(`Professor ${professorId} deleted successfully`)
            res.json({message: 'Professor deleted successfully'})
        }catch(error){
            logger.error(error)
        }
    }
}

export default ProfessorController