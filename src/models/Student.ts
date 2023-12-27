import mongoose, {Document, Schema, Types} from 'mongoose'

interface IStudent extends Document{
    name: string;
    age: number;
    email: string;
}

const studentSchema = new Schema<IStudent>({
    name: {type: String, required:true},
    age: {type: Number, min: 18, max:100},
    email: {type: String}
})

const Student = mongoose.model<IStudent>('Student', studentSchema)
export default Student