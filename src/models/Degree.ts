import mongoose, { Document, Schema, Types } from 'mongoose';

interface IDegree extends Document {
  name: string;
  courses: Types.ObjectId[];
  students: Types.ObjectId[];
}

const degreeSchema = new Schema<IDegree>({
  name: { type: String, required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
});

const Degree = mongoose.model<IDegree>('Degree', degreeSchema);
export default Degree;
