"use strict";

const db = require("../config/db");
class UserStorage {
  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users); // => [id, pw, name, dateOfBirth, group]
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});
    return userInfo;
  }
  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data);
    if (isAll) return users;

    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static getUsers(isAll, ...fields) {}

  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE id = ?;";
      db.query(query, [id], (err, data) => {
        if (err) REJECT(`${err}`);
        resolve(data[0]);
      });
    });
  }

  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO users(id, pw, name, dateOfBirth, gender, society) VALUE(?, ?, ?, ?, ?, ?);";
      db.query(
        query,
        [
          userInfo.id,
          userInfo.pw,
          userInfo.name,
          userInfo.dateOfBirth,
          userInfo.gender,
          userInfo.society,
        ],
        (err) => {
          if (err) REJECT(`${err}`);
          resolve({ success: true });
        }
      );
    });
  }
}

module.exports = UserStorage;
