/* eslint-disable no-alert */
//
console.log('Auth.js file');
const signUpSubmit = document.querySelector('#signUpSubmit');
let type;

// SIGNUP
signUpSubmit.addEventListener('click', async (event) => {
  event.preventDefault();
  const username = document.querySelector('#signupInputUserName').value.trim();
  const email = document.querySelector('#signupInputEmail').value.trim();
  const password = document.querySelector('#signupInputPassword').value.trim();
  const userType = type;

  if (username && email && password) {
    const response = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({
        username, email, password, userType,
      }),
      // file:¨
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('back');
    console.log(response.ok);
    if (response.ok) {
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
  } else {
    alert('Please provide a Username, Email Adress, Password and what you will be looking for in our website.');
  }
});

// LOGIN
const loginSubmit = document.querySelector('#loginSubmit');
loginSubmit.addEventListener('click', async (event) => {
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
});

// LOGOUT
const logOutBtn = document.querySelector('#logOutBtn');
logOutBtn.addEventListener(
  'click',
  async () => {
    console.log('click logout');
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
  },
);
