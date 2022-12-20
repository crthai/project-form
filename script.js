var a_parent = document.querySelectorAll(".a_parent");
const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");

a_parent.forEach(function (a_parent_item) {
  a_parent_item.addEventListener("click", function () {
    a_parent.forEach(function (a_parent_item) {
      a_parent_item.classList.remove("active");
    });
    a_parent_item.classList.add("active");
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputName() {
  //get the values from the inputs and remove whitespace
  const nameValue = name.value.trim();
  const checkInput = new Promise((resolve) => {
    if (nameValue === "") {
      setErrorFor(name, "Name cannot be blank.");
    } else {
      setSuccessFor(name);
    }
  });
}
function checkInputEmail() {
  //get the values from the inputs and remove whitespace
  const emailValue = email.value.trim();
  const checkInput = new Promise((resolve) => {
    if (emailValue === "") {
      setErrorFor(email, "Email cannot be blank.");
    } else {
      setSuccessFor(email);
    }
  });
}

async function checkInputs() {
  try {
    const checkFirstInput = await checkInputName();
    const checkSecondaryInput = await checkInputEmail();
    alert(
      "O usuário " + name.value + "foi registrado com o e-mail " + email.value
    );
  } catch {
    console.log("Ops...");
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;

  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  formControl.className = "form-control success";
}
