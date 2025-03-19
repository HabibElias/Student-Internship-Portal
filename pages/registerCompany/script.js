// all the variables for the inputs
const companyName = document.getElementById("company-name");
const locations = document.getElementById("location");
const email = document.getElementById("email");
const description = document.getElementById("description");
const consent = document.getElementById("consent");
const file = document.querySelector("#company-image");

// all the variables for the error displays
const emailError = document.querySelector(".emailError");
const locationError = document.querySelector(".lError");
const cNameError = document.querySelector(".cNameError");
const dError = document.querySelector(".dError");
const consentError = document.querySelector(".consentError");
const fileError = document.querySelector(".fileError");

// the btn
const button = document.querySelector(".register-btn button");

const backgroundColor = "#f8f7ff";

const validName = () => {
  if (companyName.value == "") {
    cNameError.style.display = "block";
    cNameError.textContent = "Please enter a Name";
    companyName.style.border = "2px solid  hsl(0, 66%, 54%)";
    companyName.style.backgroundColor = "hsla(0, 66.00%, 53.90%, 0.24)";
    setTimeout(() => {
      cNameError.textContent = "";
      companyName.style.border = "";
      cNameError.style.display = "none";
      companyName.style.backgroundColor = backgroundColor;
    }, 10000);
    return false;
  }
  cNameError.textContent = "";
  companyName.style.border = "";
  cNameError.style.display = "none";
  companyName.style.backgroundColor = backgroundColor;
  return true;
};

const validLocation = () => {
  if (locations.value.length == 0) {
    locationError.style.display = "block";
    locationError.textContent = "Please Enter your locations";
    locations.style.border = "2px solid  hsl(0, 66%, 54%)";
    locations.style.backgroundColor = "hsla(0, 66.00%, 53.90%, 0.24)";
    setTimeout(() => {
      locationError.textContent = "";
      locations.style.border = "";
      locationError.style.display = "none";
      locations.style.backgroundColor = backgroundColor;
    }, 10000);
    return false;
  }
  locationError.textContent = "";
  locations.style.border = "";
  locationError.style.display = "none";
  locations.style.backgroundColor = backgroundColor;
  return true;
};

const updateImage = () => {
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

const validateImage = () => {
  if (file.files.length === 0) {
    fileError.textContent = "Please select a file.";
    fileError.style.display = "block";
    fileError.style.color = "hsl(0, 66%, 54%)";
    return false;
  }
  return true;
};

file.addEventListener("change", updateImage);

const validEmail = () => {
  if (!email.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    emailError.style.display = "block";
    emailError.textContent = "Please enter a valid email address";
    email.style.border = "2px solid  hsl(0, 66%, 54%)";
    email.style.backgroundColor = "hsla(0, 66.00%, 53.90%, 0.24)";
    setTimeout(() => {
      emailError.textContent = "";
      email.style.border = "";
      emailError.style.display = "none";
      email.style.backgroundColor = backgroundColor;
    }, 10000);
    return false;
  } else {
    emailError.textContent = "";
    email.style.border = "";
    emailError.style.display = "none";
    email.style.backgroundColor = backgroundColor;
    return true;
  }
};

const validDescription = () => {
  if (
    description.value.length == 0 ||
    description.value.length < 80 ||
    description.value.length > 320
  ) {
    dError.style.display = "block";
    dError.textContent =
      description.value.length == 0
        ? "Please enter your company description"
        : "Description must be (80 - 320) characters";
    description.style.border = "2px solid  hsl(0, 66%, 54%)";
    description.style.backgroundColor = "hsla(0, 66.00%, 53.90%, 0.24)";
    setTimeout(() => {
      dError.textContent = "";
      description.style.border = "";
      dError.style.display = "none";
      description.style.backgroundColor = backgroundColor;
    }, 10000);
    return false;
  }
  dError.textContent = "";
  description.style.border = "";
  dError.style.display = "none";
  description.style.backgroundColor = backgroundColor;
  return true;
};

const validConsent = () => {
  if (!consent.checked) {
    consentError.style.display = "block";
    consentError.textContent =
      "You must consent to this term to continue further";
    setTimeout(() => {
      consentError.textContent = "";
      consentError.style.display = "none";
    }, 10000);
    return false;
  }
  consentError.textContent = "";
  consentError.style.display = "none";
  return true;
};

button.addEventListener("click", (e) => {
  e.preventDefault();
  const email = validEmail();
  const name = validName();
  const description = validDescription();
  const consent = validConsent();
  const location = validLocation();
  const file = validateImage();

  if (email && name && description && consent && location && file) {
    window.location.replace("../searchJobs/index.html");
  }
});
