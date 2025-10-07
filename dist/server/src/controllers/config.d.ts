import type { Core } from '@strapi/strapi';
declare const configController: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    find(ctx: any): Promise<void>;
    create(ctx: any): Promise<void>;
};
export default configController;
