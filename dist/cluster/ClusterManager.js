"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClusterManager = void 0;
const cluster_1 = __importDefault(require("cluster"));
const AppManager_1 = require("../app/AppManager");
const logger_1 = __importDefault(require("../logger/logger"));
class ClusterManager {
    constructor() {
        this.appManager = new AppManager_1.AppManager();
        this.appManager.init();
    }
    startMaster() {
        const nworkers = require("os").cpus().length / 2;
        logger_1.default.info("Master cluster setting up " + nworkers + " workers...");
        for (var i = 0; i < nworkers; i++) {
            cluster_1.default.fork();
        }
        cluster_1.default.on("online", function (worker) {
            logger_1.default.info("Worker " + worker.process.pid + " is online");
        });
        cluster_1.default.on("exit", function (worker, code, signal) {
            logger_1.default.warn("Worker " +
                worker.process.pid +
                " died with code: " +
                code +
                ", and signal: " +
                signal);
            logger_1.default.warn("Starting a new worker");
            cluster_1.default.fork();
        });
    }
    startCluster() {
        if (cluster_1.default.isPrimary) {
            return this.startMaster();
        }
        this.startWorker();
    }
    startWorker() {
        this.appManager.listenApp();
    }
    start() {
        return this.startCluster();
    }
}
exports.ClusterManager = ClusterManager;
//# sourceMappingURL=ClusterManager.js.map