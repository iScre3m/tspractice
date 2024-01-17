import { Request, Response} from 'express'
import University from '../models/University'
import log4js from '../../src/logger'

const logger = log4js.getLogger('file')

class UniversityController{
    static async getAllUniversities(req: Request, res: Response){
        try{
            const {name, address} = req.query
            const filter : any = {}
            if(name){
                filter.name = name
            }
            if(address){
                filter.address = address
            }
            const universities = await University.find(filter).populate('courses')
            logger.info('Universities were found')
            res.json(universities)
        }catch(error){
            logger.error('Error finding universities: ',error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getUniversityById(req: Request, res: Response){
        const universityId = req.params.id
        try{
            const university = await University.findById(universityId).populate('courses')
            if(!university){
                return res.status(404).json({message: 'University not found'})
            }
            logger.info(`University ${universityId} found`)
            res.json(university)
        }catch(error){
            logger.error('Error finding university by id: ',error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async createUniversity(req: Request, res: Response){
        const {name, address, courses} = req.body
        try{
            const newUniveristy = await University.create({
                name,
                address,
                courses: courses || []
            })
            logger.info('University created successfully')
            res.status(201).json(newUniveristy)
        }catch(error){
            logger.error('Error creating univerisity: ',error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async updateUniversity(req: Request, res: Response){
        const universityId = req.params.id
        const {name, address, courses} = req.body
        try{
            const updatedUniversity = await University.findByIdAndUpdate(
                universityId,
                {name, address, courses},
                {new:true}
            ).populate('courses')
            if(!updatedUniversity){
                return res.status(404).json({message:'University not found'})
            }
            logger.info(`University ${universityId} updated successfully`)
            res.json(updatedUniversity)
        }catch(error){
            logger.error('Error updating university: ',error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async deleteUniversity(req: Request, res: Response){
        const universityId = req.params.id
        try{
            const deletedUniveristy = await University.findByIdAndDelete(universityId)
            if(!deletedUniveristy){
                return res.status(404).json({message:'University not found'})
            }
            logger.info(`University ${universityId} deleted successfully`)
            res.json({message: 'Univerisity deleted successfully'})
        }catch(error){
            logger.error('Error deleting univerisity: ',error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default UniversityController