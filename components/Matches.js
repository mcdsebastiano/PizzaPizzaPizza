function itemsMatch(cartItem, itemToAdd) {
    
    if(itemToAdd.category === "Pizzas") {
        return cartItem.name === itemToAdd.name
         && cartItem.size === itemToAdd.size
         && cartItem.price === itemToAdd.price
         && cartItem.Options.Crust === itemToAdd.Options.Crust
         && cartItem.Options.Sauce[0] === itemToAdd.Options.Sauce[0]
         && cartItem.Options.Cheese === itemToAdd.Options.Cheese
         && toppingsMatch(cartItem, itemToAdd, "Whole")
         && toppingsMatch(cartItem, itemToAdd, "Left")
         && toppingsMatch(cartItem, itemToAdd, "Right");    
    }
    return cartItem.name === itemToAdd.name
     && cartItem.size === itemToAdd.size
     && cartItem.price === itemToAdd.price;
}

function toppingsMatch(cartItem, itemToAdd, portionString) {
    let cartItemPortionToppings = cartItem.Options.Toppings[portionString];
    let itemToAddPortionToppings = itemToAdd.Options.Toppings[portionString];
    for (let i = 0; i < itemToAddPortionToppings; i++) {
        if (cartItemPortionToppings[i] !== itemToAddPortionToppings[i]) {
            return false;
        }
    }
    return true;
}

module.exports = itemsMatch;
