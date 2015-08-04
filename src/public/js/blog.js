import Router from './router.js';
import { Api } from './api.js';

export default class Blog {
    constructor (doc, win) {
        this.router = new Router({
            'default': this.indexPage.bind(this),
            '#/about': this.aboutPage.bind(this),
            '#/contact': this.contactPage.bind(this),
            '#/posts/([0-9]+)': this.postPage.bind(this)
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
                                <a href="#/posts/${post.id}">${post.title}</a>
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
                tplItems.push(`<a href="#/tags/${tag.slug}">${tag.name}</a> `);
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
                            <a href="#/categories/${cat.slug}">${cat.name}</a>
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
                let tags = post.tags;
                let tagsHtml = [];
                for (let tag of tags) {
                    tagsHtml.push(`<a href="#/tags/${tag.slug}">${tag.name}</a>`);
                }
                template.push(`
                <article>
                    <div class="post-title">
                        <a href="#/posts/${post.id}">${post.title}</a>
                    </div>
                    <div class="post-info">
                        By: ${post.author.name} | ${post.date} | ${tagsHtml.join(', ')}
                    </div>
                    <div class="post-text">${post.text}</div>
                </article>`);
            }

            this.el.innerHTML = template.join('');
        });
    }

    aboutPage () {
        this.el.innerHTML = `
            <h1>About</h1>
            <p>Native Blog: a small blog application built with native JavaScript, HTML5 and CSS3</p>
        `;
    }

    contactPage () {
        this.el.innerHTML = `
            <h1>Contact</h1>
            <section class="contact-page">
            <p>Poke me on:<br/><br/>
                <a href="http://blog.iliyan-trifonov.com" target="_blank">http://blog.iliyan-trifonov.com</a>,<br/><br/>
                <a href="https://github.com/iliyan-trifonov" target="_blank">https://github.com/iliyan-trifonov</a><br/><br/>
                or <a href="https://twitter.com/iliyan_trifonov" target="_blank">https://twitter.com/iliyan_trifonov</a></p>
            </section>
        `;
    }

    postPage (postID) {
        Api.posts.getById(postID).then(post => {
            let tagsHtml = [];
            for (let tag of post.tags) {
                tagsHtml.push(`<a href="#/tags/${tag.slug}">${tag.name}</a>`);
            }
            this.el.innerHTML = `
                <article>
                    <div class="post-title">
                        ${post.title}</a>
                    </div>
                    <div class="post-info">
                        By: ${post.author.name} | ${post.date} | ${tagsHtml.join(', ')}
                    </div>
                    <div class="post-text">${post.text}</div>
                </article>`;
        });
    }
}
