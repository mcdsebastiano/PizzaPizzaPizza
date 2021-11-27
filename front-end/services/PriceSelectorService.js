const PriceSelector = require("./price-selector");
const OrderButton = require("./OrderButtonService");

PriceSelector.onClick(res => {
    if (res.size !== 0 && res.target.nodeName === "SPAN") {
        document.getElementsByClassName("active")[0].classList.toggle("active");
        res.target.classList.toggle("active");
    }

    document.getElementById("price").textContent = res.price.toFixed(2);
    OrderButton.buttons[0].setAttribute("data-category", res.category);
    OrderButton.buttons[0].setAttribute("data-item", res.item);
    OrderButton.buttons[0].setAttribute("data-size", res.size);
});
