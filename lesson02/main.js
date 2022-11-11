const ul = document.getElementById("js-target");

const li = document.createElement("li");

const a = document.createElement("a");

const img = document.createElement("img");

a.href = "1.html";
a.textContent = "これです";

img.src = "bookmark.png";
img.alt = "ブックマーク";

ul.appendChild(li).appendChild(a).insertBefore(img,a.firstChild);


