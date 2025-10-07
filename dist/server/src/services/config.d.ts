import type { Core } from '@strapi/strapi';
import type { ConfigData } from '../types';
declare const configService: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    getConfig(): Promise<ConfigData>;
    saveConfig(data: ConfigData): Promise<{
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    }>;
};
export default configService;
