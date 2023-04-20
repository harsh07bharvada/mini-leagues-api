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
exports.FixtureEvent = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const collections_constants_1 = __importDefault(require("../../constants/collections.constants"));
const generateIds_util_1 = require("../../utils/generateIds.util");
//FIXTURE EVENT SCHEMA FOR MONGOOSE
const FixtureEventSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
    },
    leagueID: {
        type: String,
        required: true,
    },
    fixtureID: {
        type: String,
        required: true,
    },
    gameweekID: {
        type: String,
        required: false,
    },
    teamID: {
        type: String,
        required: true,
    },
    teamCaptainID: {
        type: String,
        required: true,
    },
    userPoints: {
        type: Array,
        required: true,
    },
    teamPoints: {
        type: Number,
        required: true,
    },
    boardPoints: {
        type: Number,
        required: true,
    },
    chipUsed: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
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
// FIXTURE EVENT UNQIUE INDICES
FixtureEventSchema.index({ fixtureID: 1, leagueID: 1, gameweekID: 1, teamID: 1 });
FixtureEventSchema.statics = {
    //CREATE FIXTURE EVENT STATIC FUNCTION
    createFixtureEvent: function (data) {
        data._id = (0, generateIds_util_1.generateId)(collections_constants_1.default.FIXTURE_EVENT);
        data.dOn = null;
        data.cOn = Date.now();
        data.mOn = Date.now();
        return this.create(data);
    },
    //GET ONE FIXTURE EVENT STATIC FUNCTION
    getFixtureEvent: function (query, projections = {}) {
        return this.findOne(Object.assign(Object.assign({}, query), { dOn: null }), projections).lean();
    },
    //UPDATE ONE FIXTURE EVENT STATIC FUNCTION
    updateFixtureEvent: function (query, updateData) {
        return this.findOneAndUpdate(Object.assign(Object.assign({}, query), { dOn: null }), { $set: Object.assign(Object.assign({}, updateData), { mOn: new Date() }) }, { returnDocument: 'after' });
    },
    //DELETE ONE FIXTURE EVENT STATIC FUNCTION
    deleteFixtureEvent: function (query) {
        return this.findOneAndUpdate(query, { $set: { dOn: new Date() } }, { returnDocument: 'after' });
    },
};
// FIXTURE EVENT MODEL INSTANCE
exports.FixtureEvent = mongoose_1.default.model(collections_constants_1.default.FIXTURE_EVENT, FixtureEventSchema);
//# sourceMappingURL=fixtureEvent.schema.js.map