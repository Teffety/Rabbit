'use strict';

import Component from './LibJS/Component.js';

import  {Create} from './create.js';
import  {Upgrade} from './upgrade.js';

let com = new Component;


export function List(token) {
  let div = com.div('wrapper');
  let main = com.main();
  let div2 = com.div('main');
  let table =com.table();

  let submitList = listRabbitAgain(div, token);
  let submitNew = newRabbitAgain(div, token);
  let submitUpdate = updateRabbitAgain(div, token);

  let method = "GET";
  let url = "http://conquest.weekendads.ru/rabbit/list";
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
  xhr.send();
  xhr.onload = () => {

    try {

      let json = JSON.parse(xhr.responseText);
    } catch (e) {

      console.error("erroe in rabbit list" + e);
    } finally {

      let json = JSON.parse(xhr.responseText);
      let jsonL = json.length;
      for (let i = 0; i < jsonL; i++) {
        let tr = com.tr();
        let submitDelet = com.input(null, null, null, null, 'submit');
        submitDelet.value = "Убийство кролика";

        submitDelet.addEventListener('click', () => {
            let delet = deletRabbit(token, json[i].id, json[i].name, json[i].weight);

          }

        );

        let td = com.td('Кролик № ' + json[i].id + " ");
        let td1 = com.td(json[i].name);
        let td2 = com.td(" весом : " + json[i].weight);
        let td3 = com.td(' ');
        td3.appendChild(submitDelet);

        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        table.appendChild(tr);
      };


      div2.appendChild(close());
      div2.appendChild(submitList);
      div2.appendChild(submitNew);
      div2.appendChild(submitUpdate);
      div2.appendChild(table);

      main.appendChild(div2);
      div.appendChild(main);
      document.body.appendChild(div);

    }
  }
}

let deletRabbit = (token, id, name, weight) => {
  let url = 'http://conquest.weekendads.ru/rabbit/'+id;
  let method = "delete";
  let data = "rabbit[name]="+name+"&rabbit[weight]="+weight;
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
    } catch (e) {
      console.error("erroe in rabbit list" + e);
    } finally {
      let json = JSON.parse(xhr.responseText);

    }
  }
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
