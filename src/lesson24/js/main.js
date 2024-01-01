const form = document.getElementById("js-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

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

const cancelButton = document.getElementById("js-cancelButton");
cancelButton.addEventListener("click", () => {
  closeModal();
  const agreeCheckBoxes = document.querySelectorAll(
    '[data-id="js-agreeCheckbox"]'
  );
  agreeCheckBoxes.forEach((agreeCheckBox) => {
    agreeCheckBox.disabled = true;
    agreeCheckBox.checked = false;
  });
  disableSubmitButton();
});

const closeButton = document.getElementById("js-closeButton");
closeButton.addEventListener("click", () => {
  closeModal();
});

mask.addEventListener("click", () => {
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
  agreeButton.addEventListener("click", () => {
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
  agreeCheckbox.addEventListener("change", () => {
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
