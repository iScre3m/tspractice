import mongoose, {Document, Schema, Types} from 'mongoose'

interface IUniversity extends Document{
    name: string;
    address: string;
    coursesOffered: Types.ObjectId[];
}

const universitySchema = new Schema<IUniversity>({
    name: {type: String, required:true},
    address: {type: String, required:true},
    coursesOffered: [{type: Schema.Types.ObjectId, ref: 'Courses'}]
})
const University = mongoose.model<IUniversity>('University', universitySchema )
export default University