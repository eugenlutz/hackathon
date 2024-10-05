"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBins = exports.moveIdAuto = exports.moveId = exports.createId = void 0;
const typeorm_1 = require("typeorm");
const Bin_1 = require("./entities/Bin");
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
const getBins = async (req, res) => {
    console.log('getBins called.');
    const bins = await (0, typeorm_1.getRepository)(Bin_1.Bin).find();
    console.log('Bins loaded: ' + bins.length);
    res.status(200).json({ bins });
};
exports.getBins = getBins;
