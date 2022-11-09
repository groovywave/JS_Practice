"use strict";

const ul = document.getElementById("js-target");

const li = document.createElement("li");

const a = document.createElement("a");
a.href = "1.html";
a.textContent = "これです";

const img = document.createElement("img");
img.src = "bookmark.png";
img.alt = "ブックマーク";

// <!--a has children-->
// <!--check console.log(a.childrens);-->
// a.insertBefore(img,a.firstChild);
// li.appendChild(a);
// ul.appendChild(li);

// <!--refactoring-->
ul.appendChild(li).appendChild(a).insertBefore(img,a.firstChild);

// <!--advanced-->
// ul.appendChild(li).appendChild(a).insertAdjacentElement("beforebegin",img);
// https://itosae.com/js_lesson01/#toc7
