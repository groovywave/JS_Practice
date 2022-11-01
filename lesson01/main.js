'use strict';
{ 
  const li = document.createElement('li');
  li.textContent = "これです。";
  // const ul = Document.getElementById('target');
  const ul = document.getElementById("target");
  ul.appendChild(li);
}
