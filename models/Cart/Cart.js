const itemsMatch = require("../../utils/Matches");
const CartItem = require("./CartItem");
const Pizza = require("./Pizza");

class Cart {
    constructor() {
        this.items = [];
    }

    findIndex(itemToAdd) {
        let index;
        for (index = 0; index < this.items.length; index++) {
            if (itemsMatch(this.items[index], itemToAdd)) {
                break;
            }
        }

        if (index === this.items.length) {
            return -1;
        }

        return index;
    }
    
    remove(index) {
        this.items.splice(index, 1);
    }

    add(itemToAdd) {
        if (itemToAdd.category === "Pizzas") {
            this.items.push(new Pizza(itemToAdd));
        } else {
            this.items.push(new CartItem(itemToAdd));
        }

        this.items[this.length - 1].index = this.length - 1;

    }

    empty() {
        this.items = [];
    }

    get length() {
        return this.items.length;
    }

    get totalPrice() {
        return this.items.map(item => item.getTotalPrice()).reduce((acc, amt) => parseFloat(acc) + parseFloat(amt)).toFixed(2);
    }

    get totalCount() {
        // because if we just use length we wont collect items with a count > 1;
        return this.items.map(item => item.count).reduce((acc, amt) => parseInt(acc) + parseInt(amt));
    }
}

module.exports = Cart;
