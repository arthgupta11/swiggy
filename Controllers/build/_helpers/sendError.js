"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendClientError = exports.sendServerError = void 0;
const sendServerError = (error) => {
    console.log('sendServerError ->', error);
    return {
        status: 500,
        error,
        message: 'Server side error',
    };
};
exports.sendServerError = sendServerError;
const sendClientError = (error) => {
    return {
        status: 400,
        error,
        message: 'Client side error ',
    };
};
exports.sendClientError = sendClientError;
