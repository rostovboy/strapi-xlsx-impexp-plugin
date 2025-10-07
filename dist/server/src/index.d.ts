/// <reference types="node" />
/// <reference types="node" />
declare const _default: {
    register: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    bootstrap: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    destroy: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    config: {
        default: {};
        validator(): void;
    };
    controllers: {
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
    routes: {
        'content-api': {
            type: string;
            routes: {
                method: string;
                path: string;
                handler: string;
                /**
                 * Plugin server methods
                 */
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
                /**
                 * Plugin server methods
                 */
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
    services: {
        service: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            getWelcomeMessage(): string;
        };
        configService: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            getConfig(): Promise<import("./types").ConfigData>;
            saveConfig(data: import("./types").ConfigData): Promise<{
                id: import("@strapi/types/dist/data").ID;
            } & {
                [key: string]: any;
            }>;
        };
        exportService: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            exportData({ collection, filters, search }: {
                collection: string;
                filters?: Record<string, unknown>;
                search?: string;
            }): Promise<Buffer>;
        };
        importService: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            processImportFromPath(fileData: import("./types").FileDataPath, contentTypeUid: string): Promise<import("./types").ImportResult>;
            normalizePhone(phone: string): string;
            parseWorkbook(workbook: any, contentTypeUid: string): {
                headers: string[];
                data: {
                    [key: string]: any;
                }[];
                errors: import("./types").ImportError[];
            };
            syncData(parsedData: {
                headers: string[];
                data: {
                    [key: string]: any;
                }[];
                errors: import("./types").ImportError[];
            }, contentTypeUid: string): Promise<import("./types").ImportResult>;
        };
    };
    contentTypes: {
        'xlsx-impexp-plugin-config': {
            schema: {
                kind: string;
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                };
                options: {
                    draftAndPublish: boolean;
                };
                pluginOptions: {
                    "content-manager": {
                        visible: boolean;
                    };
                    "content-type-builder": {
                        visible: boolean;
                    };
                };
                attributes: {
                    selectedExportCollections: {
                        type: string;
                    };
                    selectedImportCollections: {
                        type: string;
                    };
                };
            };
        };
    };
    policies: {};
    middlewares: {};
};
export default _default;
