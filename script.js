'use strict';

// login form

let loginForm=document.querySelector('.login-form');
document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar=document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    loginForm.classList.remove('active');
}


// registration form

let registrationForm = document.getElementById("registrationForm");


registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  validateRegistrationForm();
});




function validateRegistrationForm(events) {
  let regEmailInput = document.getElementById("regEmail");
  let regPasswordInput = document.getElementById("regPassword");
  let regPasswordInput2 = document.getElementById("regPassword2");
  let regEmailError = document.getElementById("regEmailError");
  let regPasswordError = document.getElementById("regPasswordError");
  let regPasswordError2 = document.getElementById("regPasswordError2");
  let radioElements = document.querySelectorAll('[name="gender"]');
  let checkBoxAgree = document.getElementById("checkfield").checked;
  let genderError = document.getElementById("errorGender");
  let agreeError = document.getAnimations("errorAgree");

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(regEmailInput.value)) {
    regEmailError = "Please enter a valid email address";
  } else {
    regEmailError.textContent = "";
  }

  // Password should be at least 6 characters
  if (regPasswordInput.value.length < 6) {
    regPasswordError.textContent = "Password should be at least 6 characters";
  } else {
    regPasswordError.textContent = "";
  }

  if (regPasswordInput.value !== regPasswordInput2.value) {
    regPasswordError2.textContent = "Passwords do not match";
  } else {
    regPasswordError2.textContent = "";
  }

  // radio
  let gender = false;
  radioElements.forEach((item) => {
    if (item.checked) {
      gender = true;
    }
  });

  if (!gender) {
    genderError.textContent = "Please select your gender";
  } else {
    genderError.textContent = "";
  }

  // checkbox
  if (!checkBoxAgree) {
    agreeError.textContent = "You must agree to our terms and conditions";
  } else {
    agreeError.textContent = "";
  }

  // If no errors, submit the form
  if (
    regEmailError.textContent === "" &&
    regPasswordError.textContent === "" &&
    regPasswordError2.textContent === "" &&
    genderError.textContent === "" &&
    agreeError.textContent === ""
  ) {
    events.target.submit();
  }
}


  let password = document.getElementById("regPassword");
  let password2 = document.getElementById("regPassword2");
  let password3 = document.getElementById("logInPassword");
  let eyeIcon = document.getElementById("eyeIcon");
  let eyeIcon2 = document.getElementById("eyeIcon2");
  let eyeIcon3 = document.getElementById("eyeIcon3");
  
  // first eye
  eyeIcon.addEventListener("click", function () {
    if (password.type == "password") {
      password.setAttribute("type", "text");
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    } else {
      password.setAttribute("type", "password");
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    }
  });
  // second eye
  eyeIcon2.addEventListener("click", function () {
    if (password2.type == "password") {
      password2.setAttribute("type", "text");
      eyeIcon2.classList.remove("fa-eye");
      eyeIcon2.classList.add("fa-eye-slash");
    } else {
      password2.setAttribute("type", "password");
      eyeIcon2.classList.remove("fa-eye-slash");
      eyeIcon2.classList.add("fa-eye");
    }
  });
 
 


window.onscroll = () =>{
    navbar.classList.remove('active');
}

// teachers (xml request)

let currentPage=1;
let totalPages;

function getUsers(page){
  let request=new XMLHttpRequest();
  
  request.addEventListener('load',function(){
    let response = request.responseText;
    let responseInfoJs = JSON.parse(response);

   let information=document.createDocumentFragment();
    responseInfoJs.data.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = `${item.first_name} ${item.last_name}`;
    li.classList = "teachers-li";
    let image = document.createElement("img");
    image.src = item.avatar;
    image.setAttribute("alt", "user");
    image.classList.add("image-user");

    li.appendChild(image);

    information.appendChild(li);
    });
    document.getElementById("ul-id").innerHTML= " ";
    document.getElementById("ul-id").appendChild(information);

    totalPages = responseInfoJs.total_pages;
  });

  request.addEventListener("error", function () {
    let p = document.createElement("p");
    p.textContent = "Server Error";
    document.getElementById('teachers').appendChild(p);
  });

  request.open("GET", 'https://reqres.in/api/users?page' +page);
  request.send();
}

getUsers(currentPage);
 