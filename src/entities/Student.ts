import mongoose, {Document, Schema, Types} from 'mongoose'

interface IStudent extends Document{
    id: number;
    name: string;
    age: number;
    email: string;
}

const studentSchema = new Schema<IStudent>({
    id: {type: Number, required:true ,unique:true},
    name: {type: String, required:true},
    age: {type: Number, min: 18, max:100},
    email: {type: String}
})

export default mongoose.model<IStudent>('Student', studentSchema)