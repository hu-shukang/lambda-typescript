"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageUtil = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["success"] = 200] = "success";
})(StatusCode || (StatusCode = {}));
class Result {
    statusCode;
    code;
    message;
    data;
    constructor(statusCode, code, message, data) {
        this.statusCode = statusCode;
        this.code = code;
        this.message = message;
        this.data = data;
    }
    /**
     * Serverless: According to the API Gateway specs, the body content must be stringified
     */
    bodyToString() {
        return {
            statusCode: this.statusCode,
            body: JSON.stringify({
                code: this.code,
                message: this.message,
                data: this.data,
            }),
        };
    }
}
class MessageUtil {
    static success(data) {
        const result = new Result(StatusCode.success, 0, 'success', data);
        return result.bodyToString();
    }
    static error(code = 1000, message) {
        const result = new Result(StatusCode.success, code, message);
        // console.log(result.bodyToString());
        return result.bodyToString();
    }
}
exports.MessageUtil = MessageUtil;
//# sourceMappingURL=message.js.map