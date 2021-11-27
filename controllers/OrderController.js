/* global Menu */
/* global Cart */

const asyncHandler = require("express-async-handler");
const isValidQuery = require("../utils/ValidQuery");

// View Cart
exports.new_order_page = asyncHandler(async(req, res, next) => {
    // client side DOM to create a new order, accept button => confirmation form => server request
    // series of confirmations:
    // get name, email, & whether delivery or pickup -- if delivery, get address, phone number.
    // create a JWT or some kind of new order id/hash to a database to reference later.
    try {
        res.render("cart", {
            Crumbs: req._parsedOriginalUrl.href.split("/").slice(1),
            Path: req.url,
        });
    } catch (err) {
        next(err);
    }
});

// Empty Cart
exports.empty_cart = asyncHandler(async(req, res) => {
    Cart.items = [];
    res.send(Cart.items);
});


// Cancel Order
exports.empty_cart = asyncHandler(async(req, res) => {
    Cart.items = [];
    res.send(Cart.items);
});


// Update Item Quantity
exports.update_item_quantity = asyncHandler(async(req, res) => {
    const count = parseInt(req.body.count);
    const index = parseInt(req.params.index);
    
    if (count === 0) {
        Cart.remove(index);
    } else {
        Cart.items[index].count = count;
    }

    res.status(200).json({item: Cart.items[index]});
});


// Remove Item From Order
exports.remove_item_from_order = asyncHandler(async(req, res) => {
    Cart.remove(req.params.index);
    res.end();
});

// Add Item to Order
exports.add_item_to_order = asyncHandler(async(req, res) => {

    if (isValidQuery(req.body) === false) {
        // some kind of error handling on POST.
    }

    const {
        category,
        item,
        size
    } = req.params;

    const itemToAdd = {
        price: Menu[category][item].Price[size],
        category,
        name: item,
        size,
        // we need to make a deep copy of the menu options.
        Options: JSON.parse(JSON.stringify(Menu[category][item])).Options
    };

    let index = Cart.findIndex(itemToAdd);

    if (item === "Build Your Own" || index === -1) {
        Cart.add(itemToAdd);
        index = Cart.length - 1;
    } else {
        Cart.items[index].count += 1;
    }

    res.status(200).end();
});

