"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMessage = void 0;
var responseMessage = function (_a) {
    var statusCode = _a.statusCode, body = _a.body;
    return {
        statusCode: statusCode,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-Type': 'application/json'
        }
    };
};
exports.responseMessage = responseMessage;
