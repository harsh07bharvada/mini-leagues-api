"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointsTable = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const collections_constants_1 = __importDefault(require("../../constants/collections.constants"));
const generateIds_util_1 = require("../../utils/generateIds.util");
//POINTS TABLE SCHEMA FOR MONGOOSE
const PointsTableSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
    },
    gameweekID: {
        type: String,
        required: true,
    },
    leagueID: {
        type: String,
        required: true,
    },
    teamName: {
        type: String,
        required: true,
    },
    teamID: {
        type: String,
        required: true,
    },
    gamesPlayed: {
        type: Number,
        required: true,
    },
    wins: {
        type: Number,
        required: true,
    },
    draws: {
        type: Number,
        required: true,
    },
    losses: {
        type: Number,
        required: true,
    },
    bonus: {
        type: Number,
        required: true,
    },
    boardPoints: {
        type: Number,
        required: true,
    },
    totalOverallPoints: {
        type: Number,
        required: true,
    },
    chipsStatus: {
        type: Object,
        required: true,
    },
    cOn: {
        type: Date,
        required: true,
    },
    mOn: {
        type: Date,
        required: true,
    },
    dOn: {
        type: Date,
        default: null,
    },
});
// POINTS TABLE UNQIUE INDICES
PointsTableSchema.index({ email: 1 });
PointsTableSchema.index({ userID: 1 });
PointsTableSchema.statics = {
    //CREATE POINTS TABLE STATIC FUNCTION
    createPointsTable: function (data) {
        data._id = (0, generateIds_util_1.generateId)(collections_constants_1.default.POINTS_TABLE);
        data.dOn = null;
        data.cOn = Date.now();
        data.mOn = Date.now();
        return this.create(data);
    },
    //GET POINTS TABLE STATIC FUNCTION
    getPointsTable: function (query, projections = {}) {
        return this.find(Object.assign(Object.assign({}, query), { dOn: null }), projections).lean();
    },
    //UPDATE ONE POINTS TABLE STATIC FUNCTION
    updatePointsTable: function (query, updateData) {
        return this.findOneAndUpdate(Object.assign(Object.assign({}, query), { dOn: null }), { $set: Object.assign(Object.assign({}, updateData), { mOn: new Date() }) }, { returnDocument: 'after' });
    },
    //DELETE ONE POINTS TABLE STATIC FUNCTION
    deletePointsTable: function (query) {
        return this.findOneAndUpdate(query, { $set: { dOn: new Date() } }, { returnDocument: 'after' });
    },
};
// POINTS TABLE MODEL INSTANCE
exports.PointsTable = mongoose_1.default.model(collections_constants_1.default.POINTS_TABLE, PointsTableSchema);
//# sourceMappingURL=pointsTable.schema.js.map