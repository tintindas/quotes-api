require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

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

function titleCase(str) {
  let splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
   }
   return splitStr.join(' ');
}

//HOME

app.get("/", (req, res) => {
  res.redirect("/quotes/random");
});

// SEARCH

app.get("/quotes", (req, res) => {

  if(!req.query.source && !req.query.author){
    Quote
    .find()
    .limit(parseInt(req.query.limit, 10))
    .then(foundQuotes => {
      if(foundQuotes.length !== 0){
        res.send(foundQuotes);
      }
      else{
        res.send({message: "No quotes from requested author."});
      }
    })
    .catch(error => {
      res.send(error);
    });
  }

  else{

    if(req.query.source){
      var query = titleCase(req.query.source);
    }

    if(req.query.author){
      var query = titleCase(req.query.author);
    }

    Quote
    .find()
    .or([{author: query}, {source: query}])
    .limit(parseInt(req.query.limit, 10))
    .then(foundQuotes => {
      if(foundQuotes.length !== 0){
        res.send(foundQuotes);
      }
      else{
        res.send({message: "No quotes from " + query + "."});
      }
    })
    .catch(error => {
      res.send(error);
    });

  }


});

// LIST AUTHORS

app.get("/authors", (req, res) => {

  Quote.distinct("author")
  .then(foundAuthors => {
    res.send(foundAuthors);
  });
});

// RANDOM QUOTE

app.get("/quotes/random", (req, res) => {
  Quote.estimatedDocumentCount().exec((err, count) => {
    let randNum = Math.floor(Math.random()*count);

    Quote.findOne().skip(randNum).exec((err, foundQuote) =>{
      if(!err){
        res.send(foundQuote);
      }
      else{
        res.send(err);
      }
    });
  });
});

//PORT

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started.");
});
