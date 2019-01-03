# Unofficial statistics for c-sharpcorner, github using webscrapping
This repo contains Simple Node JS Program to generate c-sharpcorner and github website statistics based on fetch and cheerio.js

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

## How to run this app

1. First Install Required Package by running npm install command

```js
$ npm install
```
2. Then run file executing below command
```js
$ node app.js 
or 
$ node github-app.js
```

### Disclaimer - I have created simple node js app for learning webscraping to collect statistics based on c-sharpcorner and github website..
