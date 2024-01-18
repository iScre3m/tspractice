import mongoose, { Document, Schema, Types } from 'mongoose';

interface IUniversity extends Document {
  name: string;
  address: string;
  courses: Types.ObjectId[];
  departments: Types.ObjectId[];
}

const universitySchema = new Schema<IUniversity>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  departments: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
});
const University = mongoose.model<IUniversity>('University', universitySchema);
export default University;
