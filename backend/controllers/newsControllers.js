import mongoose from "mongoose";
import { NewsSchema } from "../models/newsModel.js";

const News = mongoose.model("News", NewsSchema);

//Add an News to the database
export const addNews = (req, res) => {
  let newNews = new News(req.body);

  newNews.save((err, News) => {
    if (err) {
      res.send(err);
    }
    res.json(News);
  });
};

//Get all the News in the database
export const getNews = (req, res) => {
  News.find({}, (err, News) => {
    if (err) {
      res.send(err);
    }
    res.json(News);
  });
};

//Get News by id
export const getNewsById = (req, res) => {
  News.findById(req.params.NewsId, (err, News) => {
    if (err) {
      res.send(err);
    }
    res.json(News);
  });
};

//Update a particular News
export const updateNews = (req, res) => {
  News.findOneAndUpdate(
    { _id: req.params.NewsId },
    req.body,
    { new: true },
    (err, News) => {
      if (err) {
        res.send(err);
      }
      res.json(News);
    }
  );
};

//Remove a particular News
export const removeNews = (req, res) => {
  News.remove({ _id: req.params.NewsId }, (err, News) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted News" });
  });
};
