// 
console.log("Auth.js file")
var signUpSubmit = document.querySelector("#signUpSubmit");

signUpSubmit.addEventListener("click", async (event) => {
    event.preventDefault();
    const username = document.querySelector('#signupInputUserName').value.trim();
    const email = document.querySelector('#signupInputEmail').value.trim();
    const password = document.querySelector('#signupInputPassword').value.trim();
    // const userType = document.querySelector('#dropdownMenuButton');

    if (username && email && password){
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            // const lemein = await fetch('/someroot', {
            //     method: 'GET',
            // })
            console.log("response ok")
        } else {
            alert('Failed to sign up.');
        }
    }
  }
);

