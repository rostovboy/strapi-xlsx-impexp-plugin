export interface ConfigData {
  selectedExportCollections: string[];
  selectedImportCollections: string[];
}

export interface ImportResult {
  fileName: string;
  headers: string[];
  rowCount: number;
  data: any[][];
  totalRows: number;
}

export interface FileDataPath {
  path: string;
  originalname: string;
  size: number;
}
