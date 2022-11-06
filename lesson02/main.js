"use strict";

const ul = document.getElementById("js-target");

const li = document.createElement("li");

const a = document.createElement("a");
a.href = "1.html";
a.textContent = "これです";

const img = document.createElement("img");
img.src = "bookmark.png";
img.alt = "ブックマーク";

a.appendChild(img);
li.appendChild(a);
ul.appendChild(li);
