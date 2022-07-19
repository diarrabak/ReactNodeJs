import mongoose from "mongoose";

const Schema = mongoose.Schema;

//The properties of an article  and their data types
export const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authors: String,
  abstract: {
    type: String,
    required: true,
  },
  tags: String,
  file: {
    type: String,
    required: false,
  },
  journal: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    default: new Date(),
  },
 //An article may belong to many researchers
  researchers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "researchers",
    },
  ],
});
