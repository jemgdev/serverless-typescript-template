"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyParser = bodyParser;
exports.headerParser = headerParser;
function bodyParser(event) {
    return event.body ? JSON.parse(event.body) : {};
}
function headerParser(event) {
    return event.headers;
}
