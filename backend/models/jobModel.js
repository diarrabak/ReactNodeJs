import mongoose from "mongoose";

const Schema = mongoose.Schema;

//The properties of a job  and their data types
export const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  jobtype:String,
  file: {
    type: String,
    required: false,
  },
  
  year: {
    type: Date,
    default: new Date(),
  },
  //Contact information
  researchers: [ 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "researchers",
    },
  ],
 
});
