import  mongoose  from 'mongoose';
import  bcryptjs  from 'bcryptjs';

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:false
    },
},
)
{
    timestamps:true
}
const Category = mongoose.model("Category",categorySchema)
export default Category;