import Router from './router.js';

export default class Blog {
    constructor () {
    }

    init () {
        this.router = new Router({
            'default': this.indexPage,
            '#/about': this.aboutPage,
            '#/contact': this.contactPage,
            '#/post/[0-9]+': this.postPage
        });
        window.addEventListener(
            "hashchange",
            () => this.router.route.call(this.router, window.location.hash),
            false
        );
    }

    indexPage () {
        alert('index page');
    }

    aboutPage () {
        alert('about page');
    }

    contactPage () {
        alert('contact page');
    }

    postPage () {
        alert('post page');
    }
}
