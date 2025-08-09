export default class HttpRespone extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
}
