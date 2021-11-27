const router = require("express").Router();

const MenuController = require("../controllers/MenuController");

router.get("/", MenuController.display_menu);
router.get("/:category", MenuController.display_category);
router.get("/:category/:item", MenuController.display_item);
router.post("/:category/:item", MenuController.adjust_price);


module.exports = router;
