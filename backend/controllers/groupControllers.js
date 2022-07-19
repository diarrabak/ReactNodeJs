import mongoose from "mongoose";
import { GroupSchema } from "../models/groupModel.js";

const Group = mongoose.model("Group", GroupSchema);

//Add a group to the database
export const addGroup = (req, res) => {
  let newGroup = new Group(req.body);

  newGroup.save((err, Group) => {
    if (err) {
      res.send(err);
    }
    res.json(Group);
  });
};

//Get all the groups in the database
export const getGroups = (req, res) => {
  Group.find({}, (err, Group) => {
    if (err) {
      res.send(err);
    }
    res.json(Group);
  });
};

//Get group by id
export const getGroupById = (req, res) => {
  Group.findById(req.params.GroupId, (err, Group) => {
    if (err) {
      res.send(err);
    }
    res.json(Group);
  });
};

//Update a particular group
export const updateGroup = (req, res) => {
  Group.findOneAndUpdate(
    { _id: req.params.GroupId },
    req.body,
    { new: true },
    (err, Group) => {
      if (err) {
        res.send(err);
      }
      res.json(Group);
    }
  );
};

//Remove a particular group
export const removeGroup = (req, res) => {
  Group.findOneAndDelete({ _id: req.params.GroupId }, (err, Group) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted group" });
  });
};
