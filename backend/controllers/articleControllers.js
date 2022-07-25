import mongoose from "mongoose";
import { ArticleSchema } from "../models/articleModel.js";

const Article = mongoose.model("Article", ArticleSchema);

//Add an article to the database
export const addArticle = (req, res) => {
  let newArticle = new Article(req.body);

  newArticle.save((err, Article) => {
    if (err) {
      res.send(err);
    }
    res.json(Article);
  });
};

//Get all the articles in the database
export const getArticles = (req, res) => {
  Article.find({}, (err, Article) => {
    if (err) {
      res.send(err);
    }
    res.json(Article);
  });
};

//Get article by id
export const getArticleById = (req, res) => {
  Article.findById(req.params.ArticleId, (err, Article) => {
    if (err) {
      res.send(err);
    }
    res.json(Article);
  });
};

//Update a particular article
export const updateArticle = (req, res) => {
  Article.findOneAndUpdate(
    { _id: req.params.ArticleId },
    req.body,
    { new: true },
    (err, Article) => {
      if (err) {
        res.send(err);
      }
      res.json(Article);
    }
  );
};

//Remove a particular article
export const removeArticle = (req, res) => {
  Article.remove({ _id: req.params.ArticleId }, (err, Article) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted article" });
  });
};
