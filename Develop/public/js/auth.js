// 
console.log("Auth.js file")
var signUpSubmit = document.querySelector("#signUpSubmit");
var type; 
//  Parameter Options COLOR 
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
    }
  }
);

