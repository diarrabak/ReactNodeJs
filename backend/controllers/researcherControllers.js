import mongoose from "mongoose";
import { ResearcherSchema } from "../models/researcherModel.js";

const Researcher = mongoose.model("Researcher", ResearcherSchema);

//Add a researcher to the database
export const addResearcher = (req, res) => {
  let newResearcher = new Researcher(req.body);

  newResearcher.save((err, Researcher) => {
    if (err) {
      res.send(err);
    }
    res.json(Researcher);
  });
};

//Get all the researchers in the database
export const getResearchers = (req, res) => {
  Researcher.find({}, (err, Researcher) => {
    if (err) {
      res.send(err);
    }
    res.json(Researcher);
  });
};

//Get researcher by id
export const getResearcherById = (req, res) => {
  Researcher.findById(req.params.ResearcherId, (err, Researcher) => {
    if (err) {
      res.send(err);
    }
    res.json(Researcher);
  });
};

//Update a particular researcher
export const updateResearcher = (req, res) => {
  Researcher.findOneAndUpdate(
    { _id: req.params.ResearcherId },
    req.body,
    { new: true },
    (err, Researcher) => {
      if (err) {
        res.send(err);
      }
      res.json(Researcher);
    }
  );
};

//Remove a particular researcher
export const removeResearcher = (req, res) => {
  Researcher.remove({ _id: req.params.ResearcherId }, (err, Researcher) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted researcher" });
  });
};
