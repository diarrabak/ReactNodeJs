import mongoose from "mongoose";

const Schema = mongoose.Schema;

//The properties of an event  and their data types
export const NewsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  picture: String,
  //Contact information
  
  date: {
    type: Date,
    default: new Date(),
  },
});
