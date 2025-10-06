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
      // Parsing
      return this.processWorkbook(workbook, fileData.originalname);
    } catch (error: any) {
      strapi.log.error('Import service error (path):', error);
      throw new Error(`Failed to parse Excel file from path: ${error.message}`);
    }
  },

  processWorkbook(workbook: any, fileName: string): ImportResult {
    // Parse first sheet
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert to Json
    const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    if (data.length === 0) {
      throw new Error('The file is empty');
    }

    // First line - titles
    const headers: string[] = data[0].map((header: any, index: number) =>
      header ? String(header).trim() : `Column_${index + 1}`
    );

    // Other lines - data
    const rows: any[][] = data.slice(1);

    // Filter empty lines
    const nonEmptyRows = rows.filter(row =>
      row.some(cell => cell !== null && cell !== undefined && cell !== '')
    );

    strapi.log.info(`Parsed Excel file: ${headers.length} columns, ${nonEmptyRows.length} non-empty rows`);

    return {
      fileName: fileName,
      headers: headers,
      rowCount: nonEmptyRows.length,
      data: nonEmptyRows.slice(0, 5),
      totalRows: nonEmptyRows.length
    };
  }
});

export default importService;
