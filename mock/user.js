var Users = {
    data:[],
    doesUserExist:function(username){
        return !(this.data[username] === undefined);
    },
    init(){
        if (data.users !== undefined) {
            users = JSON.parse(localStorage.users);
        }
    },
    getPassword:function(username){
        return this.data[username];
    },
    setUSer:function(user){
        this.data[user.username] = user.password;
    }

}
module.exports = Users;


//export default class Users {
//    static getPassword(username){
//        return Users.data[username];
//    }
//    static doesUserExist(username){
//        return !(Users.data[username] === undefined);
//    }
//    static setUser(username, password){
//        data.users[username] = password;
//    }
//}
//Users.data;
