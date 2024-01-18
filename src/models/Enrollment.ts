import mongoose, { Document, Schema, Types } from 'mongoose';

interface IEnrollment extends Document {
  date: Date;
  course: Types.ObjectId;
  student: Types.ObjectId;
}

const enrollmentSchema = new Schema<IEnrollment>({
  date: { type: Date, required: true, unique: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
});

const Enrollment = mongoose.model<IEnrollment>('Enrollment', enrollmentSchema);
export default Enrollment;
