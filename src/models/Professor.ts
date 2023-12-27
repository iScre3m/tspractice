import mongoose, {Document, Schema, Types} from 'mongoose'

interface IProfessor extends Document{
    name: string;
    email: string;
    courses: Types.ObjectId[];
}

const professorSchema = new Schema<IProfessor>({
    name:{type: String, required:true},
    email:{type: String},
    courses:[{type: Schema.Types.ObjectId, ref:'Course', required: true}]
})

const Professor = mongoose.model<IProfessor>('Professor', professorSchema)
export default Professor
