"use strict";
 
  const li = document.createElement("li");
  li.textContent = "これです。";
  const ul = document.getElementById("js-target");
  ul.appendChild(li);
