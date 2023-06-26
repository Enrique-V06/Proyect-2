//const { options } = require('../../model/users');

// ----------- Type of user JQuery
console.log('ON SEARCH JS');
let type;
let loc;
let pet;


// RESPONSIVE DROPDOWNS
(function () {
  // var Options =; //document.querySelectorAll
  $('.item-location').on('click', function () {
    // const val = e.target.value;
    // console.log('VALUE', val);
    // type = this.id; // A= looking for a home, B=Looking for a Roomie Change: id homepage.handlebars
    document.getElementById('locationDropDown').textContent = this.innerHTML;
    loc = this.innerHTML;
    // return type;
  });
  // return type;
})();

(function () {
  // var Options = ; //document.querySelectorAll
  $('.item-pet').on('click', function () {
    // type = this.id; // A= looking for a home, B=Looking for a Roomie Change: id homepage.handlebars
    document.getElementById('petDropDown').textContent = `Pet Friendly: ${this.innerHTML}`;
    pet = this.id;
    // return type;
  });
  // return type;
})();

(function (){
    // var Options = ;  //document.querySelectorAll
    $('.item-type').on('click', function () { 
    type = this.innerHTML; // A= looking for a home, B=Looking for a Roomie Change: id homepage.handlebars
    document.getElementById("typeDropDown").textContent=this.innerHTML;
      // return type;
    });
    // return type;
})();

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


// FOR GET 
const dropdownMenu = document.querySelector('#submitSearchBtn');
dropdownMenu.addEventListener('click', async () => {
  console.log("Click submit search")
  const url= `/api/search?param1=${loc}&param2=${type}&param3=${pet}`;
  // const response = await fetch(url
  //   , {
  //   method: 'POST',
  //   body: JSON.stringify(srch),
  //   headers: { 'Content-Type': 'application/json' },
  // }
  // )

  // .then((response) => response.json())
  // .then((data) => {
  //   console.log("back")
  //   console.log(data);
  // })
  
  document.location.replace(url);
});




