import React, { useEffect, useState } from 'react';
import { Button, Flex } from '@strapi/design-system';
import { useLocation } from 'react-router-dom';
import { useFetchClient } from '@strapi/strapi/admin';
import { ConfigData } from '../../../server/src/types';
import qs from 'qs';

interface ParsedQuery {
  filters?: Record<string, any>;
  _q?: string;
  [key: string]: unknown;
}

const ExportButton = () => {
  const { get } = useFetchClient();
  const location = useLocation();

  const [allowedExportCollections, setAllowedExportCollections] = useState<string[]>([]);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

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
          setAllowedExportCollections(config.selectedExportCollections);
        } else {
          setAllowedExportCollections([]);
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

  // Don't render button if configuration is still loading
  if (loadingConfig) return null;

  // Don't render button if current content-type is not allowed for export
  if (!allowedExportCollections.includes(contentTypeUid)) return null;

  // Handle export button click
  const handleExport = async () => {
    const messageLines: string[] = [];

    const parsedQuery: ParsedQuery = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    if (parsedQuery.filters) {
      const filters = { ...parsedQuery.filters };
      if (Object.keys(filters).length > 0) {
        messageLines.push(`Filters: ${JSON.stringify(filters)}`);
      }
    }

    if (parsedQuery._q) {
      messageLines.push(`Search Keyword: ${parsedQuery._q}`);
    }

    if (!parsedQuery.filters && !parsedQuery._q) {
      messageLines.push('There are not filters or search provided (exporting ALL data)');
    }

    const confirmMessage = `Export will be performed with the following conditions:\n\n${messageLines.join(
      '\n'
    )}\n\nProceed?`;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    setIsExporting(true);

    const parts = location.pathname.split('::');
    const collectionFull = parts[1] || '';
    const [collectionName] = collectionFull.split('.');

    try {
      let query = `collection=${collectionName}`;

      if (parsedQuery.filters) {
        const filtersQuery = qs.stringify(
          { filters: parsedQuery.filters },
          { encode: false }
        );
        if (filtersQuery) {
          query += `&${filtersQuery}`;
        }
      }

      if (parsedQuery._q) {
        query += `&_q=${encodeURIComponent(parsedQuery._q as string)}`;
      }

      const response = await get(`/strapi-xlsx-impexp-plugin/export?${query}`);

      const { filename, base64, mime } = response.data;

      // Decoding base64 → Uint8Array
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: mime });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      console.log('File downloaded successfully');
    } catch (error) {
      console.error('Error during export:', error);
      alert('Export failed: ' + (error as Error).message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Flex direction="row" gap={2}>
      <Button onClick={handleExport} disabled={isExporting}>
        {isExporting ? 'Exporting...' : 'Export'}
      </Button>
    </Flex>
  );
};

export default ExportButton;
