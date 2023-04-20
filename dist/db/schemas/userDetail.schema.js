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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetail = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const collections_constants_1 = __importDefault(require("../../constants/collections.constants"));
const generateIds_util_1 = require("../../utils/generateIds.util");
//USERDETAIL SCHEMA FOR MONGOOSE
const UserDetailSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    fplTeamName: {
        type: String,
        required: true,
    },
    teamName: {
        type: String,
        required: false,
    },
    emailID: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
    },
    leagues: {
        type: Array,
        required: true,
    },
    lastWatchedLeagueID: {
        type: String,
        required: true,
    },
    refreshToken: {
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
// USERDETAIL UNQIUE INDICES
UserDetailSchema.index({ email: 1 });
UserDetailSchema.index({ userID: 1 });
UserDetailSchema.statics = {
    //CREATE USER STATIC FUNCTION
    createUserDetail: function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            data._id = (0, generateIds_util_1.generateId)(collections_constants_1.default.USER_DETAIL);
            data.dOn = null;
            data.cOn = Date.now();
            data.mOn = Date.now();
            data.password = yield bcrypt_1.default.hash(data.password, 10);
            return this.create(data);
        });
    },
    //GET ONE USER DETAIL STATIC FUNCTION
    getUserDetail: function (query, projections = {}) {
        return this.findOne(Object.assign(Object.assign({}, query), { dOn: null }), projections).lean();
    },
    //UPDATE ONE USER DETAIL STATIC FUNCTION
    updateUserDetail: function (query, updateData) {
        return this.findOneAndUpdate(Object.assign(Object.assign({}, query), { dOn: null }), { $set: Object.assign(Object.assign({}, updateData), { mOn: new Date() }) }, { returnDocument: 'after' });
    },
    //DELETE ONE USER DETAIL STATIC FUNCTION
    deleteUserDetail: function (query) {
        return this.findOneAndUpdate(query, { $set: { dOn: new Date() } }, { returnDocument: 'after' });
    },
};
// USERDETAIL MODEL INSTANCE
exports.UserDetail = mongoose_1.default.model(collections_constants_1.default.USER_DETAIL, UserDetailSchema);
//# sourceMappingURL=userDetail.schema.js.map