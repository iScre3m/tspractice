import express from 'express';
import EnrollmentController from '../controllers/EnrollmentController';

const router = express.Router();

router.get('/', EnrollmentController.getAllEnrollments);
router.get('/:id', EnrollmentController.getEnrollmentById);
router.post('/', EnrollmentController.createEnrollment);
router.put('/:id', EnrollmentController.updateEnrollment);
router.delete('/:id', EnrollmentController.deleteEnrollment);

export default router;
