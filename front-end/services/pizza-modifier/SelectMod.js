exports.selectMod = (selectors) => {
    fetch("edit", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            selectors,
            index:  <%- Item.index %>
        })
    }).then(response => {
        if (response.ok) {
            return response;
        }
        throw new Error("Request failed.");
    }).then(response => {
        window.location.reload();
    }).catch(error => {
        console.log(error);
    });
};
