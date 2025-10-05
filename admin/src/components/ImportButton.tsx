import React from 'react';
import { Button, Flex } from '@strapi/design-system';

const ImportButton = () => {
  const handleImport = async () => {
    try {
      const response = await fetch('/strapi-xlsx-impexp-plugin/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test: 'test'
        }),
      });

      if (response.ok) {
        console.log('Import request sent successfully');
        console.log(response);
      } else {
        console.error('Import request failed');
      }
    } catch (error) {
      console.error('Error sending import request:', error);
    }
  };

  return (
    <Flex direction="row" gap={2}>
      <Button onClick={handleImport}>
        Import
      </Button>
    </Flex>
  );
};

export default ImportButton;
