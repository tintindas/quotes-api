require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb+srv://tintin_das:"+process.env.MONGO_PASS+"@cluster0-yo7rn.mongodb.net/quotesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  text: String,
  author: String,
  source: String
});

const Quote = new mongoose.model("Quote", quoteSchema);

// ALL QUOTES

app.get("/quotes", (req, res) => {
  Quote.find((err, foundQuotes) => {
    if (!err) {
      res.send(foundQuotes);
    } else {
      res.send(err);
    }
  });
});

// SEARCH BY AUTHOR

app.get("/quotes/author=:author", (req, res) => {
  Quote.find({
    author: req.params.author
  }, (err, foundQuotes) => {
    if (!err) {

      if (foundQuotes.length !== 0) {
        res.send(foundQuotes);
      } else {
        res.send({
          message: "No quotes from requested author."
        })
      }

    } else {
      res.send(err);
    }
  });
});

// SEARCH BY SOURCE

app.get("/quotes/source=:source", (req, res) => {
  Quote.find({
    source: req.params.source
  }, (err, foundQuotes) => {
    if (!err) {

      if (foundQuotes.length !== 0) {
        res.send(foundQuotes);
      } else {
        res.send({
          message: "No quotes from requested source."
        })
      }

    } else {
      res.send(err);
    }
  });
});

// RANDOM QUOTE

app.get("/quotes/random", (req, res) => {
  Quote.find((err, foundQuotes) => {
    if(!err){
      if(foundQuotes !== 0){
        randNum = Math.floor(Math.random()*foundQuotes.length);

        res.send(foundQuotes[randNum]);
      }
      else{
        res.send({message: "Oops, something went wrong!"});
      }
    }
    else{
      res.send(err);
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
