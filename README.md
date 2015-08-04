### Native Blog: a small blog application built with native JavaScript, HTML5 and CSS3

These days JavaScript, HTML5 and CSS3 allow us to build serious applications without the need of additional frameworks.
With the latest ES6(EcmaScript 2015) we have modules, classes, promises, template strings with tag functions, 
destructuring, generators, the for-of loop and many more. This makes it easier and without the need of big overhead to
create a complete dynamic web application.

The application is a front-end one. If it needs a back-end, small modifications in the API module should be done 
to connect it with services like Parse or with a private one.

The app is currently in alpha stage. Check the TODO section here for what is to be done.

[See it in action here](https://native-blog.iliyan-trifonov.com "Native Blog").

## Install

Install the tools needed for building the final JS and CSS bundles:

    npm install -g gulp
    npm install
    
Run the build:

    gulp build

Load `src/public/index.html` in your browser through a web server to see the application.

To automatically build the bundles run the watch task and then start modifying .js and .scss files:

    gulp watch
    
Also running `gulp` alone will run the default gulp task which builds the final files and starts the watchers.

## The application

The main duty of the application is to be a blog system with posts, comments, categories, tags, authors and admin part.
The blog functionality sits over a framework containing a router, an API service, a data store, templates.
HTML5 tags like `<main>`, `<header>`, `<footer>`, `<section>`, `<article>`, etc. are used. Other HTML tags used are 
`<div>`, `<span>`, `<p>`, etc.
CSS3 syntax like `flex boxes`, `round corners`, `animations`, etc. is used, the rest of the CSS code is as we know it 
before CSS3. The router supports loading directly deep urls, no need to load the index page first.

The main applicatoin file is `app.js`. When the browsers support ES6 completely it can be loaded from index.html 
without the need of transpiling and browserify. Until then we need Babel to transpile the ES6 code to a ES5 one and 
also convert the ES6 module syntax to a CommonJS one - browserify comes in handy here because it uses the CommonJS 
syntax to create the final bundle where all modules sit in one single file. We benefit from the build tasks because all 
JavaScript and CSS/SASS code is converted to its final syntax understood by the browsers today and is also minified.

## TODO

 1. Change the scripts build task to create the source map for the ES6 code for easy debugging.
 2. Finish with the front(guest) part.
 3. Data module: link posts with categories, authors, etc. logically.
 4. Create the admin part.
 5. Remove Babel and Browserify and leave only the native code when the browsers fully support ES6.
 6. Remove the sample data stored in static arrays and use a back-end like Parse.
