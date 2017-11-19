import mongoose from 'mongoose'
const Schema = mongoose.Schema;
export const urlSchema = new Schema({
    urllink:{
        type:String,
        required: 'Need Url to shorten',
        default:'google.com'
    },
    shortlink:{
        type:String,
        required:'Need Link after shortening',
        default:'google.com'
    },
    hits:{
        type:Number,
        required: 'Provide Number of times the link was shortened',
        default:0
    }
})