const ul = document.getElementById("js-target");

const li = [];
const a = [];
const img = [];

for (let i=0; i < 2; i++){
  li[i] = document.createElement("li");
  a[i] = document.createElement("a");
  img[i] = document.createElement("img");

  a[i].href = `a${i}.html`;
  a[i].textContent = `a${i}`;

  ul.appendChild(li[i]).appendChild(a[i]).insertAdjacentElement("beforebegin",img[i]);
}

img[0].src = "/img/bookmark.png";
img[1].src = "/img/messege.png";

