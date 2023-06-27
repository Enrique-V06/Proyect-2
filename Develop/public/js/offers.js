/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
console.log('IN OFFERS:JS');
// const path = require('path');
// const fs = require('fs');
const OfferForm = document.getElementById('offerSubmit');

function sub(location) {
  OfferForm.addEventListener('click', async (e) => {
    e.preventDefault();
    // let location = document.querySelector('.locationInput').value.trim();
    const radioOptions = document.getElementsByName('typeOfHomeRadio');
    let typeOfHome;
    const offerPetFriendly = document.querySelector('#checkPetFriendly');
    // let fileData = document.getElementById('formFile').value;
    const fileInput = document.querySelector('input[type="file"]');
    const image = fileInput.files[0];
    //----
    let roomiesNum = document.querySelector('#roomiesNum');
    let messageroom = document.querySelector('#messageroom');
    const roomies = roomiesNum.value.trim(); 
    const message = messageroom.value.trim();

    console.log("--------- ROOMIE & MESSAGE");
    console.log(roomies, message);

    // console.log('FILE DATA :', fileData);
    const pet = offerPetFriendly.checked;
    for (let i = 0; i < radioOptions.length; i++) {
      if (radioOptions[i].checked) {
        typeOfHome = radioOptions[i].value;
        break;
      }
    }

    const formData = new FormData();
    formData.append('location', location);
    formData.append('typeOfHome', typeOfHome);
    formData.append('image', image);
    formData.append('pet', pet);
    formData.append('roomies', roomies);
    formData.append('message', message);


    if ((location && typeOfHome && pet && roomies) || (location && typeOfHome && !pet && roomies)) {
      const response = await fetch('/api/offer/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('RES', response);
      if (response.ok) {
        document.location.replace('/api/profile');
      } else {
        alert('Failed to create Offer (offers.js)');
      }
    }
  });
}

// let multerBTN = document.querySelector('.multerBTN');
