import express from 'express'
import StudentController from '../controllers/StudentController'

const router = express.Router()

router.get('/',StudentController.getAllStudents)
router.get('/:id',StudentController.getStudentById)
router.post('/',StudentController.createStudent)
router.put('/:id',StudentController.updateStudent)
router.delete('/:id',StudentController.deleteStudent)

export default router