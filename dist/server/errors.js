"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.BadRequestError = void 0;
class BadRequestError extends Error {
    constructor(...args) {
        super(...args);
    }
}
exports.BadRequestError = BadRequestError;
class InternalServerError extends Error {
    constructor(...args) {
        super(...args);
    }
}
exports.InternalServerError = InternalServerError;
