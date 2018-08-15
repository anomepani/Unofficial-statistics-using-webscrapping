var fs = require('fs');
var cheerio = require('cheerio');
var fetch = require("node-fetch");
var rootUrl = "https://github.com";
var targetURL = "https://github.com/topics";
//var targetURL = "https://github.com/twbs/bootstrap";
var categoryResult = [];
var executedCount = 0;
var totalTopics = 0;
const getRequestAsync = async(url, option) => {
    const response = await fetch(url);
    const responseHtml = await response.text();
    return {
        body: responseHtml,
        article: option
    }
};

getRequestAsync(targetURL, {}).then((response) => {
    console.log("Request for All github featured topic started");

    var $ = cheerio.load(response.body);
    totalTopics = $(".list-style-none li.py-4 a").length;
    $(".list-style-none li.py-4 a").each((i, ele) => {
        var $selector = $(ele);
        var topicUrl = rootUrl + $selector.attr("href");
        var projectName = $selector.find(".link-gray-dark").text();
        //console.log(projectName, topicUrl);
        //getAllFeaturedGithubStats(topicUrl);
        getTopGithubTopics(topicUrl);

    });
})

function getTopGithubTopics(targetURL) {
    //console.log("getRequestAsync -> Requested github started");
    getRequestAsync(targetURL, {}).then((response) => {
        //console.log("getRequestAsync -> Requested github completed");
        var $ = cheerio.load(response.body);
        //totalTopics = $(".border-bottom .py-4 h3 a").length;
        $("h3.f3 a").each((i, ele) => {
            if (i == 0) {
                var $selector = $(ele);
                var topicUrl = rootUrl + $selector.attr("href") + "?o=desc&s=stars";
                //var projectName = $selector.find(".link-gray-dark").text();
                console.log(topicUrl);
                getAllFeaturedGithubStats(topicUrl);
            }
        });
    });

}

function getAllFeaturedGithubStats(targetURL) {
    getRequestAsync(targetURL, {}).then((response) => {
        executedCount++;
        // console.log("getRequestAsync -> Requested github started");
        var $ = cheerio.load(response.body);
        var githubStats = {};
        githubStats.githubUrl = targetURL;
        githubStats.author = $("[itemprop=author]").text().trim();
        githubStats.project = $("strong[itemprop=name]").text().trim();
        githubStats.topics = [];
        var currentSelector = "";
        $(".js-social-count").each((index, item) => {
            currentSelector = $(item);
            statsAttribute = currentSelector.attr("aria-label");
            if (statsAttribute.includes("watching")) {
                githubStats.watch = currentSelector.text().trim();
            } else if (statsAttribute.includes("starred")) {
                githubStats.stars = currentSelector.text().trim();
            } else if (statsAttribute.includes("forked")) {
                githubStats.forked = currentSelector.text().trim();
            }
        });

        $(".numbers-summary li").each((index, item) => {
            currentSelector = $(item);
            var statsAttribute = currentSelector.text().trim();
            if (statsAttribute.includes("commits")) {
                githubStats.commits = statsAttribute.split("\n")[0];
            } else if (statsAttribute.includes("branch")) {
                githubStats.branch = statsAttribute.split("\n")[0];
            } else if (statsAttribute.includes("releases")) {
                githubStats.releases = statsAttribute.split("\n")[0];
            } else if (statsAttribute.includes("contributors")) {
                githubStats.contributors = statsAttribute.split("\n")[0];
            }
        });

        $(".topic-tag").each((index, item) => {
            githubStats.topics.push($(item).text().trim());
        });
        categoryResult.push(githubStats);
        console.log("getRequestAsync -> Requested github completed", executedCount, categoryResult.length, totalTopics);

        if (totalTopics == executedCount) {
            console.log("We reached at Last category then generate file for");
            //When we reached at Last category request then generate file json file 
            fs.writeFile('github-statistics-updated.json', JSON.stringify(categoryResult), "utf8", function(err) {
                // fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
                if (err) {
                    console.log(err)
                };
                console.log('Saved!,github-statistics.json');
            });
        }
    });
}