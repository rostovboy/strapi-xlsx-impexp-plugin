import type { Core } from '@strapi/strapi';
declare const exportController: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    exportData(ctx: any): Promise<void>;
};
export default exportController;
