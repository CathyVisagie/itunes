import chai from "chai";
let expect = chai.expect;
import request from "request";

/* I was getting an error when I tried to run this test that said, "To load an ES module, set "type": "module" in the package.json or use the .mjs extension". 

I learned what to do to fix it here:
https://stackoverflow.com/questions/65097694/to-load-an-es-module-set-type-module-in-the-package-json-or-use-the-mjs-e */

describe("Status and content", function () {
  describe("itunes page", function () {
    it("status", function (done) {
      request("http://localhost:5000/", function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it("content", function (done) {
      request("http://localhost:5000/", function (error, response, body) {
        expect(body).to.equal(
          '"Welcome, traveler! Navigate to http://localhost:3000/getmedia to see the iTunes app website"'
        );
        done();
      });
    });
  });
});
