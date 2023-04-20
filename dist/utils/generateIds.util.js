"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
const uuid_1 = require("uuid");
const prefixMap = {
    "userDetail": "u",
    "league": "l",
    "gameweek": "g",
    "table": "t",
    "chip": "c",
    "chipEvent": "ce",
    "pointsTable": "pt",
    "teamDetail": "t",
    "fixture": "f",
    "fixtureEvent": "fe",
};
const generateId = (schemaName) => {
    return `${prefixMap[schemaName]}-${(0, uuid_1.v4)()}`;
};
exports.generateId = generateId;
//# sourceMappingURL=generateIds.util.js.map