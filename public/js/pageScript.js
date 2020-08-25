//Login/Register Form DOM
//const form = document.getElementsByTagName('form');
const loginBorder = document.getElementById("login");
const regBorder = document.getElementById("register");
const login = document.querySelector(".login");
const register = document.querySelector(".register");
const loginBtn = document.getElementById("btn-login");
const regBtn = document.getElementById("btn-register");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm-password");
const errorMsg = document.getElementById("error-message");
const infoMsg = document.querySelector(".info-msg");

//Login/Register Form Events
loginBorder.addEventListener("click", () => {
  loginBorder.classList.add("button-border");
  regBorder.classList.remove("button-border");
  login.classList.remove("display");
  register.classList.add("display");
});

regBorder.addEventListener("click", () => {
  loginBorder.classList.remove("button-border");
  regBorder.classList.add("button-border");
  login.classList.add("display");
  register.classList.remove("display");
});

register.classList.add("display");
loginBorder.classList.add("button-border");
/*body.style.backgroundColor = 'transparent';*/

password.addEventListener("input", validPassword);
function validPassword(e) {
  if (e.target.value.length < 8) {
    regBtn.setAttribute("disabled", "true");
  } else {
    regBtn.removeAttribute("disabled");
  }
}

//Hamburder Menu DOM
const menuBtn = document.querySelector(".hamburger");
const menus = document.querySelectorAll(".nav-2-item");
const navBar = document.querySelector(".nav-2");
const loginBox = document.querySelector(".login-box");

//Hamburger Menu Events
navBar.style.display = "none";
menuBtn.addEventListener("click", () => {
  if (navBar.style.display === "none") {
    navBar.style.display = "block";

    menus.forEach((menu) => {
      //menu.classList.toggle('fade');

      loginBox.style.display = "block";
    });
  } else {
    navBar.style.display = "none";
  }
});
