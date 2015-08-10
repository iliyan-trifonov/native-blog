export default class Blog {
    constructor (doc, win, config, Api, Router, User, Parse) {
        this.router = new Router({
            'default': this.indexPage.bind(this),
            '#/about': this.aboutPage.bind(this),
            '#/contact': this.contactPage.bind(this),
            '#/posts/([0-9]+)': this.postPage.bind(this),
            '#/categories/([a-z]+)': this.categoryPage.bind(this),
            '#/tags/([a-z-]+)': this.tagPage.bind(this),
            '#/admin/logout': this.adminLogout.bind(this),
            '#/admin': this.checkAdmin.bind(this)
        }, this.menusLoader.bind(this), win);

        this.win = win || window;
        this.doc = doc || document;

        //get the dynamic contents containers
        this.el = this.doc.querySelector('.dynamic-content');
        this.topMenuEl = this.doc.querySelector('.dynamic-content-menu-top');
        this.sideMenuEl = this.doc.querySelector('.dynamic-content-menu');

        this.Api = Api;

        Parse.initialize(config.Parse.APPLICATION_ID, config.Parse.JAVASCRIPT_KEY);

        this.user = new User(Parse);

        this.admin = this.user.adminLoggedIn();

        //parse the current url
        this.router.route(win.location.hash);
    }

    menusLoader () {
        if (!!this.admin) {
            this.sideMenuLoadAdmin();
            this.topMenuLoadAdmin();
        } else {
            this.sideMenuLoad();
            this.topMenuLoad();
        }
    }

    topMenuLoad () {
        this.topMenuEl.innerHTML = `
            <a href="#/" class="header-button">Home</a>
            <a href="#/about" class="header-button">About</a>
            <a href="#/contact" class="header-button">Contact</a>
        `;
    }

    sideMenuLoad () {
        Promise.all([
            //TODO: change to: this.Api.posts.list({recent: true}):
            this.Api.posts.recent(),
            this.Api.tags.list(),
            this.Api.categories.list()
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

            tplItems.push(`
                <section class="menu-block">
                <div class="menu-title">
                    Admin
                </div>
                <ul>
                <li>
                    <a href="#/admin">Admin Login</a>
                </li>
                </ul>
            </section>
            `);

            this.sideMenuEl.innerHTML += tplItems.join('');
        });
    }

    topMenuLoadAdmin () {
        this.topMenuEl.innerHTML = `
            <a href="#/admin" class="header-button">Home</a>
            <a href="#/admin/logout" class="header-button">Logout</a>
        `;
    }

    adminLogout () {
        this.user.adminLogout();
        this.admin = false;
        this.win.location.hash = '#/';
    }

    sideMenuLoadAdmin () {
        this.sideMenuEl.innerHTML = `
            <section class="menu-block">
                <div class="menu-title">
                    Posts
                </div>
                <ul>
                    <li>
                        <a href="#/admin/posts">Edit posts</a>
                    </div>
                    </li>
                </ul>
            </section>
            <section class="menu-block">
                <div class="menu-title">
                    Tags
                </div>
                <ul>
                    <li>
                        <a href="#/admin/tags">Edit tags</a>
                    </div>
                    </li>
                </ul>
            </section>
            <section class="menu-block">
                <div class="menu-title">
                    Categories
                </div>
                <ul>
                    <li>
                        <a href="#/admin/categories">Edit categories</a>
                    </div>
                    </li>
                </ul>
            </section>
            `;
    }

    loadPosts (options = {}) {
        let template = [];
        return this.Api.posts.list(options).then(posts => {
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
            <p>Native Blog: a small blog application built with native JavaScript(ES6), HTML5 and CSS3.</p>
            <p>Tools used for creating the site and its bundles: SASS, Browserify and Gulp.</p>
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

    checkAdmin () {
        if (this.user.adminLoggedIn()) {
            this.adminHomePage();
        } else {
            this.user.adminExists().then(count => {
                if (count && 1 === count) {
                    this.adminLoginPage();
                } else {
                    this.adminRegPage();
                }
            }, error => {
                //console.error('adminExists error', error);
            });
        }
    }

    adminRegPage () {
        this.el.innerHTML = `
            <h1>Admin registration</h1>
            <section>
                <form class="login-form" method="post">
                    <div class="form-error hidden">
                        <div class="form-error-message"></div>
                        <br/>
                    </div>
                    Username: <input type="text" class="form-username" /><br/>
                    Password: <input type="password" class="form-password pass1"/><br/>
                    Password confirm: <input type="password" class="form-password pass2"/><br/>
                    <input type="submit" />
                </form>
            </section>
        `;

        let errorEl = this.doc.querySelector('.form-error');
        let errorMessEl = this.doc.querySelector('.form-error-message');
        let username = this.doc.querySelector('.form-username');
        let pass1 = this.doc.querySelector('.pass1');
        let pass2 = this.doc.querySelector('.pass2');

        let submitFunc = () => {
            errorEl.classList.add('hidden');

            if (!pass1.value || !pass2.value || pass1.value !== pass2.value) {
                errorMessEl.innerHTML = 'Error: no passwords given or passwords don\'t match!';
                errorEl.classList.remove('hidden');
                return;
            }

            this.user.adminRegister(username.value, pass1.value).then(function (user) {
                //console.info('registered', user);
            }, function (error) {
                errorMessEl.innerHTML = 'Error: ' + error.message;
                errorEl.classList.remove('hidden');
            });
        };

        this.doc.querySelector('.login-form')
            .addEventListener('submit', function (ev) {
                ev.preventDefault();
                submitFunc();
            }, false);
    }

    adminLoginPage () {
        this.el.innerHTML = `
            <h1>Admin login</h1>
            <section>
                <form class="login-form" method="post">
                    <div class="form-error hidden">
                        <div class="form-error-message"></div>
                        <br/>
                    </div>
                    <input type="text" class="form-username" />
                    <input type="password" class="form-password"/>
                    <input type="submit" />
                </form>
            </section>
        `;

        let errorEl = this.doc.querySelector('.form-error');
        let errorMessEl = this.doc.querySelector('.form-error-message');
        let username = this.doc.querySelector('.form-username');
        let password = this.doc.querySelector('.form-password');

        let submitFunc = () => {
            errorEl.classList.add('hidden');
            this.user.adminLogin(username.value, password.value).then(user => {
                this.admin = true;
                //this.win.location.hash = '#/admin';
                this.adminHomePage();
                this.topMenuLoadAdmin();
                this.sideMenuLoadAdmin();
            }, error => {
                errorMessEl.innerHTML = 'Error: ' + error.message;
                errorEl.classList.remove('hidden');
            });
        };

        this.doc.querySelector('.login-form')
            .addEventListener('submit', function (ev) {
                ev.preventDefault();
                submitFunc();
            }, false);
    }

    adminHomePage () {
        this.el.innerHTML = `
            <h1>Admin home</h1>
            <p>Welcome!</p>
        `;
    }
}
