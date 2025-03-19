const userName = document.getElementById("username");
const file = document.getElementById("cv");
const btn = document.getElementById("btn");

const emailError = document.querySelector(".emailError");
const fileError = document.querySelector(".fileError");

const validateUserName = () => {
  if (!userName.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    emailError.style.display = "block";
    emailError.textContent = "Please enter a valid email address";
    userName.style.border = "2px solid  hsl(0, 66%, 54%)";
    userName.style.backgroundColor = "hsla(0, 66.00%, 53.90%, 0.24)";
    setTimeout(() => {
      emailError.textContent = "";
      userName.style.border = "";
      emailError.style.display = "none";
      userName.style.backgroundColor = "#e8e8fb";
    }, 4000);
    return false;
  } else {
    emailError.textContent = "";
    userName.style.border = "";
    emailError.style.display = "none";
    userName.style.backgroundColor = "#e8e8fb";
    return true;
  }
};

const updateCv = () => {
  // Update the file name display when a file is selected
  const fileName =
    file.files.length > 0
      ? "File selected: " + file.files[0].name
      : "No file chosen";
  fileError.textContent = fileName;
  if (!(fileError.textContent == "No file chosen")) {
    fileError.style.color = "#000";
  }
  console.log(fileName);
  fileError.style.display = "block";
};

const validateCV = () => {
  if (file.files.length === 0) {
    fileError.textContent = "Please select a file.";
    fileError.style.display = "block";
    fileError.style.color = "hsl(0, 66%, 54%)";
    return false;
  }
  return true;
};

file.addEventListener("change", updateCv);

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const username = validateUserName();
  const file = validateCV();

  if (username && file) {
    location.replace("../jobPage/job.html");
  }
});
