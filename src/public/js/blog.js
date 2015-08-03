import Router from './router.js';
import { Api } from './api.js';

export default class Blog {
    constructor (doc, win) {
        this.router = new Router({
            'default': this.indexPage.bind(this),
            '#/about': this.aboutPage.bind(this),
            '#/contact': this.contactPage.bind(this),
            '#/post/([0-9]+)': this.postPage.bind(this)
        });

        //get the main dynamic contents container
        this.el = doc.querySelector('.dynamic-content');

        //parse the current url
        this.router.route(win.location.hash);

        //monitor the hash change
        win.addEventListener(
            "hashchange",
            () => this.router.route.call(this.router, win.location.hash),
            false
        );
    }

    indexPage () {
        let template ='';
        Api.posts.get().then(posts => {
            for (let post of posts) {
                template += `
                <article>
                    <div class="post-title">
                        <a href="#">${post.title}</a>
                    </div>
                    <div class="post-info">
                        By: ${post.author.name} | ${post.date} | ${post.tags.join(', ')}
                    </div>
                    <div class="post-text">${post.text}</div>
                </article>`;
            }

            this.el.innerHTML = template;
        });
    }

    aboutPage () {
        this.el.innerHTML = 'About';
    }

    contactPage () {
        this.el.innerHTML = 'Contact';
    }

    postPage (postID) {
        this.el.innerHTML = `Post ${postID}}`;
    }
}
