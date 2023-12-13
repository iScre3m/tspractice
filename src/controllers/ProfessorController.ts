import { Request, Response} from 'express'
import Professor from '../entities/Professor'

class ProfessorController{
    async getAllProfessors(req: Request, res: Response){
        try{
            const professors = await Professor.find()
            res.json(professors)
        }catch(error){
            console.log(error)
        }
    }

    async getProfessorById(req: Request, res: Response){
        const professorId = req.params.id
        try{
            const professor = await Professor.findById(professorId).populate('courses')
            if(!professor){
                return res.status(404).json({ message: 'Professor not found'})
            }
            res.json(professor)
        }catch(error){
            console.log(error)
        }
    }

    async createProfessor(req: Request, res: Response){
        const {name, email, courses} = req.body
        const professor = new Professor({name, email, courses})
        try{
            const newProfessor = await professor.save()
            res.json(newProfessor)
        }catch(error){
            console.log(error)
        }
    }

    async updateProfessor(req: Request, res:Response){
        const professorId = req.params.id
        const {name, email, courses} = req.body
        try{
            const updatedProfessor = await Professor.findByIdAndUpdate(
                professorId,
                {name, email, courses},
                {new: true}
                ).populate('courses')
        }catch(error){
            console.log(error)
        }
    }

    async deleteProfessor(req: Request, res: Response){
        const professorId = req.params.id
        try{
            const deletedProfessor = await Professor.findByIdAndDelete(professorId)
            if(!deletedProfessor){
                return res.status(404).json({message: 'Professor not found'})
            }
            res.json({message: 'Professor deleted successfully'})
        }catch(error){
            console.log(error)
        }
    }
}

export default ProfessorController