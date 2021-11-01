const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const app = express();

require("dotenv").config();

const { Menu } = require("./components/Menu");
const Cart = require("./components/Cart");

// place the appropriate api key for your environment in your .env file
global.STRIPE_SK_KEY = process.env.STRIPE_SK_TEST || process.env.STRIPE_SK_LIVE;

global.Menu = Menu;
global.Cart = new Cart();

app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static("public"));

app.use("/", require("./routes/index"));
app.use("/menu", require("./routes/menu"));
app.use("/cart", require("./routes/cart"));
app.use("/about", require("./routes/about"));

app.get("*", (req, res) => {
    console.error(`ERROR: 404\n${req.baseUrl}${req.url}`);
    res.render("404", {
        Crumbs: req._parsedOriginalUrl.href.split("/").slice(1),
        Path: req.url
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is started on ${PORT}`));
