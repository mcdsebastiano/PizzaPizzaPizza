const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const path = require("path");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

// const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pizzapizzapizza";

// mongoose.connect(mongoURI)
    // .then(() => console.log("MongoDB Connected"))
    // .catch(err => console.log(err));

//@Cleanup
const {
    Menu
} = require("./models/MenuData");
const Cart = require("./models/Cart");

global.Menu = Menu;
global.Cart = new Cart();

// place the appropriate api key for your environment in your .env file
global.STRIPE_SK_KEY = process.env.STRIPE_SK_TEST || process.env.STRIPE_SK_LIVE;

app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/index"));
app.use("/menu", require("./routes/menu"));
app.use("/order", require("./routes/order"));
app.use("/about", require("./routes/about"));

// app.get("*", (req, res) => {
    // console.error(`ERROR: 404\n${req.baseUrl}${req.url}`);
    // res.render("404", {
        // Crumbs: req._parsedOriginalUrl.href.split("/").slice(1),
        // Path: req.url
    // });
// });


app.use(function (req, res, next) {
    next(createError(404));
});


app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    
    console.log(res.locals.error)

    res.status(err.status || 500);
    res.render("error", {
        Crumbs: ["Error"],
        Error: res.locals.error,
        ErrorMessage: res.locals.message
        
    });
});




module.exports = app;