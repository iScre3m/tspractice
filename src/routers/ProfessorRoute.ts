import express from 'express'
import ProfessorController from '../controllers/ProfessorController'

const router = express.Router()

router.get('/',ProfessorController.getAllProfessors)
router.get('/:id',ProfessorController.getProfessorById)
router.post('/',ProfessorController.createProfessor)
router.put('/:id',ProfessorController.updateProfessor)
router.delete('/:id',ProfessorController.deleteProfessor)

export default router