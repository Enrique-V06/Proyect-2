// ----------- Type of user JQuery
let type;
let loc;
let typeOfHome;
let pet;

(function () {
    var Options = $('.item-type');  //document.querySelectorAll
    Options.on('click', function () {
        type = (this.id); // A= looking for a home, B=Looking for a Roomie Change: id homepage.handlebars
        document.getElementById("typeDropDown").textContent = this.innerHTML;
        typeOfHome = this.innerHTML;
        return type;
    });
    // return type;
})();

(function () {
    var Options = $('.item-location');  //document.querySelectorAll
    Options.on('click', function () {
        type = (this.id); // A= looking for a home, B=Looking for a Roomie Change: id homepage.handlebars
        document.getElementById("locationDropDown").textContent = this.innerHTML;
        loc = this.innerHTML;
        return type;
    });
    return type;
})();

(function () {
    var Options = $('.item-pet');  //document.querySelectorAll
    Options.on('click', function () {
        type = (this.id); // A= looking for a home, B=Looking for a Roomie Change: id homepage.handlebars
        document.getElementById("petDropDown").textContent = this.innerHTML;
        pet = this.innerHTML;
        return type;
    });
    return type;
})();


var searchSubmit = document.querySelector('#submitSearchBtn');

searchSubmit.addEventListener('click', async (event) => {

    console.log(typeOfHome, loc, pet)

    if (typeOfHome && loc && pet){
        const response = await fetch('/api/search', {
            method: 'POST', 
            body: JSON.stringify({typeOfHome, loc, pet}),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            document.location.replace('/api/search');
        } else {
            alert('There was a problem with your search')
        }
    } else {
        alert('Please submit the three options for your personalized search')
    }
});

