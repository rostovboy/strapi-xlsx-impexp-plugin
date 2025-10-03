import type { Core } from '@strapi/strapi';
import ExcelJS from 'exceljs';

const exportService = ({ strapi }: { strapi: Core.Strapi }) => ({
  async exportData({ collection, filters, search }: {
    collection: string;
    filters?: Record<string, unknown>;
    search?: string;
  }): Promise<Buffer> {

    try {
      const query: any = {
        filters: filters || {},
      };

      if (search) {
        query._q = search;
      }

      const data = await strapi.entityService.findMany(`api::${collection}.${collection}` as any, query);

      // Creation of xlsx
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Export');

      // Dynamic titles
      if (data.length > 0) {
        const headers = Object.keys(data[0]);
        sheet.addRow(headers);

        data.forEach(item => {
          const row = headers.map(header => item[header]);
          sheet.addRow(row);
        });
      } else {
        sheet.addRow(['No data found']);
      }

      const uint8Array = await workbook.xlsx.writeBuffer();

      // Encode to Buffer
      const buffer = Buffer.from(uint8Array);

      if (buffer && buffer.length > 0) {
        strapi.log.info(`[exportService] File exported to buffer successfully, size: ${buffer.length} bytes`);
      } else {
        throw new Error('Generated buffer is empty');
      }

      console.log('buffer type:', typeof buffer);
      console.log('buffer constructor:', buffer.constructor.name);
      console.log('buffer length:', buffer.length);

      return buffer;

    } catch (error) {
      strapi.log.error('[exportService] Error:', error);
      throw new Error(`Export failed: ${error.message}`);
    }
  }
});

export default exportService;
