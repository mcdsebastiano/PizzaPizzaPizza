const srcData = require("./menu.json");

class Menu {
    constructor() {
        this.Menu = srcData;
    }
}

module.exports = new Menu();
