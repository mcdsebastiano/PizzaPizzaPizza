/*global Menu*/
const express = require("express");
const router = express.Router();

const splitURL = require("../components/SplitURL");
const isValidQuery = require("../components/ValidQuery");

router.get("/", (req, res) => {
    res.render("menu", {
        Crumbs: splitURL(req),
        MenuCategories: Object.keys(Menu),
        Path: req.baseUrl,
        Menu
    });
});

router.get("/:category", (req, res) => {

    const category = req.params.category.replace(/_/g, " ");

    if (typeof Menu[category] !== "undefined" && Menu[category]) {
        res.render("partials/Tile__Menu", {
            Crumbs: splitURL(req),
            Items: Object.entries(Menu[category]),
            CatString: category,
            Path: req.baseUrl,
            category
        });
    } else {
        res.render("404", {
            Crumbs: splitURL(req),
            Path: req.url
        });
    }
});

router.get("/:category/:item", (req, res) => {

    const category = req.params.category.replace(/_/g, " ");
    const item = req.params.item.replace(/_/g, " ");

    if (typeof Menu[category] !== "undefined" && Menu[category]) {
        res.render("partials/Display__MenuItem", {
            Crumbs: splitURL(req),
            URL: req.url,
            Path: req.baseUrl,
            category: Menu[category],
            item
        });
    }
});

router.post("/:category/:item", (req, res) => {

    const category = req.params.category.replace(/_/g, " ");
    const item = req.params.item.replace(/_/g, " ");
    const size = req.body.size.replace(/_/g, " ");

    let validRequest = isValidQuery({
        category,
        item,
        size
    });

    if (validRequest === true) {

        res.json({
            status: "success",
            price: Menu[category][item].Price[size].toFixed(2),
            category,
            size,
            item
        });

    } else {
        //TODO: someones trying to tamper with the payment selector
    }
});

module.exports = router;
