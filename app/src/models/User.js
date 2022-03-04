"use strict";

const { response } = require("express");
const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    try {
      const user = await UserStorage.getUserInfo(client.id);
      if (user) {
        if (user.id === client.id && user.pw === client.pw) {
          return { success: true };
        }
        return { success: false, message: "비밀번호가 틀렸습니다." };
      }
      return { success: false, message: "존재하지 않는 아이디입니다." };
    } catch (err) {
      return { success: false, message: err };
    }
  }

  async register() {
    const user = new User(req.body);
    try {
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, message: err };
    }
  }
}

module.exports = User;
