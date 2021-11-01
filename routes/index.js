const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
    res.render("index", {
        Crumbs: req._parsedOriginalUrl.href.split("/").filter(url => url !== ""),
        Path: req.url
    });
});

module.exports = router;
