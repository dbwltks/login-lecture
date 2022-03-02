"use strict";

const id = document.querySelector("#id"),
  pw = document.querySelector("#pw"),
  confirmPw = document.querySelector("#confirm-pw"),
  name = document.querySelector("#name"),
  dateOfBirth = document.querySelector("#date-of-birth"),
  group = document.querySelector("#group"),
  registerBtn = document.querySelector("button");

registerBtn.addEventListener("click", register);

function register() {
  if (!id.value) return alert("아이디를 입력해주십시오.");
  if (pw.value !== confirmPw.value)
    return alert("비밀번호가 일치하지 않습니다.");

  const req = {
    id: id.value,
    pw: pw.value,
    confirmPw: confirmPw.value,
    name: name.value,
    dateOfBirth: dateOfBirth.value,
    group: group.value,
  };
  console.log(req);
  console.log(req, JSON.stringify(req));
  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req), //문자열로바꿈  json으로 감쌈
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/index";
      } else {
        alert(res.message);
      }
    })
    .catch((err) => {
      console.error(new Error("회원가입 중 에러 발생"));
    });
}
