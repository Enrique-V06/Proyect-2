/* eslint-disable no-restricted-globals */
// Change Password and Delete Account
console.log('profile.js file');

const saveChanges = document.querySelector('.changePwSubmit');
const deleteAccount = document.querySelector('.deleteSubmit');

// Change Password - WORKING
saveChanges.addEventListener('click', async (event) => {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const newPassword = document.querySelector('#newPwd').value;
  const verifyPassword = document.querySelector('#newPwd2').value;

  // Validar longitud aquí también

  if (newPassword === verifyPassword) {
    const response = await fetch(`/api/profile/${email} `, {
      method: 'PUT',
      body: JSON.stringify({ newPassword }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      location.reload('/api/profile');
    } else {
      alert(('Password not updated'));
    }
  } else {
    alert('Passwords do NOT match');
  }
});

// Delete account - WORKING
deleteAccount.addEventListener('click', async (event) => {
  event.preventDefault();
  const userEmail = document.querySelector('#userEmail').value;

  console.log('user email', userEmail);

  if (userEmail) {
    const response = await fetch(`/api/profile/${userEmail} `, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('There was a problem deleting your account');
    }
  } else {
    alert('There was a problem deleting your account');
  }
});
