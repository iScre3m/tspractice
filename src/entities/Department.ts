import mongoose, {Document, Schema, Types} from 'mongoose'

interface IDepartment extends Document{
    name: string,
    courses: Types.ObjectId[];
}

const departmentSchema = new Schema<IDepartment>({
    name: {type: String, required: true},
    courses: [{type: Schema.Types.ObjectId, ref:'Course'}]
})

const Department = mongoose.model<IDepartment>('Department', departmentSchema)
export default Department