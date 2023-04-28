export default class UnAuthorizedException extends Error {
    constructor(message){
        super(message || "Unauthorized")

        this.status = 401;
    }
}