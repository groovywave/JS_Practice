new Promise((resolve)=> {
  const elements = [ 
    {to: "bookmark.html", img:"img/1.png", alt:"画像1", text: "ブックマーク"}, 
    {to: "message.html", img:"img/2.png", alt:"画像2", text: "メッセージ"} 
  ]; 
  resolve(elements);
}).then((elements)=> {
  const ul = document.getElementById("js-ul"); 
  const fragment = document.createDocumentFragment(); 
  for (const element of elements) { 
    const li = document.createElement("li"); 
    const a = document.createElement("a"); 
    const img = document.createElement("img"); 
    a.href = element.to; 
    a.textContent = element.text; 
    img.src = element.img; 
    img.alt = element.alt; 
    fragment.appendChild(li).appendChild(a).insertAdjacentElement("afterbegin",img); 
  }; 
  ul.appendChild(fragment);
});
