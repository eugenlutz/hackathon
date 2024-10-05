"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveId = exports.createId = void 0;
const createId = (req, res) => {
    console.log('createId called with ' + req);
    res.send('createId received');
};
exports.createId = createId;
const moveId = (req, res) => {
    console.log('moveId called with ' + req);
    res.send('moveId received');
};
exports.moveId = moveId;
