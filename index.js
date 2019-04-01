'use strict';

import Component from './LibJS/Component.js'; // Мини библиотека
import {ajaxJson} from './App.js';


let com = new Component;

//Загрузка окна после всего контетнта
window.onload = function() {
  document.getElementById("hideAll").style.display = "none";

  (function() {
    //Создание основы div - сlass ="wrapper"
    let div = com.div('wrapper');
    let main = com.main();
    // Задаем атрибуты грида  отличные от основных(LibsJS/main.css)
    let div2 = com.div('main');
    div2.setAttribute('style', 'grid-column-start: 1 !important;  grid-column-end: 12 !important;')
    let form = formForLogin(div);
    div2.appendChild(form);
    main.appendChild(div2);
    div.appendChild(main);
    document.body.appendChild(div);

  }());
}

//форма  логина
let formForLogin = (elem) => {
  let div = com.div();
  let form = com.div('form');
  const inputLogin = com.input(null, null, null, 'username', 'text');
  inputLogin.name = 'username';
  const inputPassword = com.input(null, null, null, "password", 'password');
  inputPassword.name = 'password';
  const submit = com.input(null, null, null, null, 'submit');
  submit.value = "Начать";
  submit.addEventListener('click', () => {
      let app = new ajaxJson(inputLogin.value, inputPassword.value);
      document.body.removeChild(elem);

    });

  form.appendChild(inputLogin);
  form.appendChild(inputPassword);
  form.appendChild(submit);

  return div.appendChild(form);
}
