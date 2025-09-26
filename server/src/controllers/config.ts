import type { Core } from '@strapi/strapi';

const configController = ({ strapi }: { strapi: Core.Strapi }) => ({
  async find(ctx) {
    try {
      const config = await strapi
        .plugin('strapi-xlsx-impexp-plugin')
        .service('configService')
        .getConfig();

      ctx.body = config;
    } catch (err) {
      console.log(err);
      ctx.throw(500, err as any);
    }
  },

  async create(ctx) {
    try {
      const { data } = ctx.request.body;

      const config = await strapi
        .plugin('strapi-xlsx-impexp-plugin')
        .service('configService')
        .saveConfig(data);

      ctx.body = config;
    } catch (err) {
      ctx.throw(400, err as any);
    }
  },
});

export default configController;
