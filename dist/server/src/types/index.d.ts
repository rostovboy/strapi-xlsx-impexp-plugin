export interface ConfigData {
    selectedExportCollections: string[];
    selectedImportCollections: string[];
}
export interface FileDataPath {
    path: string;
    originalname: string;
    size: number;
}
export interface ImportError {
    row: number;
    column: string;
    value: any;
    message: string;
}
export interface ImportResult {
    success: boolean;
    totalProcessed: number;
    created: number;
    updated: number;
    deleted: number;
    errors: ImportError[];
}
