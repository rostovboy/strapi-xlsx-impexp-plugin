import React, { useEffect, useState } from 'react';
import { Button, Flex } from '@strapi/design-system';
import { useLocation } from 'react-router-dom';
import { useFetchClient } from '@strapi/strapi/admin';
import { ConfigData } from '../../../server/src/types';

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
    setIsExporting(true);
    console.log('Exporting...', { contentTypeUid });
    // TODO: Add API request for export functionality
    setIsExporting(false);
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
