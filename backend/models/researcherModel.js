import mongoose from "mongoose";

const Schema = mongoose.Schema;

//The properties of a researcher  and their data types
export const ResearcherSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: String,
    
  biography: String,
  researchgate: String,
  googlescholar: String,
  //A researcher can have many roles
  roles: [ String],
  //Researcher can belong to many groups
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groups",
    },
  ],
  //He/she can have many articles as well
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "articles",
    },
  ],
 
});
