// all the variable for the validation
const fName = document.getElementById("fName");
const lName = document.getElementById("lName");
const id = document.getElementById("id");
const gender = document.getElementsByName("gender");
const dept = document.getElementById("dept");
const year = document.getElementById("yr");
const studentEmail = document.getElementById("semail");
const consent = document.getElementById("consent");
const file = document.getElementById("sImage");

// all the error displays
const fNameError = document.querySelector(".fNameError");
const lNameError = document.querySelector(".lNameError");
const idError = document.querySelector(".idError");
const genderError = document.querySelector(".genderError");
const deptError = document.querySelector(".dError");
const yearError = document.querySelector(".yrError");
const studentEmailError = document.querySelector(".semailError");
const consentError = document.querySelector(".consentError");
const fileError = document.querySelector(".fileError");

// the button
const button = document.querySelector(".btns button");

const backgroundColor = "#f8f7ff";

// all the validation functions
const validateFName = () => {
  if (fName.value == "") {
    fNameError.style.display = "block";
    fNameError.textContent = "Please enter your first-name";
    fName.style.border = "2px solid  hsl(0, 66%, 54%)";
    fName.style.backgroundColor = "hsla(0, 66.00%, 53.90%, 0.24)";
    setTimeout(() => {
      fNameError.textContent = "";
      fName.style.border = "";
      fNameError.style.display = "none";
      fName.style.backgroundColor = backgroundColor;
    }, 10000);
    return false;
  }
  fNameError.textContent = "";
  fName.style.border = "";
  fNameError.style.display = "none";
  fName.style.backgroundColor = backgroundColor;
  return true;
};
const validateLName = () => {
  if (lName.value == "") {
    lNameError.style.display = "block";
    lNameError.textContent = "Please enter your last-name";
    lName.style.border = "2px solid  hsl(0, 66%, 54%)";
    lName.style.backgroundColor = "hsla(0, 66.00%, 53.90%, 0.24)";
    setTimeout(() => {
      lNameError.textContent = "";
      lName.style.border = "";
      lNameError.style.display = "none";
      lName.style.backgroundColor = backgroundColor;
    }, 10000);
    return false;
  }
  lNameError.textContent = "";
  lName.style.border = "";
  lNameError.style.display = "none";
  lName.style.backgroundColor = backgroundColor;
  return true;
};
const validateId = () => {
  let regex = /ETS[0-9]{4}\/[0-9]{2}/;
  if (id.value.length == 0) {
    idError.style.display = "block";
    idError.textContent = "Please enter your identification number";
    id.style.border = "2px solid  hsl(0, 66%, 54%)";
    id.style.backgroundColor = "hsla(0, 66.00%, 53.90%, 0.24)";
    setTimeout(() => {
      idError.textContent = "";
      id.style.border = "";
      idError.style.display = "none";
      id.style.backgroundColor = backgroundColor;
    }, 10000);
    return false;
  } else if (!regex.test(id.value)) {
    idError.style.display = "block";
    idError.textContent = "Enter a valid Id";
    id.style.border = "2px solid  hsl(0, 66%, 54%)";
    id.style.backgroundColor = "hsla(0, 66.00%, 53.90%, 0.24)";
    setTimeout(() => {
      idError.textContent = "";
      id.style.border = "";
      idError.style.display = "none";
      id.style.backgroundColor = backgroundColor;
    }, 10000);
    return false;
  } else {
    idError.textContent = "";
    id.style.border = "";
    idError.style.display = "none";
    id.style.backgroundColor = backgroundColor;
    return true;
  }
};
const validateGender = () => {
  let choose = gender.item(0).checked || gender.item(1).checked ? true : false;

  if (!choose) {
    genderError.style.display = "block";
    genderError.textContent = "Please select your gender";
    setTimeout(() => {
      genderError.textContent = "";
      genderError.style.display = "none";
    }, 10000);
    return false;
  }
  genderError.textContent = "";
  genderError.style.display = "none";
  return true;
};
const validateDept = () => {
  if (dept.value == "") {
    deptError.style.display = "block";
    deptError.textContent = "Please enter your department";
    dept.style.border = "2px solid  hsl(0, 66%, 54%)";
    dept.style.backgroundColor = "hsla(0, 66.00%, 53.90%, 0.24)";
    setTimeout(() => {
      deptError.textContent = "";
      dept.style.border = "";
      deptError.style.display = "none";
      dept.style.backgroundColor = backgroundColor;
    }, 10000);
    return false;
  }
  deptError.textContent = "";
  dept.style.border = "";
  deptError.style.display = "none";
  dept.style.backgroundColor = backgroundColor;
  return true;
};

const validateSEmail = () => {
  if (
    !studentEmail.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)
  ) {
    studentEmailError.style.display = "block";
    studentEmailError.textContent = "Please enter a valid email address";
    studentEmail.style.border = "2px solid  hsl(0, 66%, 54%)";
    studentEmail.style.backgroundColor = "hsla(0, 66.00%, 53.90%, 0.24)";
    setTimeout(() => {
      studentEmailError.textContent = "";
      studentEmail.style.border = "";
      studentEmailError.style.display = "none";
      studentEmail.style.backgroundColor = backgroundColor;
    }, 10000);
    return false;
  } else {
    studentEmailError.textContent = "";
    studentEmail.style.border = "";
    studentEmailError.style.display = "none";
    studentEmail.style.backgroundColor = backgroundColor;
    return true;
  }
};

const validateYear = () => {
  if (year.value == "") {
    yearError.style.display = "block";
    yearError.textContent = "Please select your academic year";
    year.style.border = "2px solid  hsl(0, 66%, 54%)";
    year.style.backgroundColor = "hsla(0, 66.00%, 53.90%, 0.24)";
    setTimeout(() => {
      yearError.textContent = "";
      year.style.border = "";
      yearError.style.display = "none";
      year.style.backgroundColor = backgroundColor;
    }, 10000);
    return false;
  }
  yearError.textContent = "";
  year.style.border = "";
  yearError.style.display = "none";
  year.style.backgroundColor = backgroundColor;
  return true;
};

const validateConsent = () => {
  if (!consent.checked) {
    consentError.style.display = "block";
    consentError.textContent = "You must agree to the agreement values";
    consent.style.border = "2px solid  hsl(0, 66%, 54%)";
    consent.style.backgroundColor = "hsla(0, 66.00%, 53.90%, 0.24)";
    setTimeout(() => {
      consentError.textContent = "";
      consent.style.border = "";
      consentError.style.display = "none";
      consent.style.backgroundColor = backgroundColor;
    }, 10000);
    return false;
  }
  consentError.textContent = "";
  consent.style.border = "";
  consentError.style.display = "none";
  consent.style.backgroundColor = backgroundColor;
  return true;
};

const updateFile = () => {
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

const validateFile = () => {
  if (file.files.length === 0) {
    fileError.textContent = "Please select a file.";
    fileError.style.display = "block";
    fileError.style.color = "hsl(0, 66%, 54%)";
    return false;
  }
  return true;
};

file.addEventListener("change", updateFile);
button.addEventListener("click", (e) => {
  e.preventDefault();
  const fName = validateFName();
  const lName = validateLName();
  const id = validateId();
  const gender = validateGender();
  const dept = validateDept();
  const semail = validateSEmail();
  const year = validateYear();
  const consent = validateConsent();
  const file = validateFile();

  if (
    fName &&
    lName &&
    id &&
    gender &&
    dept &&
    semail &&
    file &&
    year &&
    consent
  ) {
    window.location.replace("../searchJobs/index.html");
  }
});
