// 
console.log("Auth.js file")
var signUpSubmit = document.querySelector("#signUpSubmit");
var type; 
// ----------- Type of user JQuery  
(function (){
    var Options = $('.dropdown-item');  
    Options.on('click', function () { 
    type =(this.id); // A= looking for a home, B=Looking for a Roomie Change: id homepage.handlebars
    document.getElementById("dropdownMenuButton").textContent=this.innerHTML;
      return type;
    });
    return type;
})();

signUpSubmit.addEventListener("click", async (event) => {
    event.preventDefault();
    const username = document.querySelector('#signupInputUserName').value.trim();
    const email = document.querySelector('#signupInputEmail').value.trim();
    const password = document.querySelector('#signupInputPassword').value.trim();
    const userType = type;

    if (username && email && password){
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({username, email, password, userType}),
            headers: { 'Content-Type': 'application/json' },
        })
        console.log("back")
        if (response.ok) {
            console.log("in if auth")
            document.location.replace('/api/users/in');
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

var loginSubmit = document.querySelector("#loginSubmit");
loginSubmit.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.querySelector('#loginInputEmail').value.trim();
    const password = document.querySelector('#loginInputPassword').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/api/users/in');
        } else {
          alert('Failed to log in.');
        }
    } else {
        alert('Please provide an Email Adress and Password so we can log you in.');
    }
})