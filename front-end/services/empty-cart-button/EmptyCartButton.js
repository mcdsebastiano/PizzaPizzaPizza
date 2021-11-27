class EmptyCartButton {
    static button = document.getElementById("empty-cart-button");

    static onClick(cb) {
        this.button.addEventListener("click", function (event) {
            fetch("/order", {
                method: "POST"
            }).then(response => {
                if (response.ok) {
                    return response;
                }
                throw new Error("Request failed.");
            }).then(response => {
                response.target = event.target;
                cb(response);
            }).catch(error => {
                console.log(error);
            });
        });
    }
}
module.exports = EmptyCartButton;