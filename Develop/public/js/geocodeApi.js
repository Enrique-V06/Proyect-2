// Open Cage API 
// https://opencagedata.com/api

console.log("GeocodeApi JS")
let searchAdrr;
// let theSearch = {
//     loc_search: false,
// };

document.getElementById('LocSrchBtn').addEventListener('click', async function(event){
    event.preventDefault(); // Prevent form submission
    searchAdrr = document.getElementById('mySrch').value;
    const myData = await getLocationApi(searchAdrr);    
})

function getLocationApi(searchAdrr) {
    console.log("   getLocationApi()");
    var queryURL1 = "https://api.opencagedata.com/geocode/v1/json?q="+ searchAdrr +"&key=2f9dc7b017e04d3daa1a27f20c2b9aad" ;
  
    fetch(queryURL1)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log('data from getLocationApi:');
        console.log(data.results);
        let place=[];
        data.results.forEach((ob)=>{
            place.push(ob.formatted)
        })

        renderOpts(place);
        // return theSearch;
      })
      ;
}

let renderOpts = (locs) => {
    document.querySelector("#Select").textContent="Select the location that best matches your home:";
    for (i=0;i<6;i++){
        console.log(locs[i])
        document.getElementById(`${i}`).textContent= locs[i];
    }    
    clickOptions(locs) 
}

function clickOptions(data,optionsNamesArr){  
    var saveButton = $('.optionsx');
    saveButton.on('click', function (event) {
        console.log("   clickOptions() on click");
        var theId = this.textContent;
        document.querySelector("#Select").textContent="Your Location: ";
        document.getElementById(`0`).textContent= theId;
        for (i=1;i<6;i++){
            document.getElementById(`${i}`).textContent="";
        } 
        console.log("the id!:"+theId);
        sub(theId);
    });
}

// document.getElementById('offerSubmit').addEventListener('click', async function(event){
//     // event.preventDefault(); // Prevent form submission
//     console.log("Se logró")
//     // searchAdrr = document.getElementById('mySrch').value;
//     // const myData = await getLocationApi(searchAdrr);    
// })
