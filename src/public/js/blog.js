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
            '#/admin/posts/edit/([0-9]+)': this.adminPostEdit.bind(this),
            '#/admin/posts': this.adminPosts.bind(this),
            '#/admin': this.checkAdmin.bind(this),
            '#/privacy-policy': this.privacyPolicy.bind(this),
            '#/cookie-policy': this.cookiePolicy.bind(this)
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
            <ul class="menu">
                <li><a href="#/" class="header-button">Home</a></li>
                <li><a href="#/about" class="header-button">About</a></li>
                <li><a href="#/contact" class="header-button">Contact</a></li>
            </ul>
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

    cookiePolicy () {
        this.el.innerHTML = `
            <section class="cookie-policy">
            <h1>Cookie Policy for Native Blog</h1><br />
            <h2>What Are Cookies</h2><br />
            As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.<br />
            <br />
            For more general information on cookies see the <a href="http://en.wikipedia.org/wiki/HTTP_cookie">Wikipedia article on HTTP Cookies...</a><br />
            <h2>How We Use Cookies</h2><br />
            We use cookies for a variety of reasons detailed below. Unfortunately is most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.<br />
            <h2>Disabling Cookies</h2><br />
            You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.<br />
            <h2>The Cookies We Set</h2><br />
            If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.<br />
            <br />
            We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.<br />
            <br />
            <br />
            <br />
            <br />
            <h2>Third Party Cookies</h2><br />
            In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.<br />
            <br />
            From time to time we test new features and make subtle changes to the way that the site is delivered. When we are still testing new features these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring we understand which optimisations our users appreciate the most.<br />
            <br />
            In some cases we may provide you with custom content based on what you tell us about yourself either directly or indirectly by linking a social media account. These types of cookies simply allow us to provide you with content that we feel may be of interest to you.<br />
            <br />
            <br />
            <h2>More Information</h2><br />
            Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site. However if you are still looking for more information then you can contact us through one of our preferred contact methods.<br />
            <br />
            <strong>Email:</strong> iliyan.trifonov@gmail.com<br />
            <br />
            </section>
        `;
    }

    privacyPolicy () {
        this.el.innerHTML = `
            <section class="privacy-policy">
            <h1>Privacy Policy</h1>
            The privacy of Native Blog's visitors is important to us. At Native Blog, we recognize that the privacy of our visitor's personal information is important. Here is information on what types of personal information we receive and collect when you visit Native Blog, and how we safeguard your information. We never sell your personal information to third parties.<br/>
            <br/>
            Log Files<br/>
            <br/>
            We collect and use the data contained in log files. The information in the log files include your IP (internet protocol) address, your ISP (internet service provider, such as AOL or Shaw Cable), the browser used to visit our site (such as Internet Explorer or Firefox), the time you visited our site and which pages you visited within our site.<br/>
            <br/>
            Cookies and Web Beacons<br/>
            <br/>
            We do use cookies to store information, such as your personal preferences when you visit our site. This could include only showing you a popup once in your visit, or the ability to login to some of our features, such as forums.<br/>
            <br/>
            Third Party Advertisements<br/>
            <br/>
            We also use third party advertisements on Native Blog to support our site. Some of these advertisers may use technology such as cookies and web beacons when they advertise on our site, which will also send these advertisers (such as Google through the Google AdSense program) information including your IP address, your ISP , the browser you used to visit our site, and in some cases, whether you have Flash installed. This is generally used for geotargeting purposes (showing New York real estate ads to someone in New York, for example) or showing certain ads based on specific sites visited (such as showing cooking ads to someone who frequents cooking sites).<br/>
            <br/>
            You can choose to disable or selectively turn off our cookies or third-party cookies in your browser settings, or by managing preferences in programs such as Norton Internet Security; however, this can affect how you are able to interact with our site as well as other websites. This could include the inability to login to services or programs, such as logging into forums or accounts.<br/>
            </section>
        `;
    }

    topMenuLoadAdmin () {
        this.topMenuEl.innerHTML = `
            <ul class="menu">
                <li><a href="#/admin" class="header-button">Home</a></li>
                <li><a href="#/admin/logout" class="header-button">Logout</a></li>
            </ul>
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
                    <header class="post-title">
                        <a href="#/posts/${post.id}">${post.title}</a>
                    </header>
                    <aside class="post-info">
                        By:&nbsp;${post.author.name}&nbsp;|&nbsp;${post.date}&nbsp;|&nbsp;${tagsHtml.join(', ')}
                    </aside>
                    <main class="post-text">${post.text}</main>
                </article>`);
            }

            return template.join('');
        });
    }

    indexPage () {
        if (this.admin) {
            this.win.location.hash = '#/admin';
            return;
        }

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
                    <div class="flex-container-form">
                        <div class="flex-item-form">
                        Username:
                        </div>
                        <div class="flex-item-form">
                            <input type="text" class="form-username" />
                        </div>
                    </div>
                    <div class="flex-container-form">
                        <div class="flex-item-form">
                            Password:
                        </div>
                        <div class="flex-item-form">
                            <input type="password" class="form-password pass1"/>
                        </div>
                    </div>
                    <div class="flex-container-form">
                        <div class="flex-item-form">
                            Password confirm:
                        </div>
                        <div class="flex-item-form">
                            <input type="password" class="form-password pass2"/>
                        </div>
                    </div>
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

            this.user.adminRegister(username.value, pass1.value).then(user => {
                this.admin = true;
                //this.win.location.hash = '#/admin';
                this.adminHomePage();
                this.menusLoader();
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
                    <div class="login-form">
                        <div class="form-error hidden">
                            <div class="form-error-message"></div>
                            <br/>
                        </div>
                        <input type="text" class="form-username" placeholder="username" />
                        <input type="password" class="form-password" placeholder="password" />
                        <input type="submit" />
                    </div>
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
                this.menusLoader();
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
            <section>
                <p>Welcome!</p>
            </section>
        `;
    }

    adminPosts () {
        let result = [];
        result.push(`
            <h1>Admin: Posts</h1>
        `);
        this.Api.posts.list({titleOnly: true}).then(posts => {
            result.push(`
                <section>
            `);

            for (let post of posts) {
                result.push(`
                    <div class="admin-post-title">
                        <a href="#/admin/posts/edit/${post.id}">
                            ${post.title}
                        </a>
                    </div>
                `);
            }

            result.push(`
                </section>
            `);

            this.el.innerHTML = result.join('');
        });
    }

    adminPostEdit (postId) {
        let result = [];
        result.push(`
            <h1>Admin: Edit Post</h1>
        `);
        Promise.all([
            this.Api.posts.list({ postId: postId }),
            this.Api.categories.list()]
        ).then(([p, categories]) => {
            result.push(`
                <section class="post-edit">
            `);

            let post = p[0];

            let select_options = [];
            for (let cat of categories) {
                select_options.push(`
                <option value="${cat.id}" ${cat.id === post.category.id ? 'selected' : ''}>${cat.name}</option>
            `);
            }

            result.push(`
            <form id="post-edit-form">
                <div>Post Title:</div>
                <div>
                    <input type="text" name="title" id="title" value="${post.title}" placeholder="post title" />
                </div>
                <div>Post Text:</div>
                <div><textarea placeholder="post text">${post.text}</textarea></div>
                <div>Category:</div>
                <div>
                    <select name="category" id="category">
                        ${select_options.join('')}
                    </select>
                </div>
                <div><input type="submit"></div>
            </form>
            `);
                result.push(`
                </section>
            `);

            this.el.innerHTML = result.join('');

            let postForm = this.doc.querySelector('#post-edit-form');
            postForm.addEventListener('submit', function (ev) {
                ev.preventDefault();
                alert('post submitted!');
            }, false);
        });
    }
}
