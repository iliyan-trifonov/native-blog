export default class User {
    constructor (Parse) {
        this.Parse = Parse;
        this.user = this.getUser();
    }

    getUser () {
        return this.Parse.User.current();
    }

    adminLoggedIn () {
        //this.user = this.getUser();
        return this.user && true === this.user.get('admin');
    }

    adminLogin (username, password) {
        return this.Parse.User.logIn(username, password);
    }

    adminRegister (username, password) {
        let user = new this.Parse.User();
        user.set("username", username);
        user.set("password", password);
        user.set("admin", true);
        return user.signUp();
    }

    adminExists () {
        let query = new this.Parse.Query(this.Parse.User);
        query.equalTo('admin', true);
        return query.count();
    }

    adminLogout () {
        return this.Parse.User.logOut();
    }
}
