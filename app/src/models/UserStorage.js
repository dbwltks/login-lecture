"use strict";

class UserStorage {
  static #users = {
    //은닉
    id: ["a"],
    pw: ["a"],
    name: ["운영자"],
  };

  static getUsers(...args) {
    //은닉을 메서드로
    const users = this.#users;
    const newUsers = args.reduce((newUsers, args) => {
      if (users.hasOwnProperty(args)) {
        newUsers[args] = users[args];
      }
      return newUsers;
    }, {});
    return newUsers;
  }
  static getUserInfo(id) {
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users);
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});
    return userInfo;
  }
}

module.exports = UserStorage;
