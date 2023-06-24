const OfferForm = document.querySelector('.offer-form');

OfferForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  let location = document.querySelector('.locationInput').value.trim();
  let radioOptions = document.getElementsByName('typeOfHomeRadio');
  let typeOfHome;
  let offerPetFriendly = document.querySelector('#checkPetFriendly');

  let pet = offerPetFriendly.checked;
  for (let i = 0; i < radioOptions.length; i++) {
    if (radioOptions[i].checked) {
      typeOfHome = radioOptions[i].value;
      break;
    }
  }

  console.log('Type of Home  :', typeOfHome);
  console.log('Location :', location);
  console.log('Pet Friendly :', pet);

  if (location && typeOfHome && pet) {
    const response = await fetch('/api/offer', {
      method: 'POST',
      body: JSON.stringify({
        location,
        typeOfHome,
        pet,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/api/profile');
    } else {
      alert('Failed to create Offer (offers.js)');
    }
  }
});
