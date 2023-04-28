export default class NotFoundException extends Error {
    constructor(message){
        super(message || "not found")

        this.status = 404;
    }
};