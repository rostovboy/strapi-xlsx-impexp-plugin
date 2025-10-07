import type {Core} from '@strapi/strapi';
import XLSX from 'xlsx';
import fs from 'fs';
import type { FileDataPath, ImportError, ImportResult } from '../types';


const importService = ({ strapi }: { strapi: Core.Strapi }) => ({

  async processImportFromPath(fileData: FileDataPath, contentTypeUid: string): Promise<ImportResult> {
    try {
      if (!fs.existsSync(fileData.path)) {
        throw new Error('File not found at path: ' + fileData.path);
      }

      const workbook = XLSX.readFile(fileData.path);
      const parsedData = this.parseWorkbook(workbook);
      const syncResult = await this.syncData(parsedData, contentTypeUid);

      return syncResult;

    } catch (error: any) {
      strapi.log.error('Import service error (path):', error);
      return {
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
      };
    }
  },

  parseWorkbook(workbook: any): { headers: string[], data: { [key: string]: any }[] } {
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const rawData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    if (rawData.length === 0) {
      throw new Error('The file is empty');
    }

    const headers: string[] = rawData[0].map((header: any, index: number) =>
      header ? String(header).trim() : `Column_${index + 1}`
    );

    const rows: any[][] = rawData.slice(1);

    const keyValueData = rows
      .filter(row => row.some(cell => cell !== null && cell !== undefined && cell !== ''))
      .map((row) => {
        const obj: Record<string, any> = {};
        headers.forEach((header, i) => {
          obj[header] = row[i] ?? '';
        });
        return obj;
      });

    strapi.log.info(`Parsed Excel: ${headers.length} columns, ${keyValueData.length} rows`);
    return { headers, data: keyValueData };
  },

  async syncData(
    parsedData: { headers: string[], data: { [key: string]: any }[] },
    contentTypeUid: string
  ): Promise<ImportResult> {
    const totalProcessed = parsedData.data.length;
    let created = 0;
    let updated = 0;
    const errors: ImportError[] = [];

    strapi.log.info(`Syncing ${totalProcessed} records for ${contentTypeUid}`);

    for (let i = 0; i < parsedData.data.length; i++) {
      const row = parsedData.data[i];
      const rowNumber = i + 2;

      try {
        // Clear
        const cleanedData: Record<string, any> = {};
        const now = new Date().toISOString();
        for (const [key, value] of Object.entries(row)) {
          if (key === "id" && (value === null || value === undefined || value === "")) {
            continue;
          }
          if (key === "documentId" && (value === null || value === undefined || value === "")) {
            continue;
          }
          // Empty strings to null
          const val = value === "" ? null : value;
          // Dates
          if (key === "updatedAt") {
            cleanedData[key] = now;
            continue;
          }
          if (key === "createdAt") {
            cleanedData[key] = val ?? now;
            continue;
          }
          if (key === "publishedAt") {
            cleanedData[key] = val ?? now;
            continue;
          }
          cleanedData[key] = val;
        }

        const transformedData = { ...cleanedData };
        const documentId = transformedData.documentId;

        if (documentId) {
          const existing = await strapi.documents(contentTypeUid as any).findOne({
            documentId: String(documentId),
          });

          if (existing) {
            await strapi.documents(contentTypeUid as any).update({
              documentId: String(documentId),
              data: transformedData,
            });

            updated++;
            continue;
          }
        }

        // Create
        await strapi.documents(contentTypeUid as any).create({
          data: transformedData,
        });

        created++;

      } catch (error: any) {
        errors.push({
          row: rowNumber,
          column: 'Multiple',
          value: JSON.stringify(row),
          message: error.message,
        });
        strapi.log.error(`Error processing row ${rowNumber}:`, error);
      }
    }

    return {
      success: errors.length === 0,
      totalProcessed,
      created,
      updated,
      deleted: 0,
      errors,
    };
  }


});

export default importService;
