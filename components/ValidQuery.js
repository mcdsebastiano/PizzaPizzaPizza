/*global Menu*/
function isValidQuery(query) {
    
    console.log(query);
    
    if (typeof query === "undefined") {
        return false;
    }

    const category = Menu[query.category];
    if (typeof category === "undefined") {
        return false;
    }

    const item = query.item;
    if (typeof category[item] === "undefined") {
        return false;
    }

    const size = query.size;
    if (typeof category[item].Price[size] === "undefined") {
        return false;
    }

    return true;
}

module.exports = isValidQuery;
