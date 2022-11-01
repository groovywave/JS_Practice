'use strict';
{ 
  const li = document.createElement('li');
  li.textContent = "これです。";
  const ul = document.querySelector('ul');
  ul.id = "target";
  Document.getElementByID("target").appendChild(li);
}
