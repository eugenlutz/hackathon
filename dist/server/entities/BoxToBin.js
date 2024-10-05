"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxToBin = void 0;
const typeorm_1 = require("typeorm");
const box_1 = require("./box");
const Bin_1 = require("./Bin");
let BoxToBin = class BoxToBin {
};
exports.BoxToBin = BoxToBin;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: "int"
    })
], BoxToBin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => box_1.Box, (box) => box.id) // specify inverse side as a second parameter
], BoxToBin.prototype, "box_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Bin_1.Bin, (bin) => bin.id)
], BoxToBin.prototype, "bin_id", void 0);
exports.BoxToBin = BoxToBin = __decorate([
    (0, typeorm_1.Entity)()
], BoxToBin);
