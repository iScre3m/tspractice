import express from 'express';
import DegreeController from '../controllers/DegreeController';

const router = express.Router();

router.get('/', DegreeController.getAllDegrees);
router.get('/:id', DegreeController.getDegreeById);
router.post('/', DegreeController.createDegree);
router.put('/:id', DegreeController.updateDegree);
router.delete('/:id', DegreeController.deleteDegree);

export default router;
