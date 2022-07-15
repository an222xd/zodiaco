"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    database: {
        host: process.env.SERVER,
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD,
        port: 3306,
    }
};
