class PriceSelector {
    static wrapper = document.getElementById("price-selector");

    static onClick(cb) {
        this.wrapper.addEventListener("click", event => {

            let size = event.target.textContent;
            if (event.target.nodeName !== "SPAN") {
                if (event.target.nodeName === "INPUT") {
                    size = document.getElementsByClassName("active")[0].textContent;
                } else {
                    return;
                }
            }

            fetch(window.location, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    size
                })
            }).then(response => {
                if (response.ok) {
                    return response.json();
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

module.exports = PriceSelector;