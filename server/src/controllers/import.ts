import type { Core } from '@strapi/strapi';

const importController = ({ strapi }: { strapi: Core.Strapi }) => ({
  async importData(ctx) {
    try {
      const { body } = ctx.request;

      const result = await strapi
        .plugin('strapi-xlsx-impexp-plugin')
        .service('importService')
        .processImport(body);

      console.log('Controller OK', result);

      ctx.send({
        success: true,
        data: result,
        message: 'Import completed successfully'
      });
    } catch (error) {
      ctx.send({
        success: false,
        error: error.message,
        message: 'Import failed'
      }, 500);
    }
  },
});

export default importController;
