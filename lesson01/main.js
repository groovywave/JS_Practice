"use strict";
{ 
  const li = document.createElement("li");
  li.textContent = "これです。";
  const ul = document.getElementById("target");
  ul.appendChild(li);
}
