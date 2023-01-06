
function renderCircle(){
  const loadingCircle = document.createElement("img"); 
  const ul = document.getElementById("js-ul"); 
  loadingCircle.src = "img/loading-circle.gif";
  loadingCircle.alt = "ローディング画像";
  loadingCircle.id = "loading-circle";
  ul.appendChild(loadingCircle);
}  

function removeCircle(){
  document.getElementById("loading-circle").remove();
}

function renderIcons(resolvedElements){
  const ul = document.getElementById("js-ul"); 
  const fragment = document.createDocumentFragment(); 
  for (const element of resolvedElements) { 
    const li = document.createElement("li"); 
    const a = document.createElement("a"); 
    const img = document.createElement("img"); 
    a.href = element.to; 
    a.textContent = element.text; 
    img.src = element.img; 
    img.alt = element.alt; 
    fragment
      .appendChild(li)
      .appendChild(a)
      .insertAdjacentElement("afterbegin",img); 
  }; 
  ul.appendChild(fragment);
}

const getElements = new Promise((resolve)=> {
  renderCircle();
  const elements = [ 
    {to: "bookmark.html", img:"img/1.png", alt:"画像1", text: "ブックマーク"}, 
    {to: "message.html", img:"img/2.png", alt:"画像2", text: "メッセージ"} 
  ]; 
  setTimeout(() => {
    resolve(elements);
  }, 3000);
})

getElements.then((resolvedElements)=> {
  removeCircle();
  renderIcons(resolvedElements);
});
