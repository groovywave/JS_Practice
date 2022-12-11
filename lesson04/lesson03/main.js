const ul = document.getElementById("js-target");
const imgSrcs = ["/img/bookmark.png","/img/messege.png"];

for (let i=0; i < imgSrcs.length; i++){
  const li = document.createElement("li");
  const a = document.createElement("a");
  const img = document.createElement("img");

  a.href = `a${i+1}.html`;
  a.textContent = `a${i+1}`;
  img.src = imgSrcs[i];

  ul.appendChild(li).appendChild(a).insertAdjacentElement("afterbegin",img);
}



