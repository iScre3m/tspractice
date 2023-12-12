import mongoose, {Document, Schema, Types} from 'mongoose'
import Student from './Student';

interface IDepartment extends Document{
    name: string,
    courses: Types.ObjectId[];
}

const departmentSchema = new Schema<IDepartment>({
    name: {type: String, required: true},
    courses: [{type: Schema.Types.ObjectId, ref:'Course'}]
})

export default mongoose.model<IDepartment>('Department', departmentSchema)