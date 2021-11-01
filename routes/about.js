const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

    res.render("about", {
        Crumbs: req._parsedOriginalUrl.href.split("/").slice(1),
        Path: req.url
    });

});

module.exports = router;