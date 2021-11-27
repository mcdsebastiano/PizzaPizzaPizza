/* global Cart */
/* global STRIPE_SK_KEY */

const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(STRIPE_SK_KEY);
const splitURL = require("../utils/SplitURL");

// Checkout API
exports.checkout_cancel = asyncHandler(async(req, res, next) => {
    res.redirect("/");
});

exports.checkout_success = asyncHandler(async(req, res, next) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer = await stripe.customers.retrieve(session.customer);
    const checkedOut = Cart.items;

    if (typeof session === "undefined" || typeof customer === "undefined") {
        res.redirect("/cart");
    } else {
        Cart.empty();
        let crumbsArray = splitURL(req);
        res.render("success", {
            Crumbs: crumbsArray.slice(1, crumbsArray.length - 2),
            Path: req.url,
            checkedOut,
            customer,
            session
        });
    }
});

exports.checkout_order = asyncHandler(async(req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                ({
                    price_data: {
                        currency: "cad",
                        product_data: {
                            name: "Company Name Pizza",
                        },
                        unit_amount: Math.round(Cart.totalPrice * 100)
                    },
                    quantity: 1,
                })
            ],
            mode: "payment",
            success_url: req.headers.referer + "/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: req.headers.referer + "/cancel"
        });
        res.redirect(303, session.url);
    } catch (err) {
        next(err);
    }
});
