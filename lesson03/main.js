const ul = document.getElementById("js-target");
const imgSrcs = ["/img/bookmark.png","/img/messege.png"];

for (let i=0; i < imgSrcs.length; i++){
  const li = document.createElement("li");
  const a = document.createElement("a");
  const img = document.createElement("img");

  a.href = `a${i}.html`;
  a.textContent = `a${i}`;
  img.src = imgSrcs[i];

  ul.appendChild(li).appendChild(a).insertAdjacentElement("beforebegin",img);
}



