"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCodes = void 0;
var StatusCodes = (function () {
    function StatusCodes() {
    }
    StatusCodes.OPERATION_SUCCESSFUL = 200;
    StatusCodes.RESOURCE_CREATED = 201;
    StatusCodes.BAD_REQUEST = 400;
    StatusCodes.NOT_FOUND = 404;
    StatusCodes.UNCONTROLLER_ERROR = 500;
    StatusCodes.SERVICE_NOT_AVAILABLE = 503;
    return StatusCodes;
}());
exports.StatusCodes = StatusCodes;
