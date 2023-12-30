const form = document.getElementById("js-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  input.className =
    "border-2 border-red-200 rounded-lg w-full p-2 focus:outline-none focus:border-gray-700";
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  small.className = "text-errorColor absolute mb-0 ml-0 block";
}

function showSuccess(input) {
  input.className =
    "border-2 border-green-200 rounded-lg w-full p-2 focus:outline-none focus:border-gray-700";
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.className = "text-errorColor absolute mb-0 ml-0 block invisible";
}

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});

const linkToRule = document.getElementById("js-linkToRule");
const mask = document.getElementById("js-mask");
const modal = document.getElementById("js-modal");
linkToRule.addEventListener("click", (e) => {
  console.log("clicked");
  e.preventDefault();
  mask.classList.remove("hidden");
  modal.classList.remove("hidden");
});

function closeModal() {
  mask.classList.add("hidden");
  modal.classList.add("hidden");
}

const cancelButton = document.getElementById("js-cancelButton");
cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
  const agreeCheckBoxes = document.querySelectorAll(
    '[data-id="js-agreeCheckbox"]'
  );
  agreeCheckBoxes.forEach((agreeCheckBox) => {
    agreeCheckBox.setAttribute("disabled", "disabled");
    agreeCheckBox.checked = false;
  });
  disableSubmitButton();
});

const closeButton = document.getElementById("js-closeButton");
closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

mask.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

function tabAccessControl(target) {
  const focusableElementsSelector =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], [contenteditable]';
  target.focus();
  target.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const focusableElements = [
        ...target.querySelectorAll(focusableElementsSelector),
      ];
      const currentFocusedItemIndex = focusableElements.indexOf(
        document.activeElement
      );
      const nextFocusedItemIndex =
        (currentFocusedItemIndex + 1) % focusableElements.length;
      focusableElements[nextFocusedItemIndex].focus();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      hideModal(target);
    }
  });
}

tabAccessControl(document.getElementById("js-form"));
document.getElementById("js-userName").focus();

const agreeButton = document.getElementById("js-agreeButton");

function enableAgreeButton() {
  agreeButton.className =
    "bg-blue-300 text-white font-bold rounded px-4 py-2 mb-20 hover:bg-blue-700";
  agreeButton.disabled = false;
}

function addClickAgreeToCloseModal() {
  agreeButton.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
    enableSubmitButton();
  });
}

const submitButton = document.getElementById("js-submitButton");

function enableSubmitButton() {
  submitButton.disabled = false;
  submitButton.className =
    "w-full bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors";
}

function disableSubmitButton() {
  submitButton.disabled = true;
  submitButton.className =
    "w-full bg-gray-300 text-white font-bold py-2 px-4 rounded-lg transition-colors";
}

function checkboxesToBeChecked() {
  const agreeCheckBoxes = document.querySelectorAll(
    '[data-id="js-agreeCheckbox"]'
  );
  agreeCheckBoxes.forEach((agreeCheckbox) => {
    agreeCheckbox.disabled = false;
    agreeCheckbox.checked = true;
  });
}

const agreeCheckbox = document.getElementById("js-agreeCheckbox");

function toggleAgreeCheckbox() {
  agreeCheckbox.addEventListener("change", (e) => {
    agreeButton.disabled = !agreeCheckbox.checked;
    if (agreeCheckbox.checked) {
      agreeButton.className =
        "bg-blue-300 text-white font-bold rounded px-4 py-2 mb-20 hover:bg-blue-700";
    } else {
      agreeButton.className =
        "bg-gray-300 text-white font-bold rounded px-4 py-2 mb-20";
    }
  });
}

const submitCheckbox = document.getElementById("js-submitCheckbox");
function toggleSubmitCheckbox() {
  submitCheckbox.addEventListener("change", (e) => {
    submitButton.disabled = !submitCheckbox.checked;
    if (submitCheckbox.checked) {
      enableSubmitButton();
    } else {
      disableSubmitButton();
    }
  });
}

function changeAgreeToClickable(entries) {
  if (!entries[0].isIntersecting) {
    return;
  }
  enableAgreeButton();
  addClickAgreeToCloseModal();
  checkboxesToBeChecked();
  toggleAgreeCheckbox();
  toggleSubmitCheckbox();
}

document.getElementById("js-submitButton").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "registration.html";
});

const options = {
  root: document.getElementById("js-modal"),
  threshold: 1,
};

const observer = new IntersectionObserver(changeAgreeToClickable, options);
observer.observe(document.getElementById("js-agreeButton"));
