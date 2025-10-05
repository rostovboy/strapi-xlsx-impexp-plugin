import type { Core } from '@strapi/strapi';

const importService = ({ strapi }: { strapi: Core.Strapi }) => ({
  async processImport(data: any) {
    try {
      if (data.test === 'test') {
        console.log('Service OK')
        return { test: 'ok' };
      }
      throw new Error('Invalid data received');
    } catch (error) {
      strapi.log.error('Import service error:', error);
      throw error;
    }
  },
});

export default importService;
