
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

function renderMenus(menus){
  const ul = document.getElementById("js-ul"); 
  const fragment = document.createDocumentFragment(); 
  for (const menu of menus) { 
    const li = document.createElement("li"); 
    const a = document.createElement("a"); 
    const img = document.createElement("img"); 
    a.href = menu.to; 
    a.textContent = menu.text; 
    img.src = menu.img; 
    img.alt = menu.alt; 
    fragment
      .appendChild(li)
      .appendChild(a)
      .insertAdjacentElement("afterbegin",img); 
  }; 
  ul.appendChild(fragment);
}

const getMenus = new Promise((resolve, reject)=> {
  renderCircle();
  const menus = [ 
    {to: "bookmark.html", img:"img/1.png", alt:"画像1", text: "ブックマーク"}, 
    {to: "message.html", img:"img/2.png", alt:"画像2", text: "メッセージ"} 
  ]; 
  setTimeout(() => {
    reject("error");
  }, 3000);
})

getMenus.then(
	(menus)=> {
  	removeCircle();
  	renderMenus(menus);
	},
	(error) => {
		console.error(error);
	}
);
