const chai = require("chai");
const { getRandomAlphanumericString, hashPassword, comparePasswords, generateOTP } = require("../utility/utils");
// assertion style "should", "expect" "assert"
const expect = chai.expect;
chai.should();


describe("Testing Helper Functions", ()=>{

    it("Test should pass if an aplphanumeric string of length 30 is generated", ()=>{
        const get_string = getRandomAlphanumericString(30);

        get_string.should.have.lengthOf(30);
    });

    it("Test should pass if password if hash password is compared successfully with initial password string", ()=>{

        const password_ = "Regex1234#@"

        const hashedPassword = hashPassword(password_)

        comparePasswords(password_, hashedPassword)
        .then((isValid)=>{
            expect(isValid).to.be.true
        })

    })

    it("Test should pass is a valid random OTP of length 6 is generated", ()=>{
        const otp_ = generateOTP()

        otp_.should.have.lengthOf(6)
    })


})