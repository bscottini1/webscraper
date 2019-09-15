const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");

// console.log ("hello world: " + db)
// console.log("hello world" + db.Article)

const PORT = process.env.PORT || 2000

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scraper", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.get("/scrape", function (req, res) {
    axios.get("https://www.mlbtraderumors.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        $("article h2").each(function (i, element) {
            var result = {};
            result.headline = $(this)
                .children("a")
                .text();
            result.url = $(this)
                .children()
                .attr("href");
            result.summary = $(this)
                .children("p")
                .text();

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
            });
            res.send("Scrape Complete");
        });
    });




app.get("/", function (req, res) {
    res.send("Home Page!");
})





// require('./routes/api-routes')(app);
// require('./routes/html-routes')(app);


app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
