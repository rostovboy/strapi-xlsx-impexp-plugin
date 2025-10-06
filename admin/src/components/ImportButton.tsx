import React, { useRef, ChangeEvent, useEffect, useState } from 'react';
import { Button, Flex } from '@strapi/design-system';
import { useFetchClient } from "@strapi/strapi/admin";
import { ConfigData } from "../../../server/src/types";

const ImportButton = () => {
  const { get } = useFetchClient();

  const [allowedImportCollections, setAllowedImportCollections] = useState<string[]>([]);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [isImporting, setIsImporting] = useState(false);

  // Fetch plugin configuration on component mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        // Request configuration from plugin API
        const response = await get('/strapi-xlsx-impexp-plugin/config');
        let config: ConfigData | undefined;

        // Handle different response formats (array or object)
        if (Array.isArray(response.data)) {
          config = response.data[0];
        } else {
          config = response.data;
        }

        // Set allowed collections for export if configuration exists
        if (config?.selectedExportCollections) {
          setAllowedImportCollections(config.selectedExportCollections);
        } else {
          setAllowedImportCollections([]);
        }
      } catch (error) {
        console.error('Error fetching saved config:', error);
      } finally {
        // Mark configuration loading as complete
        setLoadingConfig(false);
      }
    };
    fetchConfig();
  }, [get]);

  // Extract current content-type from URL path
  const segments = location.pathname.split('/');
  const contentTypeUid = segments.at(-1) || '';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Checking file format
    if (!file.name.endsWith('.xlsx')) {
      console.error('Please select an Excel file .xlsx');
      alert('Please select an Excel file .xlsx');
      return;
    }

    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setIsImporting(true); // Start importing

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/strapi-xlsx-impexp-plugin/import', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 401) {
        console.error('Unauthorized - check authentication');
        alert('Unauthorized - please check your authentication');
        return;
      }

      if (response.ok) {
        const result = await response.json();
        console.log('File uploaded successfully:', result);
        alert(`Successfully parsed ${result.data.rowCount} rows from the file`);
      } else {
        console.error('File upload failed with status:', response.status);
        const error = await response.json();
        console.error('Error details:', error);
        alert(`Import failed: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setIsImporting(false); // End importing
      // Reset the input value so that the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Show loading state while fetching config
  if (loadingConfig) {
    return (
      <Flex direction="row" gap={2}>
        <Button disabled>Loading...</Button>
      </Flex>
    );
  }

  // Don't show button if current content type is not allowed for import
  if (!allowedImportCollections.includes(contentTypeUid)) {
    return null;
  }

  return (
    <Flex direction="row" gap={2}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xlsx,.xls"
        style={{ display: 'none' }}
        disabled={isImporting}
      />
      <Button
        onClick={handleImport}
        disabled={isImporting}
        variant={isImporting ? "secondary" : "default"}
      >
        {isImporting ? 'Importing...' : 'Import'}
      </Button>
    </Flex>
  );
};

export default ImportButton;
