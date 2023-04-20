"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genFuncLog = exports.genFuncLogExit = exports.genFuncLogEntry = void 0;
const genFuncLogEntry = (module, functionName) => {
    return `${module}   >>>>>>   @${functionName}`;
};
exports.genFuncLogEntry = genFuncLogEntry;
const genFuncLogExit = (module, functionName) => {
    return `${module}   <<<<<<  @${functionName}`;
};
exports.genFuncLogExit = genFuncLogExit;
const genFuncLog = (module, functionName, ...messages) => {
    return `${module} - @${functionName} - ${messages.map((m) => {
        if (m instanceof Object)
            return JSON.stringify(m);
        return m;
    }).join(',')}`;
};
exports.genFuncLog = genFuncLog;
//# sourceMappingURL=logging.util.js.map