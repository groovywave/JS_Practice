const ul = document.getElementById("js-ul"); 
// const url = "";
const url = "https://mocki.io/v1/1c058349-634e-462a-ad37-14f135e59b99";
const options = {
  method: "GET"
};

function renderError(error){
	const renderError = document.createElement("p"); 
  renderError.id = "render-error";
  renderError.textContent = `${error.status}：${error.statusText}`;
  document.body.appendChild(renderError);
}

function displayInfo(error){
	const renderError = document.createElement("p"); 
  renderError.id = "render-error";
  renderError.textContent = error;
  document.body.appendChild(renderError);
}  

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

function renderData(menus){
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

async function fetchData(url, options){

  let response;
  try{
    response = await fetch(url, options);
    console.log(response);
  }catch(error){
    displayInfo(error);
  }

  // else{
  //   return response.json();
  // }
}

async function fetchRenderData() {
	let response;
  renderCircle();
	try{
    const response = await fetch(url, options);
    if(!response.ok){
      renderError(response);
    }
    if(!response.length){
      // console.log(response.length);
      displayInfo("no data");
    }
    console.log(response);
	}catch(error){
		displayInfo(error);
	}finally{
		removeCircle();
    renderData(response);
	}
}

fetchRenderData();
