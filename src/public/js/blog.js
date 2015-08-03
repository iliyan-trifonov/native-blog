import Router from './router.js';
import { Api } from './api.js';

export default class Blog {
    constructor (doc, win) {
        this.router = new Router({
            'default': this.indexPage.bind(this),
            '#/about': this.aboutPage.bind(this),
            '#/contact': this.contactPage.bind(this),
            '#/post/([0-9]+)': this.postPage.bind(this)
        }, this.sideMenuLoad.bind(this), win);

        //get the dynamic contents containers
        this.el = doc.querySelector('.dynamic-content');
        this.sideMenuEl = doc.querySelector('.dynamic-content-menu');

        //parse the current url
        this.router.route(win.location.hash);

        //monitor the hash change
        win.addEventListener(
            "hashchange",
            () => this.router.route.call(this.router, win.location.hash),
            false
        );
    }

    sideMenuLoad () {
        Promise.all([
            //TODO: change to: Api.posts.get({recent: true}):
            Api.posts.recent(),
            Api.tags.get(),
            Api.categories.get()
        ])
        .then(([posts, tags, cats]) => {
            let tplBlockStart = `
            <section class="menu-block">
                <div class="menu-title">
                    Recent Posts
                </div>
                <ul>`,

            tplBlockEnd = `
                </ul>
            </section>`,

            tplItems = [];

            tplItems.push(tplBlockStart);

            for (let post of posts) {
                tplItems.push(`
                    <li>
                        <div class="flex-container">
                            <div class="flex-item-arrow">&rarr;</div>
                            <div class="flex-item-title">
                                <a href="#/post/${post.id}">${post.title}</a>
                            </div>
                        </div>
                    </li>`);
            }

            tplItems.push(tplBlockEnd);

            this.sideMenuEl.innerHTML = tplItems.join('');

            //

            tplBlockStart = `
            <section class="menu-block">
                <div class="menu-title">
                    Tags
                </div>
                <div class="tags">`,

            tplBlockEnd = `
                </div>
            </section>`,

            tplItems = [];

            tplItems.push(tplBlockStart);

            for (let tag of tags) {
                tplItems.push(`<a href="#/tag/${tag.id}">${tag.name}</a> `);
            }

            tplItems.push(tplBlockEnd);

            this.sideMenuEl.innerHTML += tplItems.join('');

            //

            tplBlockStart = `
            <section class="menu-block">
                <div class="menu-title">
                    Categories
                </div>
                <ul>`,

            tplBlockEnd = `
                </ul>
            </section>`,

            tplItems = [];

            tplItems.push(tplBlockStart);

            for (let cat of cats) {
                tplItems.push(`
                <li>
                    <div class="flex-container">
                        <div class="flex-item-arrow">&rarr;</div>
                        <div class="flex-item-title">
                            <a href="#/category/${cat.id}">${cat.name}</a>
                        </div>
                    </div>
                </li>`);
            }

            tplItems.push(tplBlockEnd);

            this.sideMenuEl.innerHTML += tplItems.join('');
        });
    }

    indexPage () {
        let template = [];
        Api.posts.get().then(posts => {
            for (let post of posts) {
                template.push(`
                <article>
                    <div class="post-title">
                        <a href="#">${post.title}</a>
                    </div>
                    <div class="post-info">
                        By: ${post.author.name} | ${post.date} | ${post.tags.join(', ')}
                    </div>
                    <div class="post-text">${post.text}</div>
                </article>`);
            }

            this.el.innerHTML = template.join('');
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
