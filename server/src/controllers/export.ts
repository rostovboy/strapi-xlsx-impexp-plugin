import type { Core } from '@strapi/strapi';

const exportController = ({ strapi }: { strapi: Core.Strapi }) => ({
  async exportData(ctx) {
    try {
      const { collection, filters, _q } = ctx.query;

      const data = await strapi
        .plugin('strapi-xlsx-impexp-plugin')
        .service('exportService')
        .exportData({
          collection: collection as string,
          filters: filters as Record<string, unknown> | undefined,
          search: _q as string | undefined,
        });

      if (!(data instanceof Buffer)) {
        throw new Error('Expected Buffer data from export service');
      }

      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `export-${collection}-${timestamp}.xlsx`;

      ctx.body = {
        success: true,
        filename,
        mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        base64: data.toString('base64'),
      };

      strapi.log.info(`[exportController] File exported successfully: ${filename}`);
    } catch (err) {
      strapi.log.error('[exportController] Export failed:', err);
      ctx.throw(500, (err as Error).message);
    }
  },
});

export default exportController;
