import mongoose, { Document, Schema, Types } from 'mongoose';

interface IExam extends Document {
  date: Date;
  location: string;
  course: Types.ObjectId;
  students: Types.ObjectId[];
}

const examSchema = new Schema<IExam>({
  date: { type: Date, required: true, unique: true },
  location: { type: String, required: true, unique: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
});

const Exam = mongoose.model<IExam>('Exam', examSchema);
export default Exam;
