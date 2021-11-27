class ItemRemover {
    static buttons = document.getElementsByClassName("item-remover");

    static onClick(cb) {
        for (const button of this.buttons) {
            button.addEventListener("click", function (event) {
                const index = event.target.dataset.id;
                fetch(`/order/${index}`, {
                    method: "DELETE"
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
}

module.exports = ItemRemover;
