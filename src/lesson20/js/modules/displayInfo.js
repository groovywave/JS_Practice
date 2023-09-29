export function displayInfo(response) {
  const errorMessage = document.createElement("p");
  errorMessage.id = "display-info";
  if (response.status) {
    errorMessage.textContent = `${response.status}:${response.statusText}`;
  } else {
    errorMessage.textContent = response;
  }
  document.body.appendChild(errorMessage);
}

