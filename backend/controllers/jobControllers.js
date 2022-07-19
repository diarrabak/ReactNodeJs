import mongoose from "mongoose";

import { JobSchema } from "../models/jobModel.js";

const Job = mongoose.model("Job", JobSchema);

//Add an Job to the database
export const addJob = (req, res) => {
  let newJob = new Job(req.body);

  newJob.save((err, Job) => {
    if (err) {
      res.send(err);
    }
    res.json(Job);
  });
};

//Get all the Jobs in the database
export const getJobs = (req, res) => {
  Job.find({}, (err, Job) => {
    if (err) {
      res.send(err);
    }
    res.json(Job);
  });
};

//Get Job by id
export const getJobById = (req, res) => {
  Job.findById(req.params.JobId, (err, Job) => {
    if (err) {
      res.send(err);
    }
    res.json(Job);
  });
};

//Update a particular Job
export const updateJob = (req, res) => {
  Job.findOneAndUpdate(
    { _id: req.params.JobId },
    req.body,
    { new: true },
    (err, Job) => {
      if (err) {
        res.send(err);
      }
      res.json(Job);
    }
  );
};

//Remove a particular Job
export const removeJob = (req, res) => {
  Job.remove({ _id: req.params.JobId }, (err, Job) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted Job" });
  });
};
