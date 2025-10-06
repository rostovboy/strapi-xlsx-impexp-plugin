import type { Core } from '@strapi/strapi';
import XLSX from 'xlsx';
import fs from 'fs';
import type { ImportResult, FileDataPath } from '../types';

const importService = ({ strapi }: { strapi: Core.Strapi }) => ({
  async processImportFromPath(fileData: FileDataPath): Promise<ImportResult> {
    try {
      // Checking not empty file
      if (!fs.existsSync(fileData.path)) {
        throw new Error('File not found at path: ' + fileData.path);
      }

      // Reading file with xlsx
      const workbook = XLSX.readFile(fileData.path);

      // Parse data from Excel
      const parsedData = this.parseWorkbook(workbook);

      // Sync data with Strapi (empty function for now)
      const syncResult = await this.syncData(parsedData);

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
    // Parse first sheet
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert to Json
    const rawData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    if (rawData.length === 0) {
      throw new Error('The file is empty');
    }

    // First line - titles (headers)
    const headers: string[] = rawData[0].map((header: any, index: number) =>
      header ? String(header).trim() : `Column_${index + 1}`
    );

    // Other lines - data
    const rows: any[][] = rawData.slice(1);

    // Filter empty lines and transform to key-value objects
    const keyValueData = rows
      .filter(row => row.some(cell => cell !== null && cell !== undefined && cell !== ''))
      .map((row) => {
        const rowObject: { [key: string]: any } = {};

        // Create key-value pairs for each row
        headers.forEach((header, index) => {
          // Use empty string for missing values
          rowObject[header] = row[index] !== undefined ? row[index] : '';
        });

        return rowObject;
      });

    strapi.log.info(`Parsed Excel file: ${headers.length} columns, ${keyValueData.length} non-empty rows`);

    return {
      headers,
      data: keyValueData
    };
  },

  async syncData(parsedData: { headers: string[], data: { [key: string]: any }[] }): Promise<ImportResult> {
    // Empty function for now - just return success result
    const totalProcessed = parsedData.data.length;

    strapi.log.info(`Syncing data: ${totalProcessed} records to process`);

    // TODO: Add actual sync logic with Strapi here
    // For now, just return success with zeros

    return {
      success: true,
      totalProcessed: totalProcessed,
      created: 0,
      updated: 0,
      deleted: 0,
      errors: []
    };
  }
});

export default importService;
