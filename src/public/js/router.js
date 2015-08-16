export default class Router {
    constructor (data, menuLoader, win) {
        this.data = data || {};
        this.menuLoader = menuLoader || function (){};
        this.win = win || window;
        this.isAdmin = false;

        //monitor the hash change
        this.win.addEventListener(
            "hashchange",
            () => this.route(this.win.location.hash),
            false
        );
    }

    route (hash) {
        let matched, param;
        let subData = this.isAdmin ? this.data.admin : this.data.public;
        let paths = Object.keys(subData);
        for (let path of paths) {
            let regex = new RegExp(path);
            let res = hash.match(regex);
            if (res) {
                matched = subData[path];
                param = res[1];
                break;
            }
        }

        if (matched) {
            matched(param);
        } else if (typeof subData['default'] === 'function') {
            subData['default']();
        }
        this.menuLoader();
        this.win.scrollTo(0, 0);
    }

    setAdmin (value) {
        this.isAdmin = !!value;
    }
}
