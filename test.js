const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");

const PORT = process.env.PORT || 2000

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const url = "https://www.mlbtraderumors.com/"

axios.get(url)
.then(function(response){
    const $ = cheerio.load(response.data);
    $("body.itemslist div div:nth-child(4) div:nth-child(3) article").each(function(i,elem){
        // "https://blog.bitsrc.io/https-blog-bitsrc-io-how-to-perform-web-scraping-using-node-js-5a96203cb7cb"
        const result = {};
        result.headline = $(this)
            .text();
        result.summary = $(this)
            .children("p")
            .text();
        result.link = $(this)
            .children()
            .attr("href");
        console.log(result);
    })
})


.catch(function(err){
    console.log(err);
})





app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
