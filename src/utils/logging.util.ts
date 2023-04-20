export const genFuncLogEntry = (module: string, functionName: string): string => {
    return `${module}   >>>>>>   @${functionName}`;
};


export const genFuncLogExit = (module: string, functionName: string): string => {
    return `${module}   <<<<<<  @${functionName}`;
};

export const genFuncLog = (module: string, functionName: string, ...messages: any): string => {
    return `${module} - @${functionName} - ${messages.map((m: any) => {
        if (m instanceof Object) return JSON.stringify(m);
        return m;
    }).join(',')}`;
};


