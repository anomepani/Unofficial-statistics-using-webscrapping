# Unofficial-c-sharpcorner-statistics
This repo contains Simple Node JS Program to generate c-sharpcorner website statistics based on fetch and cheerio.js

This is kind of Web scrapping app, which I have built using help of cheerio.js and fetch api for node js

Cheerio.js is Fast, flexible, and lean implementation of core jQuery designed specifically for the server.

```js
const cheerio = require('cheerio')
const $ = cheerio.load('<h2 class="title">Hello world</h2>')

$('h2.title').text('Hello there!')
$('h2').addClass('welcome')

$.html()
//=> <h2 class="title welcome">Hello there!</h2>
```

## cheeio Installation
`npm install cheerio`


node-fetch is A light-weight module that brings window.fetch to Node.js
The Fetch API provides an interface for fetching resources (including across the network).
It will seem familiar to anyone who has used XMLHttpRequest,
but the new API provides a more powerful and flexible feature set.

## node-fetch Installation

Stable release (`2.x`)

```sh
$ npm install node-fetch --save
```


### Disclaimer - This not official version of c-sharpcorner app,I have created simple node js app for learning webscraping to collect statistics based on official c-sharpcorner website..
