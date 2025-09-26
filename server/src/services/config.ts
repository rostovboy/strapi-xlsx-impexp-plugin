import type { Core } from '@strapi/strapi';

const configService = ({ strapi }: { strapi: Core.Strapi }) => ({
  getConfig() {
    return 'Config is here';
  },
  saveConfig() {
    return 'Config Saved';
  }
});

export default configService;
