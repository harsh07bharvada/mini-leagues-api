"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     *
     * @param request
     * @param response
     * @returns
     */
    ok: function (request, response) {
        return response.status(200).send({
            uptime: process.uptime(),
            message: "OK",
            timestamp: Date.now(),
        });
    },
};
//# sourceMappingURL=healthCheck.controller.js.map