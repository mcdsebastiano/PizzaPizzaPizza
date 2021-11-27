/* global Cart */
/* global Menu */

const asyncHandler = require("express-async-handler");
const splitURL = require("../utils/SplitURL");

exports.display = asyncHandler(async(req, res) => {
    if (Cart.length === 0) {
        res.redirect("/order");
    } else {
        const {
            Toppings,
            Cheese,
            Crusts,
            Sauce
        } = Menu.Options;

        const idx = parseInt(req.query.id);

        res.render("edit", {
            Crumbs: splitURL(req),
            cartIdx: idx,
            Item: Cart.items[idx],
            Path: req.url,
            Toppings,
            Cheese,
            Crusts,
            Sauce
        });
    }
});

exports.edit = asyncHandler(async(req, res) => {

    // TODO: Error handling
    const index = req.body.index;

    const {
        modifier,
        options
    } = req.body.selectors;

    const cartItem = Cart.items[index];
    
    // Assign the new modifiers to the current Cart item
    switch (modifier) {

    case "Crusts":
        cartItem.adjustPriceByOption(modifier, cartItem.crust, options);
        cartItem.crust = options;
        break;
    case "Sauce":
        cartItem.adjustPriceByOption(modifier, cartItem.sauce, options);
        cartItem.sauce = options;
        break;
    case "Sauce Modifier":
        cartItem.adjustPriceByOptionMod(modifier, cartItem.sauceMod, options);
        cartItem.sauceMod = options;
        break;
    case "Cheese":
        cartItem.adjustPriceByOptionMod(modifier, cartItem.cheese, options);
        cartItem.cheese = options;
        break;
    default:
        break;
    }

    if (modifier === "Toppings") {
        const portion = options[0];
        const topping = options[2];
        const type = options[1];

        //Check if topping has been selected previously in one of the other portions
        if (portion !== "Left" && cartItem.hasTopping("Left", topping)) {
            cartItem.toggleTopping(cartItem.leftToppings, topping, "Left", type);

        } else if (portion !== "Whole" && cartItem.hasTopping("Whole", topping)) {
            cartItem.toggleTopping(cartItem.wholeToppings, topping, "Whole", type);

        } else if (portion !== "Right" && cartItem.hasTopping("Right", topping)) {
            cartItem.toggleTopping(cartItem.rightToppings, topping, "Right", type);

        }

        // Now add the topping to the proper portion
        cartItem.toggleTopping(cartItem.Options.Toppings[portion], topping, portion, type);
    }
    res.end();
});