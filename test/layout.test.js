/*global describe */
/*global it */
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../server");
chai.use(chaiHttp);

describe("Layout", () => {
    it("the page shouldn't have the livereload script", async() => {
        let res = await chai.request(server)
            .get("/");

        expect(res.text).to.not.contain("livereload");

    });

  
});
