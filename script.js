const $form = document.getElementById("form");

const setupEvents = () => {
  setupNavLinkEvents();
  setupNavMenuEvents();
};

const setupNavLinkEvents = () => {
  const $navLinks = document.querySelectorAll(".a_parent");
  $navLinks.forEach(function ($navLink) {
    $navLink.addEventListener("mouseenter", function () {
      $navLinks.forEach(($internalNavLink) =>
        $internalNavLink.classList.remove("active")
      );
      $navLink.classList.add("active");
    });
  });
};

const setupNavMenuEvents = () => {
  const $navMenus = document.querySelectorAll(".menu");
  $navMenus.forEach(function ($navMenu) {
    $navMenu.addEventListener("mouseleave", function () {
      const $navLink = $navMenu.parentElement.querySelector(".a_parent");
      $navLink.classList.remove("active");
    });
  });
};

$form.addEventListener("submit", (e) => {
  try {
    e.preventDefault();
    checkInputs()
      .then(() => {
        alert(
          "O usuário " +
            name.value +
            "foi registrado com o e-mail " +
            email.value
        );
      })
      .catch(() => {
        console.log("Oops...");
      });
  } catch (e) {
    console.log("Oops 2...");
  }
});

function checkInputName() {
  //get the values from the inputs and remove whitespace
  return new Promise((resolve, reject) => {
    const $name = document.getElementById("name");
    const nameValue = $name.value.trim();
    if (!nameValue) {
      return setErrorFor($name, "Name cannot be blank.").then(() => {
        reject(false);
      });
    }

    return setSuccessFor($name).then(() => {
      resolve(true);
    });
  });
}

function checkInputEmail() {
  //get the values from the inputs and remove whitespace
  return new Promise((resolve, reject) => {
    const $email = document.getElementById("email");
    const emailValue = $email.value.trim();
    if (!emailValue) {
      return setErrorFor($email, "Email cannot be blank.").then(() => {
        reject(false);
      });
    }
    return setSuccessFor($email).then(() => {
      resolve(true);
    });
  });
}

function checkInputs() {
  return Promise.all([checkInputName(), checkInputEmail()]);
}

function setErrorFor($input, message) {
  return new Promise((resolve) => {
    const $formControl = $input.closest('.form-control');
    const $small = $formControl.querySelector("small");
    $small.innerText = message;
    $formControl.className = "form-control error";
    return resolve(true);
  });
}

function setSuccessFor($input) {
  return new Promise((resolve) => {
    const $formControl = $input.closest('.form-control');
    $formControl.className = "form-control success";
    setTimeout(() => {
      resolve(true);
    }, 100);
  });
}

window.addEventListener("load", (event) => {
  setupEvents();
});
