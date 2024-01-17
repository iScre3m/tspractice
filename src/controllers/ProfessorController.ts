import { Request, Response} from 'express'
import Professor from '../models/Professor'
import log4js from '../../src/logger'

const logger = log4js.getLogger('file')

class ProfessorController{
    static async getAllProfessors(req: Request, res: Response){
        try{
            const {name,email} = req.query
            const filter: any = {}
            if(name){
                filter.name = name
            }
            if(email){
                filter.email = email
            }
            const professors = await Professor.find(filter).populate('course')
            logger.info('Professors were found')
            res.json(professors)
        }catch(error){
            logger.error('Error finding professors: ',error)
            res.status(500).json({ error: 'Internal Server Error' });
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
            logger.error('Error finding professor by id: ',error)
            res.status(500).json({ error: 'Internal Server Error' });
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
            logger.info('Professor created successfully')
            res.json(newProfessor)
        }catch(error){
            logger.error('Error creating professor: ',error)
            res.status(500).json({ error: 'Internal Server Error' });
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
            logger.error('Error updating professor: ',error)
            res.status(500).json({ error: 'Internal Server Error' });
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
            logger.error('Error deleting professor: ',error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getProfessorByName(req: Request, res: Response){
        try{
            const name = req.params.name
            const professor = await Professor.find({name})
            logger.info('Found professor by name successfully')
            res.json(professor)
        }catch(error){
            logger.error('Error finding professor by name',error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default ProfessorController