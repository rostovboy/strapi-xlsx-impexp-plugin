import React from 'react';
import { Button, Flex } from '@strapi/design-system';

const ImportButton = () => {

  return (
    <Flex direction="row" gap={2}>
      <Button>
        Import
      </Button>
    </Flex>
  );
};

export default ImportButton;
