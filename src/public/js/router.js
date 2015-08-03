export default class Router {
    constructor (data, win) {
        this.data = data || {};
        this.win = win || window;
    }

    route (hash) {
        //TODO: use regex to catch dynamic urls
        if (typeof this.data[hash] === 'function') {
            this.data[hash]();
            this.win.scrollTo(0, 0);
        } else {
            this.data['default']();
        }
    }
}
