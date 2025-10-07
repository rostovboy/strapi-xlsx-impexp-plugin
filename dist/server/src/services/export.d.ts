import type { Core } from '@strapi/strapi';
declare const exportService: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    exportData({ collection, filters, search }: {
        collection: string;
        filters?: Record<string, unknown>;
        search?: string;
    }): Promise<Buffer>;
};
export default exportService;
