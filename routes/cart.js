/*global Cart*/
/*global Menu*/
/*global STRIPE_SK_KEY*/
const express = require("express");
const router = express.Router();

const stripe = require("stripe")(STRIPE_SK_KEY);

const isValidQuery = require("../components/ValidQuery");
const splitURL = require("../components/SplitURL");

router.get("/", (req, res) => {
    console.log("splitURL: " + splitURL);
    res.render("cart", {
        Crumbs: req._parsedOriginalUrl.href.split("/").slice(1),
        Path: req.url,
    });
});

router.get("/add", (req, res) => {

    if (isValidQuery(req.query) === false) {
        res.status(400).send("Invalid URL context");
        return;
    }

    const {
        category,
        item,
        size
    } = req.query;

    const itemToAdd = {
        price: Menu[category][item].Price[size],
        category,
        name: item,
        size,
        // we need to make a deep copy of the menu options.
        Options: JSON.parse(JSON.stringify(Menu[category][item])).Options
    };

    if (item === "Build Your Own") {
        // always add a byo as a new item
        Cart.add(itemToAdd);
        res.redirect(`/cart/edit?id=${Cart.length - 1}`);

    } else {
        let index = Cart.findIndex(itemToAdd);

        if (index === -1) {
            Cart.add(itemToAdd);
            index = Cart.length - 1;
        } else {
            Cart.items[index].count += 1;
        }

        res.render("partials/Display__CartItem", {
            Crumbs: splitURL(req),
            count: Cart.items[index].count,
            item: Cart.items[index],
            Path: req.url,
            idx: index
        });
    }

});

router.post("/update-quantity", (req, res) => {

    const count = parseInt(req.body.count);
    const idx = parseInt(req.body.idx);

    if (Number.isInteger(count) === false) {
        console.error("Invalid input for quantity");
        return;
    }

    if (count === 0) {
        Cart.items.splice(idx, 1);
    } else {
        Cart.items[idx].count = count;
    }

    res.end();
});

router.post("/remove", (req, res) => {
    const idx = parseInt(req.query.id);
    Cart.items.splice(idx, 1);
    res.redirect("/cart");
});

router.post("/empty", (req, res) => {
    Cart.empty();
    res.redirect("/cart");
});

router.get("/edit", (req, res) => {

    if (Cart.length === 0) {
        res.redirect("/cart");
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

router.post("/edit", (req, res) => {

    // need to include event listeners for mobile touchstart/touchend etc

    const {
        idx
    } = req.body;

    const {
        modifier,
        options
    } = req.body.selectors;

    const cartItem = Cart.items[idx];

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

// Payment API

router.get("/success", async(req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer = await stripe.customers.retrieve(session.customer);
    const checkedOut = Cart.items;

    if (typeof session === "undefined" || typeof customer === "undefined") {
        res.redirect("/cart");
    } else {
        Cart.empty();
        let crumbsArray = splitURL(req);
        res.render("partials/Display__CheckoutSuccess", {
            Crumbs: crumbsArray.slice(1, crumbsArray.length - 2),
            Path: req.url,
            checkedOut,
            customer,
            session
        });
    }
});

router.get("/cancel", (req, res) => {
    res.redirect("/");
});

router.post("/checkout", async(req, res) => {

    const session = stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
            price_data: {
                currency: "cad",
                product_data: {
                    name: "Company Name Pizza",
                },
                unit_amount: Cart.totalPrice * 100,
            },
            quantity: 1,
        }
        ],
        mode: "payment",
        success_url: req.headers.referer + "/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: req.headers.referer + "/cancel"
    }).then(session => {
        res.redirect(303, session.url);
    }).catch(err => console.log(err));

});

module.exports = router;