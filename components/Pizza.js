/*global Cart*/
/*global Menu*/

const CartItem = require("./CartItem");

class Pizza extends CartItem {
    constructor(item) {
        super(item);
        this.Options = item.Options;
    }

    get crust() {
        return this.Options.Crust;
    }

    set crust(options) {
        this.Options.Crust = options;
    }

    get cheese() {
        return this.Options.Cheese;
    }

    set cheese(options) {
        this.Options.Cheese = options;
    }

    get cheeseMod() {
        return this.Options.Cheese.Mod;
    }

    get sauce() {
        return this.Options.Sauce[0];
    }

    set sauce(options) {
        this.Options.Sauce[0] = options;
    }

    get sauceMod() {
        return this.Options.Sauce[1];
    }

    set sauceMod(options) {
        this.Options.Sauce[1] = options;
    }

    get toppings() {
        return this.Options.Toppings;
    }

    get leftToppings() {
        return this.Options.Toppings.Left;
    }

    get rightToppings() {
        return this.Options.Toppings.Right;
    }

    get wholeToppings() {
        return this.Options.Toppings.Whole;
    }

    addTopping(portion, topping) {
        if (this.category !== "Pizzas") {
            return;
        }

        this.Options.Toppings[portion].push(topping);
    }

    removeTopping(portion, topping) {
        this.Options.Toppings[portion].splice(this.Options.Toppings[portion].indexOf(topping), 1);
    }

    hasTopping(portion, topping) {
        return this.Options.Toppings[portion].includes(topping);
    }

    toggleTopping(Toppings, topping, portion, type) {

        if (portion !== "Whole" && portion !== "Right" && portion !== "Left") {
            return;
        }

        for (let t in Menu.Options.Toppings) {
            if (type !== t) {
                return;
            }
        }

        if (Menu.Options.Toppings[type].List.includes(topping) === false) {
            return;
        }

        const found = Cart.items[this.index].Options.Toppings[portion].includes(topping);

        if (found === true) {
            this.removeTopping(portion, topping);
            this.price -= Menu.Options.Toppings[type].Price[this.size];
        } else {
            this.addTopping(portion, topping);
            this.price += Menu.Options.Toppings[type].Price[this.size];
        }
    }

    adjustPriceByOption(which, modifier, options) {
        this.price -= Menu.Options[which][modifier].Price[this.size];
        this.price += Menu.Options[which][options].Price[this.size];
    }

    adjustPriceByOptionMod(which, modifier, options) {
        which = which.split(" ", 1);
        this.price -= Menu.Options[which].Mod[modifier].Price[this.size];
        this.price += Menu.Options[which].Mod[options].Price[this.size];
    }
}


module.exports = Pizza;