console.log('IN OFFERS:JS');
// const path = require('path');
// const fs = require('fs');
const OfferForm = document.getElementById('offerSubmit');

function sub(location) {
  OfferForm.addEventListener('click', async (e) => {
    e.preventDefault();
    // let location = document.querySelector('.locationInput').value.trim();
    let radioOptions = document.getElementsByName('typeOfHomeRadio');
    let typeOfHome;
    let offerPetFriendly = document.querySelector('#checkPetFriendly');
    //let fileData = document.getElementById('formFile').value;
    const fileInput = document.querySelector('input[type="file"]');
    const image = fileInput.files[0];
    const formData = new FormData();

    //console.log('FILE DATA :', fileData);
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
    console.log('File data :', image);

    formData.append('location', location);
    formData.append('typeOfHome', typeOfHome);
    formData.append('image', image);
    formData.append('pet', pet);

    if ((location && typeOfHome && pet) || (location && typeOfHome && !pet)) {
      const response = await fetch('/api/offer/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('RESPONSE WAS GOOD');
        //document.location.replace('/api/profile');
      } else {
        alert('Failed to create Offer (offers.js)');
      }
    }
  });
}

// let multerBTN = document.querySelector('.multerBTN');
