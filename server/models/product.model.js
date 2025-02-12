import mongoose,{Schema} from 'mongoose';

// also add user reference if required

const productSchema = new Schema({
    name: {
        type:String,
        required: true,
        trim:true,
    },
    price:{
        type:Number,
        required: true,
    },
    category: {
        type:String,
        required: true,
        enum:['other','salad','veg','nonveg']
    }
    // create a user ref
})

const productModel = mongoose.models.product|| mongoose.model('product',productSchema);

export {productModel}