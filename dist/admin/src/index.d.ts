declare const _default: {
    register(app: any): void;
    registerTrads({ locales }: {
        locales: string[];
    }): Promise<{
        data: {
            [k: string]: unknown;
        };
        locale: string;
    }[]>;
};
export default _default;
