const userName = document.querySelector("#username");
const emailError = document.querySelector(".emailError");
const password = document.getElementById("password");
const passwordError = document.querySelector(".passwordError");
const button = document.querySelector(".Lgn-btn");

// validating the username
const validateUsername = () => {
  if (!userName.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    emailError.textContent = "Please enter a valid email address";
    userName.style.border = "2px solid  hsl(0, 66%, 54%)";
    userName.style.backgroundColor = "hsla(0, 66.00%, 53.90%, 0.24)";
    setTimeout(() => {
      emailError.textContent = "";
      userName.style.border = "";
      userName.style.backgroundColor = "#e8e8fb";
    }, 10000);
    return false;
  } else {
    emailError.textContent = "";
    userName.style.border = "";
    userName.style.backgroundColor = "#e8e8fb";
    return true;
  }
};

// validating the password
const validatePassword = () => {
  if (password.value.length == 0 || password.value.length < 8) {
    passwordError.textContent = password.value.length == 0 ? "Please enter a password" : "password must be more than 8 characters";
    password.style.border = "2px solid hsl(0, 66%, 54%)";
    password.style.backgroundColor = "hsla(0, 66.00%, 53.90%, 0.24)";
    setTimeout(() => {
      password.style.border = "";
      passwordError.textContent = "";
      password.style.backgroundColor = "#e8e8fb";
    }, 10000);
    return false;
  } else {
    password.style.border = "";
    passwordError.textContent = "";
    password.style.backgroundColor = "#e8e8fb";
    return true;
  }
};

const onchangePassword = () => {
  if (password.value.length < 8) {
    passwordError.textContent = "password must be more than 8 characters";
    password.style.border = "2px solid hsl(0, 66%, 54%)";
    password.style.backgroundColor = "hsla(0, 66.00%, 53.90%, 0.24)";
    setTimeout(() => {
      password.style.border = "";
      passwordError.textContent = "";
      password.style.backgroundColor = "#e8e8fb";
    }, 10000);
  } else {
    password.style.border = "";
    passwordError.textContent = "";
    password.style.backgroundColor = "#e8e8fb";
  }
};

const validate = (e) => {
  e.preventDefault();
  const email = validateUsername();
  const password = validatePassword();

  if (email && password) {
    window.location.replace("../searchJobs/index.html");
  }
};

button.addEventListener("click", (e) => validate(e));
