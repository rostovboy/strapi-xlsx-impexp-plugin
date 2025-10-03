import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import ExportButton from './components/ExportButton';

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: async () => {
        const { App } = await import('./pages/App');

        return App;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });

    app.getPlugin('content-manager').injectComponent('listView', 'actions', {
      name: 'exportButton',
      Component: ExportButton,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);
          const prefixedData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [`${PLUGIN_ID}.${key}`, value])
          );
          return {
            data: prefixedData,
            locale,
          };
        } catch {
          return {
            data: {},
            locale,
          };
        }
      })
    );
  }
};
