
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

const showSucessAlert = ($form) => {
  setTimeout(function() {   
    const name = $form.querySelector('input[name="name"]').value;
    const email = $form.querySelector('input[name="email"]').value;
    alert(`O usuário ${name} foi registrado com o e-mail ${email}`); }, 
  1);
}

const setupSubmitEvent = () => {
  const $form = document.getElementById("form");
  if ($form) {
    $form.addEventListener("submit", (e) => {
        e.preventDefault();
        const validForm = validateForm($form);
        if(validForm){
          showSucessAlert($form);
        }
    });
  }
};

function setErrorFor($input, message) {
    const $formControl = $input.closest(".form-control");
    const $messageError = $formControl.querySelector(".message-error");
    $messageError.textContent = message;
    $formControl.className = "form-control error";
}

function setSuccessFor($input) {
    const $formControl = $input.closest(".form-control");
    $formControl.className = "form-control success";
}

const fieldValidations = {
  email: ["required", "validEmail"],
  name: ["required"]
};

const validateByType = {
  required: (value) => {
    return value;
  },
  validEmail: (value) => {
    var regex = /\S+@\S+\.\S+/;
    return regex.test(value);
  }
}

const getErrorMessageByValidationType = {
  required: (fieldName) => `${fieldName} cannot be blank.`,
  validEmail: () => `Invalid email format`
};

const buildErrorMessage = (fieldErrors, inputName) => {
  const firstValidationFailed = fieldErrors[0];
  const errorMessage = getErrorMessageByValidationType[firstValidationFailed](inputName)
  return errorMessage;
}

const checkFieldValidations = (inputName, inputValue) => {
  const validations = fieldValidations[inputName];
  let fieldErrors = []; 
  validations.forEach((validation) => {
    if(!validateByType[validation](inputValue)){
      fieldErrors.push(validation);
    }
  })
  return fieldErrors;
}

const validateForm = ($form) => {
  const $inputs = $form.querySelectorAll("input");
  let formIsValid = true;

  $inputs.forEach(($input) => {
    const inputName = $input.name;
    const inputValue = $input.value;
    const fieldErrors = checkFieldValidations(inputName, inputValue);

    const fieldHasErrors = fieldErrors.length > 0;
    if (fieldHasErrors){
      formIsValid = false;
      const errorMessage = buildErrorMessage(fieldErrors, inputName);
      setErrorFor($input, errorMessage);
      return;
    }
   
    setSuccessFor($input);
  });

  return formIsValid;
};

window.addEventListener("load", (event) => {
  setupEvents();
});
