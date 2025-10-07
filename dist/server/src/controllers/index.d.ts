declare const _default: {
    controller: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        index(ctx: any): void;
    };
    configController: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        find(ctx: any): Promise<void>;
        create(ctx: any): Promise<void>;
    };
    exportController: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        exportData(ctx: any): Promise<void>;
    };
    importController: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        importData(ctx: any): Promise<any>;
    };
};
export default _default;
