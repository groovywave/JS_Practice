const form = document.getElementById("js-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

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
  });
}
tabAccessControl(document.getElementById("js-form"));
document.getElementById("js-userName").focus();

const linkToRule = document.getElementById("js-linkToRule");
const mask = document.getElementById("js-mask");
const modal = document.getElementById("js-modal");
linkToRule.addEventListener("click", (e) => {
  e.preventDefault();
  mask.classList.remove("hidden");
  modal.classList.remove("hidden");
});

function closeModal() {
  mask.classList.add("hidden");
  modal.classList.add("hidden");
}

const closeButton = document.getElementById("js-closeButton");
closeButton.addEventListener("click", () => {
  closeModal();
});

const agreeButton = document.getElementById("js-agreeButton");
function enableAgreeButton() {
  agreeButton.disabled = false;
  agreeButton.classList.remove("bg-gray-300");
  agreeButton.classList.add("bg-blue-300", "hover:bg-blue-700");
}
function disableAgreeButton() {
  agreeButton.disabled = true;
  agreeButton.classList.remove("bg-blue-300");
  agreeButton.classList.add("bg-gray-300");
}

const submitButton = document.getElementById("js-submitButton");
function enableSubmitButton() {
  submitButton.disabled = false;
  submitButton.classList.remove("bg-gray-300");
  submitButton.classList.add("bg-blue-300", "hover:bg-blue-700");
}
function disableSubmitButton() {
  submitButton.disabled = true;
  submitButton.classList.remove("bg-blue-300", "hover:bg-blue-700");
  submitButton.classList.add("bg-gray-300");
}

mask.addEventListener("click", () => {
  closeModal();
  const agreeCheckBoxes = document.querySelectorAll('[data-id="js-checkbox"]');
  agreeCheckBoxes.forEach((agreeCheckBox) => {
    agreeCheckBox.disabled = true;
    agreeCheckBox.checked = false;
  });
  disableSubmitButton();
});

function addClickAgreeToCloseModal() {
  agreeButton.addEventListener("click", () => {
    closeModal();
    enableSubmitButton();
  });
}

const cancelButton = document.getElementById("js-cancelButton");
cancelButton.addEventListener("click", () => {
  mask.click();
});

const submitCheckbox = document.getElementById("js-submitCheckbox");
function checkboxesToBeChecked() {
  const agreeCheckBoxes = document.querySelectorAll('[data-id="js-checkbox"]');
  agreeCheckBoxes.forEach((agreeCheckbox) => {
    agreeCheckbox.disabled = false;
    agreeCheckbox.checked = true;
  });
  submitCheckbox.classList.remove("cursor-not-allowed");
}

const agreeCheckbox = document.getElementById("js-agreeCheckbox");
function toggleAgreeCheckbox() {
  agreeCheckbox.addEventListener("change", () => {
    if (agreeCheckbox.checked) {
      enableAgreeButton();
    } else {
      disableAgreeButton();
    }
  });
}

function toggleSubmitCheckbox() {
  submitCheckbox.addEventListener("change", () => {
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

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "registration.html";
});

const options = {
  root: modal,
  threshold: 1,
};

const observer = new IntersectionObserver(changeAgreeToClickable, options);
observer.observe(agreeButton);
