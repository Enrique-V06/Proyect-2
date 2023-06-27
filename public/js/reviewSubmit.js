/* eslint-disable no-alert */
// submit reviews

const reviewSubmit = document.querySelector('#reviewSubmit');
reviewSubmit.addEventListener('click', async (e) => {
  e.preventDefault();
  const revName = document.querySelector('#nameInput').value.trim();
  const revBody = document.querySelector('#revInput').value.trim();

  if (revName && revBody) {
    const response = await fetch('/revsubmit', {
      method: 'POST',
      body: JSON.stringify({ revName, revBody }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log(revName, revBody);
    } else {
      alert('Failed to submit.');
    }
  } else {
    alert('Please provide a name and write a review.');
  }
});
