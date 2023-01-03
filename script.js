const $form = document.getElementById("form");

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
  $form.addEventListener("submit", (e) => {
  try {
    let formData = new FormData($form);
    console.log(
      "Name:" + formData.get("name"),
      "Email:" + formData.get("email"),
    );
    let name = formData.get("name");
    let email = formData.get("email");

    e.preventDefault();
    checkInputs()
      .then(() => {
        alert(
          "O usuário " +
            name +
            " foi registrado com o e-mail " +
            email
        );
      })
      .catch(() => {
        console.log("Oops...");
      });
  } catch (e) {
    console.log("Oops 2...");
  }
});
} 

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
    const $messageError = $formControl.querySelector('.message-error');
    $messageError.textContent = message;
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

const getType = (value) => {
  const type = Object.prototype.toString.call(value).slice(1, -1).split(" ");

  return type && type[1].toLowerCase();
};

const validations = {
  isEmpty: ({ value }) => {
      const valueIsType = getType(value);

      if (valueIsType === "string") return !value.trim().length;

      return true;
  },
  email: ({ value }) => {
      const isEmpty = validations.isEmpty({ value });
      const returnValue = {
          isValid: false,
          message: null,
      };

      if (isEmpty === true) {
          returnValue.message = "Email is required";
          return returnValue;
      }

      return returnValue;
  },
  username: ({ value }) => {
      const isEmpty = validations.isEmpty({ value });
      const returnValue = {
          isValid: !isEmpty,
          message: null,
      };
      if (isEmpty === true) {
        returnValue.message = "Email is required";
        return returnValue;
    }
      return returnValue;
  },
};

window.addEventListener("load", (event) => {
  setupEvents();
});