/*global Menu*/

const asyncHandler = require("express-async-handler");
const splitURL = require("../utils/SplitURL");

exports.display_menu = asyncHandler(async(req, res) => {
    res.render("menu", {
        Crumbs: splitURL(req),
        MenuCategories: Object.keys(Menu),
        Path: req.baseUrl,
        Menu
    });
});

exports.display_category = asyncHandler(async(req, res, next) => {
    const category = req.params.category.replace(/_/g, " ");
    try {
        if (typeof Menu[category] === "undefined") {
            throw new Error("Not a valid menu category");
        }
        // @Cleanup -- excess?
        res.render("tiles/Menu", {
            Crumbs: splitURL(req),
            Items: Object.entries(Menu[category]),
            CatString: category,
            Path: req.baseUrl,
            category
        });
    } catch (err) {
        next(err);
    }
});

exports.display_item = asyncHandler(async(req, res, next) => {
    const category = req.params.category.replace(/_/g, " ");
    const item = req.params.item.replace(/_/g, " ");
    try {
        if (typeof Menu[category] === "undefined" || typeof Menu[category][item] === "undefined") {
            throw new Error("Not a valid menu item/category");
        }
        res.render("menu_item", {
            Crumbs: splitURL(req),
            URL: req.url,
            Path: req.baseUrl,
            category: Menu[category],
            categoryString: category,
            item
        });
    } catch (err) {
        next(err);
    }
});

exports.adjust_price = asyncHandler(async(req, res) => {
    const category = req.params.category.replace(/_/g, " ");
    const item = req.params.item.replace(/_/g, " ");
    const size = req.body.size;
    const price = Menu[category][item].Price[size];

    res.json({
        category,
        item,
        size,
        price
    });
});
