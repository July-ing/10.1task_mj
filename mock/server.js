//import Users from './users';
var Users = require('./user');
var app = require('koa')();
var router = require('koa-router')();
var koabody = require('koa-body')({multiple: true});
let users;

router.post('/api/login', koabody, function *(next){
    console.log('login');
    console.log(this.request.body);

    if(Users.doesUserExist(this.request.body.username)){
        if (this.request.body.password !== Users.getPassword(this.request.body.username)) {
            this.response.body = {
                authenticated: false,
                error: {
                    type: "password-wrong"
                }
            };
        } else {
            this.response.body = {
                authenticated: true,
                token: Math.random().toString(36).substring(7)
            };
        }
    } else {
        this.response.body = {
            authenticated:false,
            error: {
                type: "user-doesnt-exist"
            }
        };
    }
})

router.post('/api/logout', koabody, function *(next){
    console.log('logout');

    console.log(this.request.body);
    this.response.body = {
        check:true
    }
})

router.post('/api/register', koabody, function *(next){
    console.log('register');
    console.log(this.request.body);

    if(!Users.doesUserExist(this.request.body.username)){
        //users[this.request.body.username] = this.request.body.password;
        Users.setUSer(this.request.body);
        this.response.body = {
            registered: true
        }
    } else {
        this.response.body = {
            registered:false,
            error: {
                type: "username-exists"
            }
        };
    }
})
app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000, ()=>console.log(router.post));
