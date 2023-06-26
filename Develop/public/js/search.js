// ----------- Type of user JQuery
let type;
(function () {
    var Options = $('.item-type');  //document.querySelectorAll
    Options.on('click', function () {
        type = (this.id); // A= looking for a home, B=Looking for a Roomie Change: id homepage.handlebars
        document.getElementById("typeDropDown").textContent = this.innerHTML;
        typeOfHome = this.innerHTML;
        searchFunc();
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
        searchFunc();
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
        searchFunc();
        return type;
    });
    return type;
})();

let loc;
let typeOfHome;
let pet;

async function searchFunc() {
    console.log(loc, typeOfHome, pet)

    fetch('/api/user/search', {
        method: 'GET', 
        body: JSON.stringify({loc, typeOfHome, pet }), 
        headers: { 'Content-Type': 'application/json' },   
    })
    location.reload();
    // //Location reload
    // if (loc && typeOfHome && pet) {
    //     const response = await fetch('/api/user/search', {
    //         method: 'GET',
    //         body: JSON.stringify({ loc, typeOfHome, pet }),
    //         headers: { 'Content-Type': 'application/json' },
    //     })
    // } else {
    //     alert('Please complete all the forms');
    // };
}
