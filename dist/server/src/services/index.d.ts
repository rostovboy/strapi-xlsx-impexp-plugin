/// <reference types="node" />
/// <reference types="node" />
declare const _default: {
    service: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        getWelcomeMessage(): string;
    };
    configService: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        getConfig(): Promise<import("../types").ConfigData>;
        saveConfig(data: import("../types").ConfigData): Promise<{
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
        processImportFromPath(fileData: import("../types").FileDataPath, contentTypeUid: string): Promise<import("../types").ImportResult>;
        normalizePhone(phone: string): string;
        parseWorkbook(workbook: any, contentTypeUid: string): {
            headers: string[];
            data: {
                [key: string]: any;
            }[];
            errors: import("../types").ImportError[];
        };
        syncData(parsedData: {
            headers: string[];
            data: {
                [key: string]: any;
            }[];
            errors: import("../types").ImportError[];
        }, contentTypeUid: string): Promise<import("../types").ImportResult>;
    };
};
export default _default;
