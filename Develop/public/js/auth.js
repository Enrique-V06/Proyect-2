// 
console.log("Auth.js file")
var signUpSubmit = document.querySelector("#signUpSubmit");
let type; 
// ----------- Type of user JQuery  
(function (){
    var Options = $('.item-type');  //document.querySelectorAll
    Options.on('click', function () { 
    type =(this.id); // A= looking for a home, B=Looking for a Roomie Change: id homepage.handlebars
    document.getElementById("typeDropDown").textContent=this.innerHTML;
      return type;
    });
    // return type;
})();

(function (){
  var Options = $('.item-location');  //document.querySelectorAll
  Options.on('click', function () { 
  type =(this.id); // A= looking for a home, B=Looking for a Roomie Change: id homepage.handlebars
  document.getElementById("locationDropDown").textContent=this.innerHTML;
    return type;
  });
  return type;
})();

(function (){
  var Options = $('.item-pet');  //document.querySelectorAll
  Options.on('click', function () { 
  type =(this.id); // A= looking for a home, B=Looking for a Roomie Change: id homepage.handlebars
  document.getElementById("petDropDown").textContent=this.innerHTML;
    return type;
  });
  return type;
})();

//SIGNUP
signUpSubmit.addEventListener("click", async (event) => {
    event.preventDefault();
    const username = document.querySelector('#signupInputUserName').value.trim();
    const email = document.querySelector('#signupInputEmail').value.trim();
    const password = document.querySelector('#signupInputPassword').value.trim();
    const userType = type;

    if (username && email && password){
        const response = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({username, email, password, userType}),
            headers: { 'Content-Type': 'application/json' },
        })
        console.log("back")
        console.log(response.ok);
        if (response.ok) {
            console.log("in if auth")
            document.location.replace('/api/user');
            // const lemein = await fetch('/api/users/in')
            // .then(response => response.text())
            // .then(data => {
            //     console.log(data); // You can handle the response data here
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            // });
        } else {
            alert('There was a problem with your sign up, Please Try Again');
        }
    }else{
        alert('Please provide a Username, Email Adress, Password and what you will be looking for in our website.');
    }
  }
);

//LOGIN
var loginSubmit = document.querySelector("#loginSubmit");
loginSubmit.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.querySelector('#loginInputEmail').value.trim();
    const password = document.querySelector('#loginInputPassword').value.trim();

    if (email && password) {
        const response = await fetch('/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/api/user');
        } else {
          alert('Failed to log in.');
        }
    } else {
        alert('Please provide an Email Adress and Password so we can log you in.');
    }
})

//LOGOUT 
var logOutBtn = document.querySelector("#logOutBtn");
logOutBtn.addEventListener("click", 
async () => {
  console.log("click logout")
  // const response = await fetch('/logout', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  // });

  // if (response.ok) {
  //   document.location.replace('/');
  //   console.log("response ok")
  // } else {
  //   alert('Failed to log out.');
  // }
}
)

//SEARCH
var searchSubmit = document.querySelector("#searchSubmit");
searchSubmit.addEventListener("click", async (event) => {
  const location = document.querySelector('#locationDropDown').value;
  const typeOfHome = document.querySelector('#typeDropDown').value;
  const pet = document.querySelector('#petDropDown').value;

  if (location && typeOfHome && pet){
    const response = await fetch('/api/user', {
      method: 'GET',
      body: JSON.stringify({location, typeOfHome, pet}),
      headers: { 'Content-Type': 'application/json' },
  }) 
  } else {
    alert('Please complete all the forms');
  };
});