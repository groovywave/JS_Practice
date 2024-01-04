const form = document.getElementById("js-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

function tabAccessControl(target) {
  const focusableElementsSelector = "a[href], input:not([disabled])";
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
cancelButton.addEventListener("click", () => {
  mask.click();
});

function addClickAgreeToCloseModal() {
  agreeButton.addEventListener("click", () => {
    closeModal();
    submitButton.disabled = false;
  });
}

function checkboxToBeChecked() {
  submitCheckbox.disabled = false;
  submitCheckbox.checked = true;
  submitCheckbox.classList.remove("cursor-not-allowed");
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
