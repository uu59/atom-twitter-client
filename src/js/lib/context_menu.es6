import React from "react";
var document = document || require('global/document');

module.exports = ContextMenu;

function renderItem(item) {
  var onClick = function(ev){
    item.action.call(ev.currentTarget);
    closeAllMenu();
  }
  return <li className="contextmenu--item" ev-click={onClick}>
    {item.label}
  </li>
}

function render(ev, items){
  var style = {
    position: "absolute",
    left: `${ev.pageX}px`,
    top: `${ev.pageY}px`,
  };
  return <ul className="contextmenu" style={style}>
    {items.map(renderItem)}
  </ul>
}

function closeMenu(target){
  var current = target;
  while(current !== document.body){
    if(current.classList.contains('contextmenu')){
      return;
    }
    current = current.parentNode;
  }
  closeAllMenu();
}

function onBodyClick(ev){
  closeMenu(ev.target);
}

function closeAllMenu(){
  Array.prototype.forEach.call(document.querySelectorAll('.contextmenu'), (elm) => elm.parentNode.removeChild(elm) );
  document.body.removeEventListener('click', closeMenu);
}

function ContextMenu(ev, items) {
  var dom = createElement(render(ev, items));
  document.body.addEventListener('click', onBodyClick);
  document.body.appendChild(dom);
}

