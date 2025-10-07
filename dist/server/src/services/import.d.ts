import type { Core } from '@strapi/strapi';
import type { FileDataPath, ImportError, ImportResult } from '../types';
declare const importService: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    processImportFromPath(fileData: FileDataPath, contentTypeUid: string): Promise<ImportResult>;
    normalizePhone(phone: string): string;
    parseWorkbook(workbook: any, contentTypeUid: string): {
        headers: string[];
        data: {
            [key: string]: any;
        }[];
        errors: ImportError[];
    };
    syncData(parsedData: {
        headers: string[];
        data: {
            [key: string]: any;
        }[];
        errors: ImportError[];
    }, contentTypeUid: string): Promise<ImportResult>;
};
export default importService;
