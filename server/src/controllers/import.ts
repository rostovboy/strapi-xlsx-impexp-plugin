import type { Core } from '@strapi/strapi';

const importController = ({ strapi }: { strapi: Core.Strapi }) => ({
  async importData(ctx: any) {
    try {
      if (!ctx.request.files) {
        return ctx.badRequest('No files uploaded');
      }

      let uploadedFile;
      const files = ctx.request.files;

      if (files.file) {
        uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;
      } else if (files.files) {
        uploadedFile = Array.isArray(files.files) ? files.files[0] : files.files;
      }

      if (!uploadedFile) {
        strapi.log.error('No file found in request.files');
        return ctx.badRequest('No file found in the request');
      }

      if (!uploadedFile.size || uploadedFile.size === 0) {
        strapi.log.error('File is empty or size is 0');
        return ctx.badRequest('The file is empty');
      }

      if (uploadedFile.filepath) {
        const fileData = {
          path: uploadedFile.filepath,
          originalname: uploadedFile.name || uploadedFile.originalname || `upload_${Date.now()}.xlsx`,
          size: uploadedFile.size
        };

        const result = await strapi
          .plugin('strapi-xlsx-impexp-plugin')
          .service('importService')
          .processImportFromPath(fileData);

        // Return the simplified result
        ctx.send(result);
        return;
      }

      strapi.log.error('No usable file data found in any format');
      return ctx.badRequest('Could not process the uploaded file - no buffer or path found');

    } catch (error: any) {
      strapi.log.error('Import controller error:', error);

      // Return error in the same format
      ctx.send({
        success: false,
        totalProcessed: 0,
        created: 0,
        updated: 0,
        deleted: 0,
        errors: [{
          row: 0,
          column: 'System',
          value: '',
          message: error.message
        }]
      });
    }
  },
});

export default importController;
