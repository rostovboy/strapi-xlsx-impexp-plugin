declare const _default: ({
    method: string;
    path: string;
    handler: string;
    config: {
        policies: any[];
        middlewares: any[];
        auth?: undefined;
    };
} | {
    method: string;
    path: string;
    handler: string;
    config: {
        auth: boolean;
        policies: any[];
        middlewares?: undefined;
    };
})[];
export default _default;
