//"use strict";
//import request from 'request';
// import cheerio from 'cheerio';
// import fetch from "node-fetch";
// import fs from 'fs';
var fs = require('fs');
var cheerio = require('cheerio');
var fetch = require("node-fetch");

//const axios = require("axios");
var csharpURL = "https://www.c-sharpcorner.com/technologies";
var categoryResult = [];

// Sample and runnable code for create file in node js
// fs.writeFile('mynewfile3.txt', 'Hello content!', function(err) {
//     if (err) throw err;
//     // console.log('Saved!');
// });

//const axios = require("axios");
const getArticleCountByCategory = async(url, article) => {
    const response = await fetch(url);
    const responseHtml = await response.text();
    // const $ = cheerio.load(responseHtml);
    // var articleCount = $('.count').each((index, item) => {
    //     if (index == 0) {
    //         finalResult.articleCount = $(item).text();
    //         console.log(finalResult);
    //     }
    // });

    return {
        html: responseHtml,
        article: article
    };
};



getArticleCountByCategory(csharpURL, {}).then((html) => {
    const $ = cheerio.load(html.html);
    var article = {};
    var executedCount = 0;
    var totalCategory = $(".LinkNormalGray").length;
    $(".LinkNormalGray").each((index, item) => {
        if (true || index < 2) {
            // console.log($(item).text());
            article = {
                category: $(item).text(),
                url: $(item).attr("href")
            };

            var categoryCount = getArticleCountByCategory($(item).attr("href"), article).then((data) => {
                // Increament counter for executed request
                executedCount++;
                const $$ = cheerio.load(data.html);
                // console.log(data.article);
                data.article.categoryData = [];
                var articleCount = $$('.count').each((index1, item1) => {
                    if (true || index1 < 2) {

                        var categoryWithCount = $$(item1).parent().attr('title').split(" ");
                        data.article.categoryData.push({
                            "categoryType": categoryWithCount[1],
                            "count": categoryWithCount[0]
                        });
                        // //console.log(`Category :${categoryWithCount[1]},Count:${categoryWithCount[0]}`);
                        // console.log(data.article)
                        // console.log(",")
                        // categoryResult.push(data.article);
                        // console.log(categoryResult.length);
                        //console.log(categoryResult);
                    }
                });
                //console.log(`Category :${categoryWithCount[1]},Count:${categoryWithCount[0]}`);
                // console.log(data.article)
                //console.log(",")
                categoryResult.push(data.article);
                // Do not use index of first request as execution of request is asynchroneous so order of index is not correct.
                // console.log(totalCategory, index);
                console.log(totalCategory, executedCount);
                if (totalCategory == executedCount) {
                    console.log("When we areach at Last category then generate file for");
                    //When we reached at Last category request then generate file json file 
                    fs.writeFile('cSharpcornerStatistics.json', JSON.stringify(categoryResult), "utf8", function(err) {
                        // fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
                        if (err) {
                            console.log(err)
                        };
                        console.log('Saved!,c-sharpcorner-statistics.json');
                    });
                }
            })


            //console.log(categoryCount)
            // categoryResult.push(article);
        }
    });
    //  console.log(categoryResult);
    //console.log(categoryResult[0]);
});

/*
//// Due to callback based request we are not able to prepare json data for nested call.
// request(csharpURL, function(err, resp, html) {
//     if (!err) {
//         const $ = cheerio.load(html);
//         var article = {};
//         $(".LinkNormalGray").each((index, item) => {
//             if (true || index == 0) {
//                 console.log($(item).text());
//                 article = { category: $(item).text(), url: $(item).attr("href") };

//                 var categoryCount = getArticleCountByCategory($(item).attr("href")).then((data) => {

//                     const $$ = cheerio.load(data);
//                     var articleCount = $$('.count').each((index1, item1) => {
//                         if (true || index1 == 0) {

//                             console.log("Arrticle count", $$(item1).text());
//                         }
//                     });
//                 })


//                 console.log(categoryCount)
//                 categoryResult.push(article);
//             }
//         });
//         console.log(categoryResult.length);


//     } else { console.log(err) }
// });

*/