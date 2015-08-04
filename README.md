### Native Blog: a small blog application built with native JavaScript, HTML5 and CSS3

These days JavaScript, HTML5 and CSS3 allow us to build serious applications without the need of additional frameworks.
With the latest ES6(EcmaScript 2015) we have modules, classes, promises, template strings with tag functions, 
destructuring, generators, the for-of loop and many more. This makes it easier and without the need of big overhead to
create a complete dynamic web application.

## Install

We need Babel and ES6 module loader until the browsers fully support the ES6 syntax. Install them with npm:

    npm install babel-core es6-module-loader --prefix=src/public

The command above create a node_modules/ directory inside src/public from where our application will load the js files.

## The application

The main duty of the application is to be a blog system with posts, comments, categories, tags, authors and admin part.
The blog functionality sits over a framework containing a router, an API service, a data store, templates.
HTML5 tags like `<main>`, `<header>`, `<footer>`, `<section>`, `<article>`, etc. are used. Other HTML tags used are 
`<div>`, `<span>`, `<p>`, etc.
CSS3 syntax like `flex boxes`, `round corners`, `animations`, etc. is used, the rest of the CSS code is as we know it 
before CSS3.
The main app.js file is loaded with SystemJS and from there with automatic transpiling everything is ES6 syntax.

## TODO

 1. Remove Babel and ES6 module loader and leave only the native code when the browsers fully support ES6.
 2. Use SASS to keep the CSS code dry.
 3. Use Gulp to watch and build the final production code. This will help with the transpiling and the css pre-processor.
 4. Remove the sample data stored in static arrays and use a back-end like Parse.
