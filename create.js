'use strict';

import Component from './LibJS/Component.js';

import {List} from './list.js';
import {Upgrade} from './upgrade.js';

let com = new Component;

//Процес создания кролика
export function Create(token) {
  let div = com.div('wrapper');
  let main = com.main();
  let div2 = com.div('main');

  let submitNew = listRabbitAgain(div, token);
  let submitList = newRabbitAgain(div, token);
  let submitUpdate = updateRabbitAgain(div, token);

  let form = formCreate(div, token);

  div2.appendChild(form);
  let btnClose = close();

  div2.appendChild(submitNew);
  div2.appendChild(submitList);
  div2.appendChild(submitUpdate);
  div2.appendChild(btnClose);
  main.appendChild(div2);
  div.appendChild(main);
  document.body.appendChild(div);
}

//создаем кролика
let createRabbit = (token, name, weight) => {
  let url = 'http://conquest.weekendads.ru/rabbit';
  let method = "POST";
  let data = "rabbit[name]=" + name + "&rabbit[weight]=" + weight;
  let type = true;
  let xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, type);
  } else if (typeof ActiveXObject != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }

  xhr.setRequestHeader("Authorization", "Bearer " + token);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded ");
  xhr.send(data);
  xhr.onload = () => {

    try {

      let json = JSON.parse(xhr.responseText);
    } catch (e) {} finally {}
  }
}



//форма для создания кролика elem -- нужен для ремува wrapper

let formCreate = (elem, token) => {
  let div = com.div();
  let form = com.div('form');
  const inputName = com.input(null, null, null, 'Имя', 'text');
  const inputWeight = com.input(null, null, null, "Вес", 'number');
  inputWeight.setAttribute('min', "0.5");
  inputWeight.setAttribute('max', "1000");
  const submit = com.input(null, null, null, null, 'submit');
  submit.value = "Побыть богом?";

  submit.addEventListener('click', () => {

    if (inputName.value == '') inputName.value = 'Rabbit'; //проверка на пустой input
    if (inputWeight.value == '') inputWeight.value = '5'; //проверка на пустой input

    createRabbit(token, inputName.value, inputWeight.value);
    document.body.removeChild(elem);
    let listRabbit = new List(token);
  });

  form.appendChild(inputName);
  form.appendChild(inputWeight);
  form.appendChild(submit);

  return div.appendChild(form);

}
//Ниже представлены кнопки для переходов, они так же дублируются в App.js// create.js// list.js// upgrade.js

//кнопка с функцией для Списка кроликов

let listRabbitAgain = (elem, token) => {
  let div = com.div();
  const submit = com.input(null, null, null, null, 'submit');
  submit.value = "Cписок божественных кроликов";
  submit.addEventListener('click', () => {
    document.body.removeChild(elem);
    let listRabbit = new List(token);

  });

  return div.appendChild(submit);
}
//кнопка с функцией для создания кроликов

let newRabbitAgain = (elem, token) => {
  let div = com.div();
  const submit = com.input(null, null, null, null, 'submit');
  submit.value = "Режим бога для кролика";
  submit.addEventListener('click', () => {
    document.body.removeChild(elem);
    let createRabbit = new Create(token);
  });

  return div.appendChild(submit);
}


//кнопка с функцией для обновление кроликов
let updateRabbitAgain = (elem, token) => {
  let div = com.div();
  const submit = com.input(null, null, null, null, 'submit');
  submit.value = "Несчадный upgrade";
  submit.addEventListener('click', () => {
    document.body.removeChild(elem);
    let upgradeRabbit = new Upgrade(token);

  });

  return div.appendChild(submit);
}

//кнопка с функцией для возврата

let close = () => {
  let div = com.div();
  let submitClose = com.button('close', null, 'come', 'Вернуться');
  submitClose.addEventListener('click', () => {
    location.reload();

  });
  return div.appendChild(submitClose);
}
