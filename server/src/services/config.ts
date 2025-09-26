import type { Core } from '@strapi/strapi';

interface ConfigData {
  selectedExportCollections: string[];
  selectedImportCollections: string[];
}

const configService = ({ strapi }: { strapi: Core.Strapi }) => ({
  async getConfig(): Promise<ConfigData> {
    const configs = await strapi.entityService.findMany(
      'plugin::strapi-xlsx-impexp-plugin.xlsx-impexp-plugin-config',
      { filters: {} }
    );

    if (configs && configs.length > 0) {
      return configs[0] as ConfigData;
    }

    return {
      selectedExportCollections: [],
      selectedImportCollections: [],
    };
  },

  async saveConfig(data: ConfigData) {
    const { selectedExportCollections, selectedImportCollections } = data;

    if (!Array.isArray(selectedExportCollections) || !Array.isArray(selectedImportCollections)) {
      throw new Error('selectedExportCollections and selectedImportCollections must be arrays');
    }

    const existingConfigs = await strapi.entityService.findMany(
      'plugin::strapi-xlsx-impexp-plugin.xlsx-impexp-plugin-config',
      { filters: {} }
    );

    if (existingConfigs.length > 0) {
      return strapi.entityService.update(
        'plugin::strapi-xlsx-impexp-plugin.xlsx-impexp-plugin-config',
        existingConfigs[0].id,
        { data: { selectedExportCollections, selectedImportCollections } as any }
      );
    }

    return strapi.entityService.create(
      'plugin::strapi-xlsx-impexp-plugin.xlsx-impexp-plugin-config',
      { data: { selectedExportCollections, selectedImportCollections } as any }
    );
  }
});

export default configService;
