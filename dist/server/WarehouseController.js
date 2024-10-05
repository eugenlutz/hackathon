"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveIdAuto = exports.moveId = exports.createId = void 0;
const createId = (req, res) => {
    console.log('createId called with ' + req);
    res.send('createId received');
};
exports.createId = createId;
const moveId = (req, res) => {
    console.log('moveId called with ' + req.params['id']);
    res.status(200).json({ id: req.params['id'], bin: "12" });
};
exports.moveId = moveId;
const moveIdAuto = (req, res) => {
    console.log('moveIdAuto called with ' + req.params['id'] + 'and' + req.params['bin']);
    res.status(200).json({ id: req.params['id'], bin: "12" });
};
exports.moveIdAuto = moveIdAuto;
