declare const routes: {
    'content-api': {
        type: string;
        routes: {
            method: string;
            path: string;
            handler: string;
            config: {
                policies: any[];
            };
        }[];
    };
    admin: {
        type: string;
        routes: ({
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
    };
};
export default routes;
