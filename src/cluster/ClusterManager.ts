import cluster from "cluster";
import { AppManager } from "../app/AppManager";
import logger from "../logger/logger";

export class ClusterManager {
    appManager: AppManager = new AppManager();

    constructor() {
        this.appManager.init();
    }

    startMaster() {
        const nworkers = require("os").cpus().length / 2;

        logger.info("Master cluster setting up " + nworkers + " workers...");

        for (var i = 0; i < nworkers; i++) {
            cluster.fork();
        }

        cluster.on("online", function (worker) {
            logger.info("Worker " + worker.process.pid + " is online");
        });

        cluster.on("exit", function (worker, code, signal) {
            logger.warn(
                "Worker " +
                worker.process.pid +
                " died with code: " +
                code +
                ", and signal: " +
                signal
            );
            logger.warn("Starting a new worker");
            cluster.fork();
        });
    }

    startCluster() {
        if (cluster.isPrimary) {
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
