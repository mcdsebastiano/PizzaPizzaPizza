const QuantityModifier = require("./quantity-modifier");
const EmptyCartButton = require("./empty-cart-button");
const ItemRemover = require("./item-remover");

ItemRemover.onClick(() => {
    window.location.reload();
});

EmptyCartButton.onClick(() => {
    window.location.reload();
});

QuantityModifier.onChange(() => {
    window.location.reload();
});
