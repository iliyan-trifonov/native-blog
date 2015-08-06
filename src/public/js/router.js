export default class Router {
    constructor (data, sideMenu, win) {
        this.data = data || {};
        this.sideMenu = sideMenu || function (){};
        this.win = win || window;

        //monitor the hash change
        this.win.addEventListener(
            "hashchange",
            () => this.route(this.win.location.hash),
            false
        );
    }

    route (hash) {
        let matched, param;
        let paths = Object.keys(this.data);
        for (let path of paths) {
            let regex = new RegExp(path);
            let res = hash.match(regex);
            if (res) {
                matched = this.data[path];
                param = res[1];
                break;
            }
        }

        if (matched) {
            matched(param);
        } else if (typeof this.data['default'] === 'function') {
            this.data['default']();
        }
        this.sideMenu();
        this.win.scrollTo(0, 0);
    }
}
