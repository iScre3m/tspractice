import express from 'express';
import UniversityController from '../controllers/UniversityController';

const router = express.Router();

router.get('/', UniversityController.getAllUniversities);
router.get('/:id', UniversityController.getUniversityById);
router.post('/', UniversityController.createUniversity);
router.put('/:id', UniversityController.updateUniversity);
router.delete('/:id', UniversityController.deleteUniversity);

export default router;
