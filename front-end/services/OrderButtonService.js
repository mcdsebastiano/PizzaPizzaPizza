const OrderButton = require("./order-button");

OrderButton.onClick(res => {
    // TODO:
    // Modal or something that looks nice (Continue Shopping, goto Cart, Modify Pizza)
    alert("Item Added to Cart!");
    window.location.href= "/order";
});

module.exports = OrderButton;