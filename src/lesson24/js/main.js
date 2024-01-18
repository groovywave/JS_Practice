const form = document.getElementById("js-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const focusableElements = [
  ...form.querySelectorAll("a[href], input:not([disabled])"),
];
username.focus();
//focus only on the items in the form
form.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;
  event.preventDefault();
  const currentFocusedItemIndex = focusableElements.indexOf(
    document.activeElement,
  );
  focusableElements[
    (currentFocusedItemIndex + 1) % focusableElements.length
  ].focus();
});

const linkToRule = document.getElementById("js-linkToRule");
const mask = document.getElementById("js-mask");
const modal = document.getElementById("js-modal");
const modalBody = document.getElementById("js-modalBody");

function keydownToScrollModal(event) {
  if (modal.classList.contains("hidden")) return;
  switch (event.key) {
    case "ArrowUp":
      return modalBody.scrollBy(0, -16);
    case "ArrowDown":
      return modalBody.scrollBy(0, 16);
  }
}

linkToRule.addEventListener("click", (event) => {
  event.preventDefault();
  mask.classList.remove("hidden");
  modal.classList.remove("hidden");
  modalBody.focus();
  modalBody.addEventListener("keydown", keydownToScrollModal);
});

function closeModal() {
  mask.classList.add("hidden");
  modal.classList.add("hidden");
  modalBody.removeEventListener("keydown", keydownToScrollModal);
}

const closeButton = document.getElementById("js-closeButton");
closeButton.addEventListener("click", closeModal());

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
});

const cancelButton = document.getElementById("js-cancelButton");
cancelButton.addEventListener("click", mask.click());

function addClickAgreeToCloseModal() {
  agreeButton.addEventListener("click", () => {
    closeModal();
    submitButton.disabled = false;
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
    } else {
      submitButton.disabled = true;
    }
  });
}

function changeAgreeToClickable(entries) {
  if (!entries[0].isIntersecting) {
    return;
  }
  agreeButton.disabled = false;
  addClickAgreeToCloseModal();
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

const observer = new IntersectionObserver(changeAgreeToClickable, options);
observer.observe(agreeButton);
