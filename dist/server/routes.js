"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WarehouseController_1 = require("./WarehouseController");
const router = express_1.default.Router();
router.post('/move/:id', WarehouseController_1.moveId);
router.put('/create/:id/:bin', WarehouseController_1.createId);
exports.default = router;
