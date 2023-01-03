const setupEvents = () => {
  setupNavLinkEvents();
  setupNavMenuEvents();
  setupSubmitEvent();
};

const setupNavLinkEvents = () => {
  const $navLinks = document.querySelectorAll(".nav-link");
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
  const $navMenus = document.querySelectorAll(".nav-menu");
  $navMenus.forEach(function ($navMenu) {
    $navMenu.addEventListener("mouseleave", function () {
      const $navLink = $navMenu.parentElement.querySelector(".nav-link");
      $navLink.classList.remove("active");
    });
  });
};

const setupSubmitEvent = () => {
  const $form = document.getElementById("form");
  if ($form) {
    $form.addEventListener("submit", (e) => {
      try {
        e.preventDefault();
        const formData = new FormData($form);
        const name = formData.get("name");
        const email = formData.get("email");
        console.log(`Name: ${name}`, `Email: ${email}`);

        checkInputs($form)
          .then(() => {
            alert(`O usuário ${name} foi registrado com o e-mail ${email}`);
          })
          .catch(() => {
            console.log("Oops...");
          });
      } catch (e) {
        console.log("Oops 2...");
      }
    });
  }
};

// function checkInputName() {
//   return new Promise((resolve, reject) => {
//     //get the values from the inputs and remove whitespace
//     const $name = document.getElementById("name");
//     const nameValue = $name.value.trim();
//     if (!nameValue) {
//       return setErrorFor($name, "Name cannot be blank.").then(() => {
//         reject(false);
//       });
//     }

//     return setSuccessFor($name).then(() => {
//       resolve(true);
//     });
//   });
// }

// function checkInputEmail() {
//   return new Promise((resolve, reject) => {
//     //get the values from the inputs and remove whitespace
//     const $email = document.getElementById("email");
//     const emailValue = $email.value.trim();
//     if (!emailValue) {
//       return setErrorFor($email, "Email cannot be blank.").then(() => {
//         reject(false);
//       });
//     }
//     return setSuccessFor($email).then(() => {
//       resolve(true);
//     });
//   });
// }

function checkInputs($form) {
  // return Promise.all([checkInputName(), checkInputEmail()]);
  return validatorTaissa($form)
}

function setErrorFor($input, message) {
  return new Promise((resolve) => {
    const $formControl = $input.closest(".form-control");
    const $messageError = $formControl.querySelector(".message-error");
    $messageError.textContent = message;
    $formControl.className = "form-control error";
    return resolve(true);
  });
}

function setSuccessFor($input) {
  return new Promise((resolve) => {
    const $formControl = $input.closest(".form-control");
    $formControl.className = "form-control success";
    setTimeout(() => {
      resolve(true);
    }, 100);
  });
}

const validatorFunctions = {
  email: (value) => {
    const emailValue = value.trim();
    if (!emailValue) {
      return false;
    }
    return true;
  },
  name: (value) => {
    const nameValue = value.trim();
    if (!nameValue) {
      return false;
    }
    return true;
  },
};

const validatorMessages = {
  email: "Email cannot be blank.",
  name: "Name cannot be blank.",
};

const validatorTaissa = ($form) => {
  const VT_KEY = "vt-type";
  const VT_REQUIRED = "vt-required";
  const formData = new FormData($form);
  const $inputs = $form.querySelectorAll("inputs");
  let formState = true;

  $inputs.forEach(($input) => {
    const validatorType = $input.dataset[VT_KEY];
    const isRequired = $input.dataset[VT_REQUIRED];
    const inputName = $input.name;
    const inputValue = formData.get(inputName);

    let inputState = true;

    if (isRequired && !inputValue) {
      inputState = false;
    }

    if (
      inputValue &&
      validatorType &&
      !validatorFunctions[validatorType](inputValue)
    ) {
      inputState = false;
    }

    if (inputState) {
      setSuccessFor($input);
    } else {
      setErrorFor($input, validatorMessages[validatorType]);
    }

    formState = formState && inputState;
  });

  return formState;
};

window.addEventListener("load", (event) => {
  setupEvents();
});
