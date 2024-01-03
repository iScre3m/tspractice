import { Request, Response} from 'express'
import Degree from '../models/Degree'

class DegreeController{
    static async getAllDegrees(req: Request, res: Response){
        try{
            const degrees = await Degree.find().populate('courses').populate('students')
            res.json(degrees)
        }catch(error){
            console.log(error)
        }
    }

    static async getDegreeById(req: Request, res: Response){
        const DegreeId = req.params.id
        try{
            const degree = await Degree.findById(DegreeId).populate('courses').populate('students')
            if(!degree){
                return res.status(404).json({ message: 'Degree not found'})
            }
            res.json(degree)
        }catch(error){
            console.log(error)
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
            res.status(201).json(newDegree)
        }catch(error){
            console.log(error)
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
            res.json(updatedDegree)
        }catch(error){
            console.log(error)
        }
    }

    static async deleteDegree(req: Request, res: Response){
        const degreeId = req.params.id
        try{
            const deletedDegree = await Degree.findByIdAndDelete(degreeId)
            if(!deletedDegree){
                return res.status(404).json({message:'Degree not found'})
            }
            res.json({message:'Degree deleted successfully'})
        }catch(error){
            console.log(error)
        }
    }
}

export default DegreeController