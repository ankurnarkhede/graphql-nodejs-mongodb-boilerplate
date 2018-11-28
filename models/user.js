

import mongoose from 'mongoose';

const Schema=mongoose.Schema;

const userSchema=new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        required: true,
        unique:true
    },
    name:{
        type: String,
        required: true
    }
}, { collection: 'user', timestamps: true  });

export default mongoose.model('user',userSchema);