const ul = document.getElementById("js-ul"); 
const url = "https://mocki.io/v1/1c058349-634e-462a-ad37-14f135e59b99";
const options = {
  method: "GET"
};

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
  console.log(menus);
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

async function fetchMenus(url, options){
  renderCircle();
	const response = await fetch(url, options);
  response.then((response)=>{
    if(!response.ok){
      return new Promise.reject("エラーです");
    }
    const menus = response.json().data;
    console.log(menus);
    return menus;
  })
}

async function getRenderMenus() {
	let menus;
	try{
    menus = await fetchMenus(url, options);
    console.log(menus);
	}catch(error){
		console.error(error);
	}finally{
		removeCircle();
	}
	renderMenus(menus);
}

getRenderMenus();
