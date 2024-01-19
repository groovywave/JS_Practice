const form = document.getElementById("js-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
let focusableElements;
let currentFocusedItemIndex;
function getFocusableElements(element) {
  focusableElements = [
    ...element.querySelectorAll(
      "a[href], input:not([disabled]),button:not([disabled])",
    ),
  ];
}
function addPressTabEventOnElement(event) {
  if (event.key !== "Tab") return;
  event.preventDefault();
  currentFocusedItemIndex = focusableElements.indexOf(document.activeElement);
  focusableElements[
    (currentFocusedItemIndex + 1) % focusableElements.length
  ].focus();
}
getFocusableElements(form);
username.focus();
form.addEventListener("keydown", addPressTabEventOnElement);
const linkToRule = document.getElementById("js-linkToRule");
const mask = document.getElementById("js-mask");
const modal = document.getElementById("js-modal");
const modalBody = document.getElementById("js-modalBody");

function keydownToScrollModal(event) {
  event.preventDefault();
  if (modal.classList.contains("hidden")) return;
  switch (event.key) {
    case "ArrowUp":
      return modalBody.scrollBy(0, -16);
    case "ArrowDown":
      return modalBody.scrollBy(0, 16);
    case "Tab":
      return;
  }
}
modalBody.addEventListener("keydown", keydownToScrollModal);
linkToRule.addEventListener("click", (event) => {
  event.preventDefault();
  mask.classList.remove("hidden");
  modal.classList.remove("hidden");
  modalBody.focus();
});

function closeModal() {
  mask.classList.add("hidden");
  modal.classList.add("hidden");
}

const closeButton = document.getElementById("js-closeButton");
closeButton.addEventListener("click", () => {
  closeModal();
  getFocusableElements(form);
  username.focus();
});

const agreeButton = document.getElementById("js-agreeButton");
const submitButton = document.getElementById("js-submitButton");
const submitCheckbox = document.getElementById("js-submitCheckbox");

function checkboxNotToBeChecked() {
  submitCheckbox.disabled = true;
  submitCheckbox.checked = false;
}

mask.addEventListener("click", () => {
  closeModal();
  checkboxNotToBeChecked();
  submitButton.disabled = true;
  // modalBody.focus();
  getFocusableElements(form);
  username.focus();
});

const cancelButton = document.getElementById("js-cancelButton");
cancelButton.addEventListener("click", () => {
  mask.click();
  getFocusableElements(form);
  username.focus();
});

function addClickAgreeButtonToCloseModal() {
  agreeButton.addEventListener("click", () => {
    closeModal();
    submitButton.disabled = false;
    getFocusableElements(form);
    username.focus();
  });
}

function checkboxToBeChecked() {
  submitCheckbox.disabled = false;
  submitCheckbox.checked = true;
}

function toggleSubmitCheckbox() {
  submitCheckbox.addEventListener("change", () => {
    if (submitCheckbox.checked) {
      submitButton.disabled = false;
      getFocusableElements(form);
    } else {
      submitButton.disabled = true;
      getFocusableElements(form);
    }
  });
}

function changeAgreeButtonToClickable(entries) {
  if (!entries[0].isIntersecting) {
    return;
  }
  agreeButton.disabled = false;
  addClickAgreeButtonToCloseModal();
  checkboxToBeChecked();
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

const observer = new IntersectionObserver(
  changeAgreeButtonToClickable,
  options,
);
observer.observe(agreeButton);
