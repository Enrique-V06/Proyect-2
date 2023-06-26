//Change Password and Delete Account 
// const bcrypt = require('bcrypt');
console.log('profile.js file')

var saveChanges = document.querySelector('.changePwSubmit');
var deleteAccount = document.querySelector('.deleteSubmit');

//Change Password
saveChanges.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const newPassword = document.querySelector('#newPwd').value;
    const verifyPassword = document.querySelector('#newPwd2').value;

    if (newPassword === verifyPassword){
        const response = await fetch(`/api/profile/${email} `, {
            method: 'PUT', 
            body: JSON.stringify({newPassword}),
            headers: { 'Content-Type': 'application/json' },
        })
    } else {
        alert('Error introducing new password')
    }
});

//Delete account - WORKING
deleteAccount.addEventListener('click', async (event) => {
    event.preventDefault();
    const userEmail = document.querySelector('#userEmail').value;

    console.log("user email", userEmail)

    if (userEmail){
        const response = await fetch(`/api/profile/${userEmail} `, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.ok) {
            document.location.replace('/'); //Not working
        } else {
            alert('There was a problem deleting your account');
        }
    } else {
        alert('There was a problem deleting your account');
    }
});
