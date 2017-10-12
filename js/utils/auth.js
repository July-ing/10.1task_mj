import { post } from './fetch';
let localStorage = global.window.localStorage;
var auth = {
    login(username,password, callback){
        if (this.loggedIn()) {
            callback(true);
            return;
        }

        const result = post('/api/login', { username, password });
        result.then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
            if(res.authenticated){
                localStorage.token = res.token;
                localStorage.username = username;
                callback(true);
            } else {
                callback(false, res.error);
            }
        });
    },

    logout(callback) {
        post('/api/logout',{}).then(() =>{
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            callback(true);
        });
    },

    loggedIn(){
        return !!localStorage.token;
    },

    register(username, password, callback){
        const result = post('/api/register',{username,password});
        result.then((res) => {
            return res.json();
        }).then((res) => {
            if(res.registered === true){
                this.login(username, password, callback);
            } else {
                callback(false, res.error);
            }
        });
    },


}
module.exports = auth;