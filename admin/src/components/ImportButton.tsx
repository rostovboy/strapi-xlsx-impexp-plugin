import React, { useRef, ChangeEvent, useEffect, useState } from 'react';
import { Button, Field, Flex, Modal } from '@strapi/design-system';
import { useFetchClient } from '@strapi/strapi/admin';
import { ConfigData } from '../../../server/src/types';

const ImportButton = () => {
  const { get } = useFetchClient();

  const [allowedImportCollections, setAllowedImportCollections] = useState<string[]>([]);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [isImporting, setIsImporting] = useState(false);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const showModal = (title: string, message: string, success: boolean = false) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsSuccess(success);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
    setModalTitle('');
    setIsSuccess(false);
  };
  const formatMessage = (message: string) => {
    return message.split('\n').map((line, index) => (
      <div key={index} style={{ marginBottom: index > 0 ? '8px' : '0' }}>
        {line}
      </div>
    ));
  };
  // End of Modal

  // Fetch plugin configuration on component mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await get('/strapi-xlsx-impexp-plugin/config');
        let config: ConfigData | undefined;

        if (Array.isArray(response.data)) {
          config = response.data[0];
        } else {
          config = response.data;
        }

        if (config?.selectedExportCollections) {
          setAllowedImportCollections(config.selectedExportCollections);
        } else {
          setAllowedImportCollections([]);
        }
      } catch (error) {
        console.error('Error fetching saved config:', error);
      } finally {
        setLoadingConfig(false);
      }
    };
    fetchConfig();
  }, [get]);

  const segments = location.pathname.split('/');
  const contentTypeUid = segments.at(-1) || '';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx')) {
      showModal('Error', 'Please select an Excel file (.xlsx)', false);
      return;
    }

    await uploadFile(file, contentTypeUid);
  };

  const uploadFile = async (file: File, contentTypeUid: string) => {
    setIsImporting(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('contentTypeUid', contentTypeUid); // Добавляем UID сущности

      const response = await fetch('/strapi-xlsx-impexp-plugin/import', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      // Show modal with import result
      if (result.success) {
        const successMessage = [
          'Import completed successfully!',
          '',
          `📊 Entity: ${contentTypeUid}`,
          `📊 Total processed: ${result.totalProcessed}`,
          `✅ Created: ${result.created}`,
          `🔄 Updated: ${result.updated}`,
          `🗑️ Deleted: ${result.deleted}`,
          ...(result.errors.length > 0 ? [
            '',
            '⚠️ Note: Some warnings occurred during import:',
            ...result.errors.map((error: any) =>
              `   • Row ${error.row}, Column "${error.column}": ${error.message}`
            )
          ] : [])
        ].join('\n');

        showModal('Success', successMessage, true);
      } else {
        const errorMessage = [
          'Import failed!',
          '',
          `📊 Entity: ${contentTypeUid}`,
          '❌ Errors encountered:',
          ...result.errors.map((error: any, index: number) =>
            `${index + 1}. Row ${error.row}, Column "${error.column}": ${error.message}`
          ),
          '',
          `Total processed: ${result.totalProcessed}`
        ].join('\n');

        showModal('Error', errorMessage, false);
      }

    } catch (error) {
      console.error('Error uploading file:', error);
      showModal(
        'Error',
        `Error uploading file for entity: ${contentTypeUid}\n\nIf the problem persists, check your connection and file format.`,
        false
      );
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (loadingConfig) {
    return (
      <Flex direction="row" gap={2}>
        <Button disabled>Loading...</Button>
      </Flex>
    );
  }

  if (!allowedImportCollections.includes(contentTypeUid)) {
    return null;
  }

  return (
    <Flex direction="row" gap={2}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xlsx"
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

      {/* Модальное окно для уведомлений */}
      {isModalOpen && (
        <Modal.Root open={isModalOpen} onOpenChange={closeModal}>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Field.Root>
                <Field.Label>
                  <div style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.5',
                    fontFamily: 'monospace',
                    fontSize: '14px'
                  }}>
                    {formatMessage(modalMessage)}
                  </div>
                </Field.Label>
              </Field.Root>
            </Modal.Body>
            <Modal.Footer>
              <Modal.Close>
                <Button variant={isSuccess ? "default" : "tertiary"}>
                  {isSuccess ? 'Great!' : 'Close'}
                </Button>
              </Modal.Close>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Root>
      )}
    </Flex>
  );
};

export default ImportButton;
