'use strict';

import Component from './LibJS/Component.js';
import Ajax from './LibJS/Ajax.js';
import {List} from './list.js';
import {Create} from './create.js';
import {Upgrade} from './upgrade.js';

let com = new Component;

export function ajaxJson(login, password) {
  login = login.toLowerCase();
  password = password.toLowerCase();
  let method = "POST";
  let url = "http://conquest.weekendads.ru/login_check";
  let data = {
    "username": "" + login + "",
    "password": "" + password + ""
  };
  let ajax = new Ajax(method, url, true);
  ajax.send(JSON.stringify(data));
  ajax.onload = () => {

    try {
      let json = JSON.parse(ajax.responseText);

    } catch (e) {
      console.error("erroe in ajaxJson" + e);

    } finally {
      let json = JSON.parse(ajax.responseText);

      if (json.code != undefined) { //проверка на полученные файлы
        rabbitErr(json);

      } else {
        rabbitOk(json.token);

      }
    }
  }

}


//Если ответ пришел то создаем список ком-тов
const rabbitOk = (token) => {

  let div = com.div('wrapper');
  let main = com.main();
  let div2 = com.div('main');
  let card = com.div('card');
  let h1 = com.h3('Здравствуйте, к большому сожалению найти уязвимость мне не удалось, остались только догадки (был бы признателен фидбеком с ответом на вопрос)');
  card.appendChild(h1);
  div2.appendChild(card);

  let submitNew = listRabbitAgain(div, token);
  let submitList = newRabbitAgain(div, token);
  let submitUpdate = updateRabbitAgain(div, token);
  let btnClose = close();

  div2.appendChild(submitNew);
  div2.appendChild(submitList);
  div2.appendChild(submitUpdate);
  div2.appendChild(btnClose);

  main.appendChild(div2);
  div.appendChild(main);
  document.body.appendChild(div);

}

const rabbitErr = (e) => {
  alert('Error: ' + e.code + ' , its a ' + e.message);
  location.reload();
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
