import mongoose from "mongoose";

const Schema = mongoose.Schema;
//The properties of a group  and their data types
export const GroupSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  picture: String,
  //A group has many researchers
  researchers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "researchers",
    },
  ],
});
