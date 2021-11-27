const router = require("express").Router();
const OrderController = require("../controllers/OrderController");
const CheckoutController = require("../controllers/CheckoutController");
const ItemEditor = require("../controllers/ItemEditor");

router.get("/", OrderController.new_order_page);
router.post("/", OrderController.empty_cart);
// router.delete("/", OrderController.cancel_order);
router.patch("/:index", OrderController.update_item_quantity);
router.delete("/:index", OrderController.remove_item_from_order);
router.post("/:category/:item/:size", OrderController.add_item_to_order);

// Checkout API
router.get("/cancel", CheckoutController.checkout_cancel);
router.get("/success", CheckoutController.checkout_success);
router.post("/checkout", CheckoutController.checkout_order);

// Edit API
router.get("/edit", ItemEditor.display);
router.post("/edit", ItemEditor.edit);

module.exports = router;
