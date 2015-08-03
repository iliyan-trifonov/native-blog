export default class Router {
    constructor (data) {
        this.data = {};

        if (data) {
            this.data = data;
        }
    }

    route (hash) {
        //TODO: use regex to catch dynamic urls
        if (this.data[hash] !== undefined) {
            this.data[hash]();
        } else {
            this.data['default']();
        }
    }
}
