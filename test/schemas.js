const chai = require("chai");
const { loginSchema, searchSchema, uuidSchema, otpSchema, registrationSchema } = require("../utility/validations");
// assertion style "should", "expect" "assert"
const expect = chai.expect;


describe("Testing Schemas", () =>{

    it("Test should pass if a valid user registration object is provided", ()=>{
        // input object
        const body = {
            first_name: "Terry",
            last_name: "John",
            email: "tipstar3@gmail.com",
            username: "Terry04",
            password: "Ronan034@",
            confirm_password: "Ronan034@",
        };

        const {error, value} = registrationSchema.validate(body);
        expect(error).to.be.undefined;
        expect(value).to.deep.equal(body)
    })


    it("Test should pass if a valid login object is provided", ()=>{
        // input object
        const body = {
            email: "chris.rock@example.com",
            password: "Rocky20@23"
        };

        const {error, value} = loginSchema.validate(body);
        expect(error).to.be.undefined;
        expect(value).to.deep.equal(body)
    })


    it("Test should fail if a malicious XSS Script or invalid search input is provided", ()=>{
        // search only accepts alphanumeric strings
        const search_obj = {
            search: `<script>alert('Attack!')</script>`
        }
        const {error} = searchSchema.validate(search_obj);
        expect(error).to.not.be.undefined;
    })

    it("Test should fail if malicious SQL Injection or invalid search input is provided", ()=>{
        // search only accepts alphanumeric strings
        const search_obj = {
            search: `' or 1=1--`
        }
        const {error} = searchSchema.validate(search_obj);
        expect(error).to.not.be.undefined;
    })

    it("Test should fail if invalid uuid string is provided", ()=>{
        // uuid are usually alphanumeric strings with - in between some characters
        const uuid_ = {
            id: "12dbdwjh2bdds@#"
        }
        const {error} = uuidSchema.validate(uuid_)
        expect(error).to.not.be.undefined
    })
    

    it("Test should fail if an invalid OTP value of wrong length is provided", ()=>{
        // uuid are usually alphanumeric strings with - in between some characters
        const uuid_ = {
            otp: "123",
            id: "8300g21c-d571-4654-9ef3-3776d9802953"
        }
        const {error} = otpSchema.validate(uuid_)
        expect(error).to.not.be.undefined
    })
    

})