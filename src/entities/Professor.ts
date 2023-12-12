import mongoose, {Document, Schema, Types} from 'mongoose'

interface IProfessor extends Document{
    id: number;
    name: string;
    email: string;
    courses: Types.ObjectId[];
}

const professorSchema = new Schema<IProfessor>({
    id:{type: Number, required:true, unique:true},
    name:{type: String, required:true},
    email:{type: String},
    courses:[{type: Schema.Types.ObjectId, ref:'Course', required: true}]
})

export default mongoose.model<IProfessor>('Professor', professorSchema)
