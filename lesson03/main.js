const ul = document.getElementById("js-target");
const fragment = document.createDocumentFragment();
const elements = [
  { href: "a1.html", src:"/img/bookmark.png",text: "a1"},
  { href: "a2.html", src:"/img/message.png",text: "a2"}
];

elements.forEach(function(e)){
  const li = document.createElement("li");
  const a = document.createElement("a");
  const img = document.createElement("img");

  a.href = e.href;
  a.textContent = e.text;
  img.src = e.src;

  fragment.appendChild(li).appendChild(a).insertAdjacentElement("beforebegin",img);
}
ul.appendChild(fragment);
