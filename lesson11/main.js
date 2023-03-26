const ul = document.getElementById("js-ul"); 

// const url = "";
// const url = "https://mocki.io/v1/55dc6233-a8fe-44ca-8906-3de313545ce8";
const url = "https://mocki.io/v1/1c058349-634e-462a-ad37-14f135e59b99";

function renderStatus(error){
	const p = document.createElement("p"); 
  p.id = "render-status";
  p.textContent = `${error.status}:${error.statusText}`;
  document.body.appendChild(p);
}

function displayInfo(error){
	const p = document.createElement("p"); 
  p.id = "display-info";
  p.textContent = error;
  document.body.appendChild(p);
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

async function fetchData() {
  renderCircle();
	try{
    const response = await fetch(url);
    const responseData = await response.json();
    if(!response.ok){
      renderStatus(response);
      console.error(`${response.status}:${response.statusText}`);
    }
    if(!responseData.length){
      displayInfo("no data");
    }
    return responseData;
	}catch(error){
		displayInfo(error);
	}finally{
		removeCircle();
	}
}

async function fetchRenderData(){
  const responseData = await fetchData();
  if (responseData){
    renderData(responseData);
  }
}

fetchRenderData();
