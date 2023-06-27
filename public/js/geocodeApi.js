/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
// Open Cage API
// https://opencagedata.com/api

console.log('GeocodeApi JS');
let searchAdrr;
// let theSearch = {
//     loc_search: false,
// };

document
  .getElementById('LocSrchBtn')
  .addEventListener('click', async (event) => {
    event.stopPropagation();
    event.preventDefault(); // Prevent form submission
    searchAdrr = document.getElementById('mySrch').value;
    const myData = await getLocationApi(searchAdrr);
  });

function getLocationApi(searchAdrr) {
  console.log('   getLocationApi()');
  const queryURL1 = `https://api.opencagedata.com/geocode/v1/json?q=${
    searchAdrr
  }&key=${process.env.KEY}`;

  fetch(queryURL1)
    .then((response) => response.json())
    .then((data) => {
      // console.log('data from getLocationApi:');
      // console.log(data.results);
      const place = [];
      data.results.forEach((ob) => {
        place.push(ob.formatted);
      });

      renderOpts(place);
      // return theSearch;
    });
}

let renderOpts = (locs) => {
  document.querySelector('#Select').textContent = 'Select the location that best matches your home:';
  for (i = 0; i < 6; i++) {
    // console.log(locs[i])
    document.getElementById(`${i}`).textContent = locs[i];
  }
  clickOptions(locs);
};

function clickOptions(data, optionsNamesArr) {
  const saveButton = $('.optionsx');
  saveButton.on('click', function (event) {
    // console.log("   clickOptions() on click");
    const theId = this.textContent;
    document.querySelector('#Select').textContent = 'Your Location: ';
    document.getElementById('0').textContent = theId;
    for (i = 1; i < 6; i++) {
      document.getElementById(`${i}`).textContent = '';
    }
    // console.log("the id!:"+theId);
    sub(theId);
  });
}

// document.getElementById('offerSubmit').addEventListener('click', async function(event){
//     // event.preventDefault(); // Prevent form submission
//     console.log("Se logró")
//     // searchAdrr = document.getElementById('mySrch').value;
//     // const myData = await getLocationApi(searchAdrr);
// })
