import type {Core} from '@strapi/strapi';
import XLSX from 'xlsx';
import fs from 'fs';
import type { FileDataPath, ImportError, ImportResult } from '../types';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const importService = ({ strapi }: { strapi: Core.Strapi }) => ({

  async processImportFromPath(fileData: FileDataPath, contentTypeUid: string): Promise<ImportResult> {
    try {
      if (!fs.existsSync(fileData.path)) {
        throw new Error('File not found at path: ' + fileData.path);
      }

      const workbook = XLSX.readFile(fileData.path);
      const parsedData = this.parseWorkbook(workbook, contentTypeUid);
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

  normalizePhone(phone: string): string {
    if (!phone) return '';

    // Удаляем все лишние символы (скобки, пробелы, дефисы и т.д.)
    const cleaned = phone.replace(/[^\d+]/g, '');

    // Если начинается с 8 и это российский номер — заменяем на +7
    const normalized = cleaned.replace(/^8(\d{10})$/, '+7$1');

    try {
      const parsed = parsePhoneNumberFromString(normalized, 'RU');
      return parsed && parsed.isValid() ? parsed.format('E.164') : cleaned;
    } catch {
      return cleaned;
    }
  },

  parseWorkbook(workbook: any, contentTypeUid: string): {
    headers: string[],
    data: { [key: string]: any }[],
    errors: ImportError[]
  } {
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const rawData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const errors: ImportError[] = [];

    if (rawData.length === 0) {
      throw new Error('The file is empty');
    }

    const headers: string[] = rawData[0].map((header: any, index: number) =>
      header ? String(header).trim() : `Column_${index + 1}`
    );

    const rows: any[][] = rawData.slice(1);

    const keyValueData = rows
      .filter((row, rowIndex) => {
        // Сохраняем строку если есть хотя бы одна заполненная ячейка
        return row.some(cell => cell !== null && cell !== undefined && cell !== '');
      })
      .map((row, rowIndex) => {
        const obj: Record<string, any> = {};
        const actualRowNumber = rowIndex + 2; // +2 потому что header + 1-based индекс

        headers.forEach((header, i) => {
          obj[header] = row[i] ?? '';
        });

        // Приводим телефоны к E.164 и валидируем, если это контент shop
        if (contentTypeUid === 'api::shop.shop') {
          ['phone1', 'phone2', 'phone3'].forEach((field) => {
            if (obj[field]) {
              const originalValue = String(obj[field]);
              const normalizedPhone = this.normalizePhone(originalValue);
              obj[field] = normalizedPhone;
              // Валидация длины номера (минимум 12 символов для E.164)
              if (normalizedPhone && normalizedPhone.length < 12) {
                errors.push({
                  row: actualRowNumber,
                  column: field,
                  value: normalizedPhone,
                  message: 'Некорректный номер'
                });
              }
            }
          });
        }

        return obj;
      });

    strapi.log.info(`Parsed Excel: ${headers.length} columns, ${keyValueData.length} rows`);
    if (errors.length > 0) {
      strapi.log.warn(`Found ${errors.length} validation errors during parsing`);
    }

    return {
      headers,
      data: keyValueData,
      errors
    };
  },

  async syncData(
    parsedData: {
      headers: string[],
      data: { [key: string]: any }[],
      errors: ImportError[]
    },
    contentTypeUid: string
  ): Promise<ImportResult> {
    const totalProcessed = parsedData.data.length;
    let created = 0;
    let updated = 0;
    const errors: ImportError[] = [...parsedData.errors]; // Начинаем с ошибок валидации из парсинга

    strapi.log.info(`Syncing ${totalProcessed} records for ${contentTypeUid}`);

    for (let i = 0; i < parsedData.data.length; i++) {
      const row = parsedData.data[i];
      const rowNumber = i + 2;

      try {
        // Clear
        const cleanedData: Record<string, any> = {};
        const now = new Date().toISOString();

        for (const [key, value] of Object.entries(row)) {
          if ((key === "id" || key === "documentId") && (value === null || value === undefined || value === "")) {
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

    const success = errors.length === 0;

    if (!success) {
      strapi.log.warn(`Import completed with ${errors.length} errors`);
    } else {
      strapi.log.info('Import completed successfully');
    }

    return {
      success,
      totalProcessed,
      created,
      updated,
      deleted: 0,
      errors,
    };
  }

});

export default importService;
