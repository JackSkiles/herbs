
const strainList = document.getElementById('strain-holder2');
const message = document.getElementById('message');
const checkoutButton = document.getElementById('checkout');

function removeFromCart(id) {
    newid = parseInt(id);
    let cartJSON = localStorage.getItem('strainList');
    
    let cartItem = JSON.parse(cartJSON);
    console.log(cartItem);


    cartItem = cartItem.filter(function (item){
        console.log(item.id);
        if(newid !== item.id) {
            return true;
        }
        else {
            return false;
        }
    })
    if (cartItem.length === 0) {
        message.innerHTML = 'Your cart is empty'
    }

    cartJSON = JSON.stringify(cartItem);
    localStorage.setItem('strainList', cartJSON);
    location.reload();

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


document.addEventListener('DOMContentLoaded', function() {
    let shoppingCartJSON = localStorage.getItem('strainList');
    let shoppingCart = JSON.parse(shoppingCartJSON)
    console.log(shoppingCart);
    let strainHtmlArray = shoppingCart.map(function (currentStrain) {
        return `
        <div class="card-body" id="cart">
            <h3 class="card-text mx-auto" id="text">${currentStrain.name}</h3>
            <img src="images/${raceImage(currentStrain.race)}" height="275px">
            <p id="para">${currentStrain.race}</p>
            <button type="button" class="btn btn-secondary" id="pic" onclick="removeFromCart('${currentStrain.id}')">Remove From Cart</button>
            </div>`
    });
    strainArray = strainData;
    strainList.innerHTML = strainHtmlArray.join('')
    console.log(strainArray);


    if (shoppingCart.length > 0) {
        message.innerHTML = ('')
    }
    // strainArray = strainData;
    // console.log(strainArray);
});


checkoutButton.addEventListener('click', function(){
    let shoppingCartJSON = localStorage.getItem('strainList');
    
    alert('Thank you for your purchase!');
    shoppingCartJSON = null;

    location.reload();

    return localStorage.setItem('strainList', shoppingCartJSON);
    
});