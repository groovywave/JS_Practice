"use strict";
ul = document.getElementById("js-target");

const img = document.createComment<"img">;
img.src = "bookmark.png";
img.alt = "ブックマーク";

const a = document.createElement<"a">;
a.href = "1.html"
a.textContent = "これです";

a.appendChild(img);
ul.appendChild(a);
