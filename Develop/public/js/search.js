/* eslint-disable no-undef */
/* eslint-disable func-names */
console.log('ON SEARCH JS');
let type;
let loc;
let pet;

// ---------RESPONSIVE DROPDOWNS
(function () {
  $('.item-location').on('click', function () {
    document.getElementById('locationDropDown').textContent = this.innerHTML;
    loc = this.innerHTML;
  });
}());

(function () {
  $('.item-pet').on('click', function () {
    document.getElementById('petDropDown').textContent = `Pet Friendly: ${this.innerHTML}`;
    pet = this.id; // 0 for false, 1 for true
  });
}());

(function () {
  $('.item-type').on('click', function () {
    type = this.innerHTML;
    document.getElementById('typeDropDown').textContent = this.innerHTML;
  });
}());

// FOR GET
const dropdownMenu = document.querySelector('#submitSearchBtn');
dropdownMenu.addEventListener('click', async () => {
  let url;
  console.log('Click submit search');
  if (loc && type && pet) {
    console.log('los 3');
    url = `/api/search?param1=${loc}&param2=${type}&param3=${pet}`;
  } else if (loc && type) {
    console.log('solo 2');
    url = `/api/search?param1=${loc}&param2=${type}`;
  } else if (loc) {
    url = `/api/search?param1=${loc}`;
  } else if (type) {
    url = `/api/search?param1=${type}`;
  }
  // url= `/api/search?param1=${loc}&param2=${type}&param3=${pet}`;
  document.location.replace(url);
});

// FOR POST
// const dropdownMenu = document.querySelector('#submitSearchBtn');
// dropdownMenu.addEventListener('click', async () => {
//   console.log("Click submit search")
//   const srch = {
//     loc: loc,
//     type: type,
//     pet: pet,
//   }
//   console.log("salida: ",srch)

//   const url= `/api/search`;
//   const response = await fetch(url
//     ,{
//     method: 'POST',
//     body: JSON.stringify(srch),
//     headers: { 'Content-Type': 'application/json' },
//   }
//   )
//   // .then((response) => response.json())
//   // .then((data) => {
//   //   console.log("back")
//   //   console.log(data);
//   // })

// });
