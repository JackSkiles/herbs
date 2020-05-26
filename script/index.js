const search = document.getElementById('search-form');
const strainList = document.getElementById('strain-holder');
// let strainData = [];
let strainArray;

function saveToShoppingCart(id) {
    console.log(id);
    let cartItem = strainArray.find(currentStrain => currentStrain.id == id);
    let strainListJSON = localStorage.getItem('strainList');

    let strainList = JSON.parse(strainListJSON);
    
    if (strainList == null) {
        strainList = [];
    }
    
    strainList.push(cartItem);
    alert(cartItem.name + ' Has been added to your cart')
    strainListJSON = JSON.stringify(strainList);

    localStorage.setItem('strainList', strainListJSON);
}

function raceImage(race) {
    console.log(race);
    if (race === 'indica'){
        return 'indica.jpg';
    }
    else if (race === 'sativa'){
        return 'sativa.jpg';
    }
    else if (race === 'hybrid'){
        return 'hybrid.png';
    }
}

search.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchString = document.querySelector('input').value;
    const urlEncodedSearchString = encodeURIComponent(searchString);
    axios.get( "https://strainapi.evanbusse.com/Fppxe7R/strains/search/name/" + urlEncodedSearchString)
    .then(function (response) {
        let strainData = response.data;
        let strainHtmlArray = strainData.map(function (currentStrain) {
            if (currentStrain.desc === null) {
                return `
                <div class="card-body">
                    <h3 class="card-text mx-auto" id="text">${currentStrain.name}</h3>
                    <img src="images/${raceImage(currentStrain.race)}" height="150px" width="150px">
                    <p>${currentStrain.race}</p>
                    <p>No description available</p>
                    <button type="button" class="btn btn-primary" id="pic" onclick="saveToShoppingCart('${currentStrain.id}')">Add to cart</button>
                    </div>`
            }
            else {
                return `
                <div class="card-body">
                    <h3 class="card-text mx-auto" id="text">${currentStrain.name}</h3>
                    <img src="images/${raceImage(currentStrain.race)}" height="150px" width="150px">
                    <p>${currentStrain.race}</p>
                    <p>${currentStrain.desc}</p>
                    <button type="button" class="btn btn-primary" id="pic" onclick="saveToShoppingCart('${currentStrain.id}')">Add to cart</button>
                </div>`
            }
        });
        strainList.innerHTML = strainHtmlArray.join('')
        strainArray = strainData;
        // console.log(movieData);
    })

});
    // return movieHtmlArray.join(' ');
