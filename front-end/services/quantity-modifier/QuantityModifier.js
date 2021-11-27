class QuantityModifier {
    static cartItems = document.getElementsByClassName("input-count");

    static onChange(cb) {
        for(const item of this.cartItems) {
            item.onblur = function(event) {
                // if (event.target.nodeName !== "INPUT") {
                // return;
                // }
                const count = event.target.value;
                console.log(count);
                const index = event.target.dataset.id;

                fetch(`/order/${index}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "PATCH",
                    body: JSON.stringify({
                        count
                    })
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
            };
        }
    }
}

module.exports = QuantityModifier;
