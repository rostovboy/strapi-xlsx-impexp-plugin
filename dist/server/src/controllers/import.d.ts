import type { Core } from '@strapi/strapi';
declare const importController: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    importData(ctx: any): Promise<any>;
};
export default importController;
