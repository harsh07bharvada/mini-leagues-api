export const removeKeysFromObject = (obj: Object, ...keysToRemove: Array<String>): Object => {

    let sanitizedObj: any = {}, keysRemovalSet = new Set(keysToRemove);
    for (let [key, value] of Object.entries(obj)) {
        if (!keysRemovalSet.has(key)) {
            sanitizedObj[key] = value
        }
    }
    return sanitizedObj;
}