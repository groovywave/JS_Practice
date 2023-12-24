const form = document.getElementById("js-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message
function showError(input, message) {
  input.className =
    "border-2 border-red-200 rounded-lg w-full p-2 focus:outline-none focus:border-gray-700";
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  small.className = "text-errorColor absolute mb-0 ml-0 block";
}

// Show success outline
function showSuccess(input) {
  input.className =
    "border-2 border-green-200 rounded-lg w-full p-2 focus:outline-none focus:border-gray-700";
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.className = "text-errorColor absolute mb-0 ml-0 block invisible";
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
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

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
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

const closeButton = document.getElementById("js-closeButton");
closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

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
});

mask.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

function tabAccessControl(target) {
  const focusableElementsSelector =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], [contenteditable]';
  // const target = document.getElementById("js-modal");
  // const target = document.body;
  target.focus();
  target.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const focusableElements = [
        ...target.querySelectorAll(focusableElementsSelector),
      ];
      console.log(
        "🚀 ~ file: main.js:139 ~ target.addEventListener ~ focusableElements:",
        focusableElements
      );
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
// tabAccessControl(document.body);
document.getElementById("js-userName").focus();

const agreeCheckbox = document.getElementById("js-agreeCheckbox");
const agreeButton = document.getElementById("js-agreeButton");
const submitCheckbox = document.getElementById("js-submitCheckbox");
const submitButton = document.getElementById("js-submitButton");
function changeToClickable(entries) {
  console.log(entries[0]);
  if (!entries[0].isIntersecting) {
    return;
  }
  agreeButton.className =
    "bg-blue-300 text-white font-bold rounded px-4 py-2 mb-20 hover:bg-blue-700";
  agreeButton.disabled = false;
  agreeButton.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
    submitButton.disabled = false;
    submitButton.className =
      "w-full bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors";
    // submitButton.className =
    // "bg-blue-300 text-white font-bold rounded px-4 py-2 mb-20 hover-bg-blue-700";
  });
  const agreeCheckBoxes = document.querySelectorAll(
    '[data-id="js-agreeCheckbox"]'
  );
  agreeCheckBoxes.forEach((agreeCheckbox) => {
    agreeCheckbox.removeAttribute("disabled");
    agreeCheckbox.checked = true;
  });

  agreeCheckbox.addEventListener("click", (e) => {
    if (agreeCheckbox.checked) {
      agreeButton.setAttribute("disabled", "disabled");
      // agreeButton.disabled = true;
    } else {
      agreeButton.removeAttribute("disabled");
    }
  });
  submitCheckbox.addEventListener("click", (e) => {
    submitButton.disabled = !submitCheckbox.checked;
    if (submitCheckbox.checked) {
      // submitButton.setAttribute("disabled", "disabled");
      submitButton.className =
        "w-full bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors";
      // submitButton.disabled = true;
    } else {
      submitButton.className =
        "w-full bg-gray-300 text-white font-bold rounded px-4 py-2 mb-20";
      // submitButton.disabled = false;
      // submitButton.removeAttribute("disabled");
    }
  });
  // submitButton.disabled = false;
}

document.getElementById("js-submitButton").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "register-done.html";
});

const options = {
  // root: document.querySelector('[data-id="modal-inner"]'),
  root: document.getElementById("js-modal"),
  threshold: 1,
};

const observer = new IntersectionObserver(changeToClickable, options);
// observer.observe(document.querySelector('[data-id="last_text"]'));
observer.observe(document.getElementById("js-agreeButton"));
