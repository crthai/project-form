const validator = {
  setErrorFor: ($input, message) => {
    const $formControl = $input.closest(".form-control");
    const $messageError = $formControl.querySelector(".message-error");
    $messageError.textContent = message;
    $formControl.className = "form-control error";
  },
  setSuccessFor: ($input) => {
    const $formControl = $input.closest(".form-control");
    $formControl.className = "form-control success";
  },
  validatorByType: {
    required: {
      validate: ($input) => {
        return $input.value.length > 0;
      },
      message: ($input) => `${$input.name} cannot be blank.`,
    },
    name: {
      validate: ($input) => {
        return $input.value.length > 0;
      },
      message: ($input) => `${$input.name} cannot be blank.`,
    },
    email: {
      validate: ($input) => {
        var regex = /\S+@\S+\.\S+/;
        return regex.test($input.value);
      },
      message: () => `Invalid email format`,
    },
  },
  validateForm: ($form) => {
    const $inputs = $form.querySelectorAll("input");
    return validator.validateInputs($inputs);
  },
  validateInputs: ($inputs) => {
    let areAllInputsValid = true;
    $inputs.forEach(($input) => {
      const isValidInput = validator.validateEachStep($input);
      areAllInputsValid &= isValidInput;
    });

    return areAllInputsValid;
  },
  validateEachStep: ($input) => {
    const VT_KEY = "vtValidations";
    let allStepsAreValid = true;
    const hasStepsToValidate = $input.dataset[VT_KEY];

    if (hasStepsToValidate) {
      const steps = $input.dataset[VT_KEY].split("|");
      steps.forEach((type) => {
        try {
          allStepsAreValid &= validator.validatorByType[type].validate($input);
          if (!allStepsAreValid) {
            validator.setErrorFor($input, validator.validatorByType[type].message($input));
          }
        } catch (error) {
          throw new Error("Ops, aconteceu um erro na validação do campo", error);
        }
      });
    }

    if (allStepsAreValid) {
      validator.setSuccessFor($input);
    }
    return allStepsAreValid;
  }
}