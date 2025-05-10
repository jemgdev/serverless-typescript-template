"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environments = void 0;
var Environments = (function () {
    function Environments() {
    }
    Environments.STAGE = process.env.STAGE || '';
    Environments.REGION = process.env.REGION || '';
    return Environments;
}());
exports.Environments = Environments;
