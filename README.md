### Native Blog: a small blog application built with native JavaScript, HTML5 and CSS3

[![devDependency Status](https://david-dm.org/iliyan-trifonov/native-blog/dev-status.svg)](https://david-dm.org/iliyan-trifonov/native-blog#info=devDependencies)

These days JavaScript, [HTML5](http://www.w3schools.com/html/html5_intro.asp) 
and [CSS3](http://www.w3schools.com/css/css3_intro.asp) allow us to build serious applications without the need of 
additional frameworks.

With the latest [ES6](http://es6-features.org)(EcmaScript 2015) we have modules, classes, promises, template strings 
with tag functions, destructuring, generators, the for-of loop and many more. This makes it easier and without the 
need of big overhead to create a complete dynamic web application.

The application is a front-end one. If it needs a back-end, small modifications in the API module should be done 
to connect it with services like [Parse](https://parse.com/) or with a private one.

The app is currently in alpha stage. Check the TODO section here for what is to be done.

[See it in action here](https://native-blog.iliyan-trifonov.com "Native Blog").

## Install

Install the tools needed for building the final JS and CSS bundles:

    npm install -g gulp
    npm install
    
Run the build:

    gulp build

Load [src/public/index.html](src/public/index.html) in your browser through a web server to see the application.

To automatically build the bundles run the watch task and then start modifying .js and [.scss](http://sass-lang.com/) 
files:

    gulp watch
    
Also running [gulp](http://gulpjs.com/) alone will run the default gulp task which builds the final files and starts 
the watchers.

## The application

The main duty of the application is to be a blog system with posts, comments, categories, tags, authors and admin part.
The blog functionality sits over a framework containing a router, an API service, a data store, templates.
HTML5 tags like `<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>`, etc. are used. Other HTML tags 
used are `<div>`, `<span>`, `<p>`, etc.
CSS3 syntax like `flex boxes`, `round corners`, `animations`, etc. is used, the rest of the CSS code is as we know it 
before CSS3. [SASS](http://sass-lang.com/) is used with variables, nesting, partials, mixins, extend, etc. 
The router supports loading directly deep urls, no need to load the home page first.

The main application file is [app.js](src/public/js/app.js). When the browsers support ES6 completely it can be loaded 
directly from [index.html](src/public/index.html) without the need of transpiling 
and [Browserify](http://browserify.org/). 
Until then we need [Babel](http://babeljs.io/) to transpile the ES6 code to an ES5 one and also convert the ES6 module 
syntax to a [CommonJS](http://www.commonjs.org/specs/modules/1.0/) one - Browserify comes in handy here because it uses 
the CommonJS syntax to create the final bundle where all modules sit in one single file. We benefit from the build 
tasks because all JavaScript and CSS/SASS code is converted to its final syntax understood by the browsers today and is 
also minified.
A JS map file is created to allow debugging the final transpiled and minified code by showing us the ES6 original.

## TODO

 1. Create the admin part.
 3. Remove the sample data stored in static arrays and use a back-end like Parse.
