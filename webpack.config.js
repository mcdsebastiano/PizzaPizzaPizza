const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: {
        priceSelector: "./front-end/services/PriceSelectorService.js",
        orderButton: "./front-end/services/OrderButtonService.js",
        cart: "./front-end/services/CartServices.js",
        vendor: "./front-end/vendor.js"
    },
    output: {
        path: __dirname + "/public/",
        filename: "./js/[name].js"
    }
};