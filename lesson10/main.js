const ul = document.getElementById("js-ul"); 

function renderCircle(){
	const loadingCircle = document.createElement("img"); 
  loadingCircle.src = "img/loading-circle.gif";
  loadingCircle.alt = "ローディング画像";
  loadingCircle.id = "loading-circle";
  ul.appendChild(loadingCircle);
}  

function removeCircle(){
  document.getElementById("loading-circle").remove();
}

function renderMenus(menus){
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

function getMenus(){
	return new Promise((resolve)=> {
		renderCircle();
		const menus = [ 
			{to: "bookmark.html", img:"img/1.png", alt:"画像1", text: "ブックマーク"}, 
			{to: "message.html", img:"img/2.png", alt:"画像2", text: "メッセージ"} 
		]; 
		setTimeout(() => {
			resolve(menus);
		}, 3000);
	})
}

async function tryToGetMenus() {
	try{
		return await getMenus();
	}catch(error){
		console.error(error);
	}finally{
		removeCircle();
	}
}

(async ()  => {
	try{
		const menus = await tryToGetMenus();
		renderMenus(menus);
	}catch{
		ul.textContent = "Something went wrong";
	}
})();

/*あえてthenメソッドを使うとしたら以下もありでしょうか？
tryToGetMenus()
.then((menus)=>{
		renderMenus(menus);
	})
.catch(()=>{
	ul.textContent = "Something went wrong";
});
*/		
