/*global describe */
/*global it */
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../server");
chai.use(chaiHttp);

let category = "Pizzas";
let item = "Pepperoni";
let size = "12in";
let count = 2;

describe("Order", () => {
    // TODO: Add entire menu.
    it("it should add an item to the cart", async() => {
        let res = await chai.request(server)
            .post(`/order/${category}/${item}/${size}`);

        expect(res.status).to.equal(200);
        // TODO: more checks to determine if proper item.

    });

    it("it should increase the item's quantity", async() => {
        let res = await chai.request(server)
            .patch("/order/0")
            .send({
                count: count + 1
            });

        expect(res.status).to.equal(200);
        expect(res.body.item.count).to.be.above(count);
    });

    it("it should decrease the item's quantity", async() => {
        let res = await chai.request(server)
            .patch("/order/0")
            .send({
                count: count - 1
            });

        expect(res.status).to.equal(200);
        expect(res.body.item.count).to.be.below(count);
        expect(res.body.item.count).to.not.be.below(0);
    });

    it("it should remove the item by setting it's count to 0", async() => {
        let res = await chai.request(server)
            .patch("/order/0")
            .send({
                count: 0
            });

        expect(res.body.item).to.be.an("undefined");
    });

    it("it should remove the item from the cart", async() => {
        let res = await chai.request(server).delete("/order/0");

        expect(res.status).to.equal(200);
        //TODO: more checks to determine proper deletion.
    });

    it("it should return an empty cart", async() => {
        let res = await chai.request(server).post("/order");

        expect(res.body).to.be.a("array");
        expect(res.body).to.have.lengthOf("0");
    });
});

