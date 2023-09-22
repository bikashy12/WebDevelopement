const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
// setting view engine to use ejs
// we use ejs to create dynamic page
app.set("view engine", "ejs");
// we use bodyParser to parse the request
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// To access the html, css, js pages in remote server we need to keep all the files inside the public folder
app.use(express.static("public"));
// connect our app to local mongodb database
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("article", articleSchema);
// route where all the articles will be available

app
  .route("/articles")
  .get(function (req, res) {
    Article.find(function (err, foundArticle) {
      if (!err) {
        res.send(foundArticle);
      } else {
        res.send(err);
      }
    });
  })

  .post(function (req, res) {
    // Creating the new article with the given title and content by the user
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    // Saving the new article into the database
    newArticle.save(function (err) {
      if (!err) {
        console.log("Succesfully added new article");
      } else {
        console.log(err);
      }
    });
  })

  .delete(function (req, res) {
    Article.deleteMany(function (err) {
      if (!err) {
        res.send("Deleted Succesfully all the articles");
      } else {
        res.send(err);
      }
    });
  });

// Enhanced way of using express verb route
app
  .route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle }, (err, articleFound) => {
      if (articleFound) {
        res.send(articleFound);
      } else {
        res.send("No Article was found with matching title");
      }
    });
  })

  .patch((req, res) => {
    Article.updateOne(
      { title: req.params.articleTitle },
      { $set: req.body },
      function (err) {
        if (!err) {
          res.send("Succesfully Patched the Article");
        }
      }
    );
  })

  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleTitle }, function (err) {
      if (!err) {
        res.send("Succesfully Deleted the selected Article");
      }
    });
  })

  .put((req, res) => {
    Article.updateOne(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      function (err) {
        if (!err) {
          res.send("Succesfully Updated the article");
        }
      }
    );
  });

// sets our app to listen on port number 3000
app.listen(3000, function () {
  console.log("Server started listening 3000");
});
