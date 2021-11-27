class OrderButton {
    static buttons = document.getElementsByClassName("order-button");

    static onClick(cb) {
        for (const button of this.buttons) {
            button.addEventListener("click", function(event) {

                if (event.target.nodeName != "BUTTON") {
                    return;
                }

                const {
                    category,
                    item,
                    size
                } = event.target.dataset;

                fetch(`/order/${category}/${item}/${size}`, {
                    method: "POST"
                }).then(response => {
                    if (response.ok) {
                        return response;
                    }

                    throw new Error("REquest Failed");
                }).then(response => {
                    response.target = event.target;
                    cb(response);
                });
            });
        }
    }
}

module.exports = OrderButton;
