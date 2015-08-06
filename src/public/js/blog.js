import Router from './router.js';
import { Api } from './api.js';

export default class Blog {
    constructor (doc, win) {
        this.router = new Router({
            'default': this.indexPage.bind(this),
            '#/about': this.aboutPage.bind(this),
            '#/contact': this.contactPage.bind(this),
            '#/posts/([0-9]+)': this.postPage.bind(this),
            '#/categories/([a-z]+)': this.categoryPage.bind(this),
            '#/tags/([a-z-]+)': this.tagPage.bind(this)
        }, this.sideMenuLoad.bind(this), win);

        //get the dynamic contents containers
        this.el = doc.querySelector('.dynamic-content');
        this.sideMenuEl = doc.querySelector('.dynamic-content-menu');

        //parse the current url
        this.router.route(win.location.hash);
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

            this.sideMenuEl.innerHTML += tplItems.join('&nbsp;');

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

    loadPosts (options = {}) {
        let template = [];
        return Api.posts.get(options).then(posts => {
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
                        By:&nbsp;${post.author.name}&nbsp;|&nbsp;${post.date}&nbsp;|&nbsp;${tagsHtml.join(', ')}
                    </div>
                    <div class="post-text">${post.text}</div>
                </article>`);
            }

            return template.join('');
        });
    }

    indexPage () {
        this.loadPosts().then(postsHtml => {
            this.el.innerHTML = postsHtml;
        });
    }

    aboutPage () {
        this.el.innerHTML = `
            <h1>About</h1>
            <section class="about-page">
            <p>Native Blog: a small blog application built with native JavaScript, HTML5 and CSS3</p>
            <p>
              <a href="https://github.com/iliyan-trifonov/native-blog" target="_blank">Check the source code here.</a>
            </p>
            </section>
        `;
    }

    contactPage () {
        let linksHtml = [];
        [
            'https://twitter.com/iliyan_trifonov',
            'https://github.com/iliyan-trifonov',
            'http://blog.iliyan-trifonov.com'
        ].forEach(function (link) {
            linksHtml.push(`<a href="${link}" target="_blank">${link}</a><br/><br/>`);
        });
        this.el.innerHTML = `
            <h1>Contact</h1>
            <section class="contact-page">
            <p>Poke me on:<br/><br/>
                ${linksHtml.join('')}
            </p>
            </section>
        `;
    }

    postPage (postId) {
        this.loadPosts({ postId: postId }).then(postsHtml => {
            this.el.innerHTML = postsHtml;
        });
    }

    categoryPage (catSlug) {
        this.loadPosts({ catSlug: catSlug }).then(postsHtml => {
            this.el.innerHTML = postsHtml;
        });
    }

    tagPage (tagSlug) {
        this.loadPosts({ tagSlug: tagSlug }).then(postsHtml => {
            this.el.innerHTML = postsHtml;
        });
    }
}
