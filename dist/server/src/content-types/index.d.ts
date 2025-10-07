declare const _default: {
    'xlsx-impexp-plugin-config': {
        schema: {
            kind: string;
            collectionName: string;
            info: {
                singularName: string;
                pluralName: string;
                displayName: string;
            };
            options: {
                draftAndPublish: boolean;
            };
            pluginOptions: {
                "content-manager": {
                    visible: boolean;
                };
                "content-type-builder": {
                    visible: boolean;
                };
            };
            attributes: {
                selectedExportCollections: {
                    type: string;
                };
                selectedImportCollections: {
                    type: string;
                };
            };
        };
    };
};
export default _default;
