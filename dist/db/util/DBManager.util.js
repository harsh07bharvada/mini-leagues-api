"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../../logger/logger"));
class DBManager {
    constructor() {
        this.schemaDir = path_1.default.resolve(__dirname, "../schemas");
        this.dbURL = "";
        mongoose_1.default.set("debug", function (collectionName, methodName, query, doc) {
            const msgMapper = (m) => {
                return util_1.default
                    .inspect(m, false, 10, true)
                    .replace(/\n/g, "")
                    .replace(/\s{2,}/g, " ");
            };
            logger_1.default.info(`\x1B[0;36mMongoose:\x1B[0m:: ${collectionName}.${methodName}(${msgMapper(JSON.stringify(query))} , ${JSON.stringify(doc)})\n`);
        });
    }
    setDBURL() {
        logger_1.default.info(`DBManager >>>>> setDBURL `);
        this.dbURL = this.getConnString();
        logger_1.default.info(`DBManager <<<<< setDBURL `);
    }
    getConnString() {
        return "mongodb+srv://miniLeaguesAdmin:mini.leagues@cluster0.c1tux.mongodb.net/miniLeagues?retryWrites=true&w=majority";
    }
    loadSchemas() {
        try {
            logger_1.default.info(`DBManager >>>>> loadSchemas `);
            const files = fs_1.default.readdirSync(this.schemaDir);
            for (const file of files) {
                if (file.endsWith(".schema.ts") || file.endsWith(".schema.js")) {
                    logger_1.default.info(`@loadSchemas - Loading Schemas... - ${file}`);
                    require(`${this.schemaDir}/${file}`);
                }
            }
            logger_1.default.info(`DBManager <<<<< loadSchemas `);
        }
        catch (loadSchemasError) {
            logger_1.default.info(`@loadSchemasError - Load Schemas - ${loadSchemasError.message}`);
        }
    }
    init() {
        logger_1.default.info(`DBManager >>>>> init `);
        this.setDBURL();
        this.loadSchemas();
        mongoose_1.default.connect(this.dbURL);
        logger_1.default.info(`Database connection complete`);
        logger_1.default.info(`DBManager <<<<< init `);
    }
}
exports.default = DBManager;
//# sourceMappingURL=DBManager.util.js.map