"use strict";

const id = document.querySelector("#id"),
  pw = document.querySelector("#pw"),
  confirmPw = document.querySelector("#confirm-pw"),
  name = document.querySelector("#name"),
  dateOfBirth = document.querySelector("#date-of-birth"),
  group = document.querySelector("#group"),
  gender = document.querySelector("#gender"),
  registerBtn = document.querySelector("button");

registerBtn.addEventListener("click", register);

function register() {
  if (!id.value) return alert("아이디를 입력해주십시오.");
  if (!pw.value) return alert("비밀번호를 입력해주십시오.");
  if (pw.value !== confirmPw.value)
    return alert("비밀번호가 일치하지 않습니다.");
  if (!name.value) return alert("이름를 입력해주십시오.");
  if (!dateOfBirth.value) return alert("생년월일를 입력해주십시오.");
  if (!gender.value) return alert("성별을 선택해주십시오.");
  if (!group.value) return alert("소속단체를 선택해주십시오.");

  const req = {
    id: id.value,
    pw: pw.value,
    confirmPw: confirmPw.value,
    name: name.value,
    dateOfBirth: dateOfBirth.value,
    gender: gender.value,
    group: group.value,
  };
  // console.log(req);
  // console.log(req, JSON.stringify(req));
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
        location.href = "/";
      } else {
        alert(res.message);
      }
    })
    .catch((err) => {
      console.error(new Error("회원가입 중 에러 발생"));
    });
}
