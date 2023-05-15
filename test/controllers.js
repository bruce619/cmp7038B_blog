const chai = require("chai");
const chatHttp = require('chai-http');
const server = require('../app').server
// assertion style "should", "expect" "assert"
const expect = chai.expect;
chai.should();
chai.use(chatHttp)


describe('Controller Tests', ()=>{

    /**
     * Test the GET routes
     */
    describe("GET /login", ()=>{

        it("should pass if response status is 200 and login page renders", (done)=>{
            chai.request(server)
            .get("/login")
            .end((err, res)=>{
                if (err) return done(err);
                res.should.have.status(200)
                res.text.should.contain("Login")
            done();
            });
        });
    });

    describe("GET /invalid-route", ()=>{

        it("should fail  ", (done) => {
            chai.request(server)
            .get("/invalid-route")
            .end((err, res)=>{
                if (err) return done(err);
                res.should.have.status(404)
                res.text.should.contain("Cannot GET /invalid-route")
            done();
            });
        });
    });

})