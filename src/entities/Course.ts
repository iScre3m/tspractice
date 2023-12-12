import mongoose, {Document, Schema, Types} from 'mongoose'

interface ICourse extends Document{
    name: string;
    professor: Types.ObjectId;
    students: Types.ObjectId[];
}

const courseSchema = new Schema<ICourse>({
    name: {type: String, required:true, unique:true},
    professor: {type: Schema.Types.ObjectId, ref:'Professor', required: true},
    students: [{type: Schema.Types.ObjectId, ref:'Student'}]
})

export default mongoose.model<ICourse>('Course', courseSchema)