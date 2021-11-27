/*global describe */
/*global it */
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../server");
chai.use(chaiHttp);

describe("Layout", () => {
    // TODO: Add entire menu.
    it("the page shouldn't have the livereload script", async() => {
        let res = await chai.request(server)
            .get("/");

        expect(res.text).to.not.contain("livereload");
        // TODO: more checks to determine if proper item.

    });

  
});
