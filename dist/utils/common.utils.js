"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeKeysFromObject = void 0;
const removeKeysFromObject = (obj, ...keysToRemove) => {
    let sanitizedObj = {}, keysRemovalSet = new Set(keysToRemove);
    for (let [key, value] of Object.entries(obj)) {
        if (!keysRemovalSet.has(key)) {
            sanitizedObj[key] = value;
        }
    }
    return sanitizedObj;
};
exports.removeKeysFromObject = removeKeysFromObject;
//# sourceMappingURL=common.utils.js.map