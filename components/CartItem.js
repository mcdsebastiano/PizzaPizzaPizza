class CartItem {
    constructor(item) {
        this.category = item.category;
        this.name = item.name;
        this.size = item.size;
        this.price = item.price;
        this.count = 1;
        this.index = 0;
    }

    getFixedPrice() {
        return this.price.toFixed(2);
    }
    
    getTotalPrice() {
        return this.price * this.count;
    }

    getTotalFixedPrice() {
        return (this.price * this.count).toFixed(2);
    }

}

module.exports = CartItem;
