import Router from './router.js';

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
        let template = `<article>
                <div class="post-title">
                    <a href="#">In non urna tristique nisl pellentesque imperdiet</a>
                </div>
                <div class="post-info">
                    By: Iliyan Trifonov | July 11, 2015 | JavaScript, Web Development
                </div>
                <div class="post-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at cursus magna.
                    Nullam congue sapien fringilla aliquet facilisis. Morbi quis elit in arcu suscipit auctor.
                    Quisque lobortis nulla magna. Curabitur leo libero, elementum tristique augue id, rhoncus iaculis
                    ipsum.
                    Phasellus in suscipit lacus, et rhoncus nulla. Donec tristique faucibus efficitur.
                </div>
            </article>

            <article>
                <div class="post-title">
                    <a href="#">Morbi efficitur posuere eros</a>
                </div>
                <div class="post-info">
                    By: Iliyan Trifonov | July 11, 2015 | JavaScript, Web Development
                </div>
                <div class="post-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at cursus magna.
                    Nullam congue sapien fringilla aliquet facilisis. Morbi quis elit in arcu suscipit auctor.
                    Quisque lobortis nulla magna. Curabitur leo libero, elementum tristique augue id, rhoncus iaculis
                    ipsum.
                    Phasellus in suscipit lacus, et rhoncus nulla. Donec tristique faucibus efficitur.
                </div>
            </article>

            <article>
                <div class="post-title">
                    <a href="#">Fusce ante tortor</a>
                </div>
                <div class="post-info">
                    By: Iliyan Trifonov | July 11, 2015 | JavaScript, Web Development
                </div>
                <div class="post-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at cursus magna.
                    Nullam congue sapien fringilla aliquet facilisis. Morbi quis elit in arcu suscipit auctor.
                    Quisque lobortis nulla magna. Curabitur leo libero, elementum tristique augue id, rhoncus iaculis
                    ipsum.
                    Phasellus in suscipit lacus, et rhoncus nulla. Donec tristique faucibus efficitur.
                </div>
            </article>

            <article>
                <div class="post-title">
                    <a href="#">Maecenas a eros interdum, dictum enim sed, malesuada felis</a>
                </div>
                <div class="post-info">
                    By: Iliyan Trifonov | July 11, 2015 | JavaScript, Web Development
                </div>
                <div class="post-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at cursus magna.
                    Nullam congue sapien fringilla aliquet facilisis. Morbi quis elit in arcu suscipit auctor.
                    Quisque lobortis nulla magna. Curabitur leo libero, elementum tristique augue id, rhoncus iaculis
                    ipsum.
                    Phasellus in suscipit lacus, et rhoncus nulla. Donec tristique faucibus efficitur.
                </div>
            </article>

            <article>
                <div class="post-title">
                    <a href="#">Donec vel tempor tortor, vitae luctus magna</a>
                </div>
                <div class="post-info">
                    By: Iliyan Trifonov | July 11, 2015 | JavaScript, Web Development
                </div>
                <div class="post-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at cursus magna.
                    Nullam congue sapien fringilla aliquet facilisis. Morbi quis elit in arcu suscipit auctor.
                    Quisque lobortis nulla magna. Curabitur leo libero, elementum tristique augue id, rhoncus iaculis
                    ipsum.
                    Phasellus in suscipit lacus, et rhoncus nulla. Donec tristique faucibus efficitur.
                </div>
            </article>`;
        this.el.innerHTML = template;
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
