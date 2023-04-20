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
exports.Fixture = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const collections_constants_1 = __importDefault(require("../../constants/collections.constants"));
const generateIds_util_1 = require("../../utils/generateIds.util");
//FIXTURE SCHEMA FOR MONGOOSE
const FixtureSchema = new mongoose_1.Schema({
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
    homeTeamID: {
        type: String,
        required: true,
    },
    awayTeamID: {
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
// FIXTURE UNQIUE INDICES
FixtureSchema.index({ fixtureID: 1 });
FixtureSchema.statics = {
    //CREATE FIXTURE STATIC FUNCTION
    createFixture: function (data) {
        data._id = (0, generateIds_util_1.generateId)(collections_constants_1.default.FIXTURE);
        data.fixtureID = data._id;
        data.dOn = null;
        data.cOn = Date.now();
        data.mOn = Date.now();
        return this.create(data);
    },
    //GET ONE FIXTURE STATIC FUNCTION
    getFixture: function (query, projections = {}) {
        return this.findOne(Object.assign(Object.assign({}, query), { dOn: null }), projections).lean();
    },
    //UPDATE ONE FIXTURE STATIC FUNCTION
    updateFixture: function (query, updateData) {
        return this.findOneAndUpdate(Object.assign(Object.assign({}, query), { dOn: null }), { $set: Object.assign(Object.assign({}, updateData), { mOn: new Date() }) }, { returnDocument: 'after' });
    },
    //DELETE ONE FIXTURE STATIC FUNCTION
    deleteFixture: function (query) {
        return this.findOneAndUpdate(query, { $set: { dOn: new Date() } }, { returnDocument: 'after' });
    },
};
// FIXTURE MODEL INSTANCE
exports.Fixture = mongoose_1.default.model(collections_constants_1.default.FIXTURE, FixtureSchema);
//# sourceMappingURL=fixture.schema.js.map