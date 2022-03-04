"use strict";

const User = require("../../models/User");

const output = {
  home: (req, res) => {
    // logger.info('GET / 304 "홈 화면으로 이동"');
    res.render("home/index");
  },
  login: (req, res) => {
    // logger.info('GET /login 304 "로그인 화면으로 이동"');
    res.render("home/login");
  },
  register: (req, res) => {
    // logger.info('GET /register 304 "회원가입 화면으로 이동"');
    res.render("home/register");
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    return res.json(response); //클라이언트에게 전송

    // const url = {
    //   method: "POST",
    //   path: "/login",
    //   status: response.err ? 400 : 200,
    // };

    // log(response, url);
    // return res.status(url.status).json(response);
  },

  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();

    const url = {
      method: "POST",
      path: "/register",
      status: response.err ? 400 : 200,
    };
    log(response, url);
    return res.status(url.status).json(response);
  },
};

module.exports = {
  // 내보내기
  output,
  process,
};
