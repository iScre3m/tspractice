import express from 'express';
import ExamController from '../controllers/ExamController';

const router = express.Router();

router.get('/', ExamController.getAllExams);
router.get('/:id', ExamController.getExamById);
router.post('/', ExamController.createExam);
router.put('/:id', ExamController.updateExam);
router.delete('/:id', ExamController.deleteExam);

export default router;
