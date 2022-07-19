import mongoose from "mongoose";
import { EventSchema } from "../models/eventModel.js";

const Event = mongoose.model("Event", EventSchema);

//Add an Event to the database
export const addEvent = (req, res) => {
  let newEvent = new Event(req.body);

  newEvent.save((err, Event) => {
    if (err) {
      res.send(err);
    }
    res.json(Event);
  });
};

//Get all the Events in the database
export const getEvents = (req, res) => {
  Event.find({}, (err, Event) => {
    if (err) {
      res.send(err);
    }
    res.json(Event);
  });
};

//Get Event by id
export const getEventById = (req, res) => {
  Event.findById(req.params.EventId, (err, Event) => {
    if (err) {
      res.send(err);
    }
    res.json(Event);
  });
};

//Update a particular Event
export const updateEvent = (req, res) => {
  Event.findOneAndUpdate(
    { _id: req.params.EventId },
    req.body,
    { new: true },
    (err, Event) => {
      if (err) {
        res.send(err);
      }
      res.json(Event);
    }
  );
};

//Remove a particular Event
export const removeEvent = (req, res) => {
  Event.remove({ _id: req.params.EventId }, (err, Event) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted Event" });
  });
};
