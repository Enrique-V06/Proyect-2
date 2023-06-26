//const { options } = require('../../model/users');

// ----------- Type of user JQuery
console.log('ON SERACH JS');
let type;
let loc;
let typeOfHome;
let pet;
const dropdownMenu = document.querySelector('.typeOfHome_menu');

dropdownMenu.addEventListener('click', async (e) => {
  e.preventDefault();
  type = this.id; // A= looking for a home, B=Looking for a Roomie Change: id homepage.handlebars
  const valor = e.target.dataset.value;
  console.log('CHANGE');
  console.log('VALOR', valor);
  document.getElementById('typeDropDown').textContent = valor;

  if (valor) {
    const response = await fetch(`/api/search/${valor}`, {
      method: 'GET',
    });
    if (response.ok) {
      document.location.replace('/api/search');
    } else {
      alert('There was a problem with your search');
    }
  } else {
    alert('Please submit the three options for your personalized search');
  }
  // typeOfHome = this.innerHTML;
  // return type;
});
// (function () {

//   // return type;
// })();

(function () {
  var Options = $('.item-location'); //document.querySelectorAll
  Options.on('click', function (e) {
    const val = e.target.value;
    console.log('VALUE', val);
    type = this.id; // A= looking for a home, B=Looking for a Roomie Change: id homepage.handlebars
    document.getElementById('locationDropDown').textContent = this.innerHTML;
    loc = this.innerHTML;
    return type;
  });
  return type;
})();

(function () {
  var Options = $('.item-pet'); //document.querySelectorAll
  Options.on('click', function () {
    type = this.id; // A= looking for a home, B=Looking for a Roomie Change: id homepage.handlebars
    document.getElementById('petDropDown').textContent = this.innerHTML;
    pet = this.innerHTML;
    return type;
  });
  return type;
})();

var searchSubmit = document.querySelector('#submitSearchBtn');

searchSubmit.addEventListener('click', async (event) => {
  console.log(typeOfHome, loc, pet);

  if (typeOfHome && loc && pet) {
    const response = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({ typeOfHome, loc, pet }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/api/search');
    } else {
      alert('There was a problem with your search');
    }
  } else {
    alert('Please submit the three options for your personalized search');
  }
});
