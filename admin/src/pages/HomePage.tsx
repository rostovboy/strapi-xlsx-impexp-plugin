import { Box, Button, Checkbox, Divider, Flex, Main, Typography, Modal, Field } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTranslation } from '../utils/getTranslation';
import { useFetchClient } from '@strapi/strapi/admin';
import { useEffect, useState } from 'react';

interface CollectionType {
  uid: string;
  schema: {
    kind: string;
    visible: boolean;
    displayName: string;
  };
}

interface Config {
  selectedExportCollections: string[];
  selectedImportCollections: string[];
}


const HomePage = () => {
  const { formatMessage } = useIntl();

  const { get, post } = useFetchClient();

  const [collectionTypes, setCollectionTypes] = useState<CollectionType[]>([]);
  const [exportCollections, setExportCollections] = useState<string[]>([]);
  const [importCollections, setImportCollections] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');

  const showModal = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
    setModalTitle('');
  };

  // Загрузка списка collectionTypes
  useEffect(() => {
    const fetchCollectionTypes = async () => {
      try {
        const response = await get('/content-type-builder/content-types');
        let collections: CollectionType[] = [];

        if (Array.isArray(response.data)) {
          collections = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          collections = response.data.data;
        }

        // Фильтрация только collection types с kind === 'collectionType' и visible
        const filtered = collections.filter(
          (ct: CollectionType) => ct.schema && ct.schema.kind === 'collectionType' && ct.schema.visible
        );
        setCollectionTypes(filtered);
      } catch (error) {
        console.error('Failed to fetch collection types', error);
        showModal('Error', 'Failed to load collection types');
      }
    };
    fetchCollectionTypes();
  }, [get]);

  // Получение сохраненной ранее конфигурации
  useEffect(() => {
    const fetchSavedConfig = async () => {
      try {
        const response = await get('/strapi-xlsx-impexp-plugin/config');
        let config: Config | undefined;

        if (Array.isArray(response.data)) {
          config = response.data[0];
        } else {
          config = response.data;
        }

        if (config) {
          setExportCollections(config.selectedExportCollections || []);
          setImportCollections(config.selectedImportCollections || []);
        }
      } catch (error) {
        console.error('Error fetching saved config:', error);
      }
    };
    fetchSavedConfig();
  }, [get]);

  // Обработчик чекбокса для Export
  const handleExportToggle = (uid: string) => {
    if (exportCollections.includes(uid)) {
      setExportCollections(exportCollections.filter((v) => v !== uid));
    } else {
      setExportCollections([...exportCollections, uid]);
    }
  };

  // Обработчик чекбокса для Import
  const handleImportToggle = (uid: string) => {
    if (importCollections.includes(uid)) {
      setImportCollections(importCollections.filter((v) => v !== uid));
    } else {
      setImportCollections([...importCollections, uid]);
    }
  };

  // Обработчик кнопки сохранить конфигурацию
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await post('/strapi-xlsx-impexp-plugin/config', {
        data: {
          selectedExportCollections: exportCollections,
          selectedImportCollections: importCollections,
        },
      });
      console.log('Config saved:', response.data);
      showModal('Success', 'Configuration saved successfully!');
    } catch (error) {
      console.error('Error saving config:', error);
      showModal('Error', 'Error saving configuration.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
  <Main padding={8}>
    <Box>
      <Typography variant="beta" as="h1">
        {formatMessage({ id: getTranslation('welcome.message'), defaultMessage: 'Welcome to' })}&nbsp;
        {formatMessage({ id: getTranslation('plugin.name'), defaultMessage: 'Xlsx Import/Export Plugin' })}
      </Typography>
      <Typography variant="omega" as="p">
        {formatMessage({
          id: getTranslation('welcome.description'),
          defaultMessage: 'Configure the display of the Export or Import button using the desired Collection through the options below'
        })}
      </Typography>
    </Box>
    <Box paddingTop={4} paddingBottom={4}>
      <Divider />
    </Box>

    <Flex gap={8} alignItems="flex-start">
      {/* Column Export */}
      <Box width="50%" padding={4} borderColor={{initial: '#eaeaef'}}>
        <Typography variant="beta" as="h2">
          {formatMessage({ id: getTranslation('config.export-collections'), defaultMessage: 'Export Collections' })}
        </Typography>
        <Flex direction="column" gap={2} marginTop={2} alignItems="left">
          {formatMessage({
            id: getTranslation('config.export-collections-description'),
            defaultMessage: 'Choose collections to enable export'
          })}
          {collectionTypes.map((ct) => (
            <Checkbox
              key={ct.uid}
              checked={exportCollections.includes(ct.uid)}
              onCheckedChange={() => handleExportToggle(ct.uid)}
              disabled={isSaving}
            >
              {ct.schema.displayName}
            </Checkbox>
          ))}
        </Flex>
      </Box>

      {/* Column Import */}
      <Box width="50%" padding={4} borderColor={{initial: '#eaeaef'}}>
        <Typography variant="beta" as="h2">
          {formatMessage({ id: getTranslation('config.import-collections'), defaultMessage: 'Import Collections' })}
        </Typography>
        <Flex direction="column" gap={2} marginTop={2} alignItems="left">
          {formatMessage({
            id: getTranslation('config.import-collections-description'),
            defaultMessage: 'Choose collections to enable import'
          })}
          {collectionTypes.map((ct) => (
            <Checkbox
              key={ct.uid}
              checked={importCollections.includes(ct.uid)}
              onCheckedChange={() => handleImportToggle(ct.uid)}
              disabled={isSaving}
            >
              {ct.schema.displayName}
            </Checkbox>
          ))}
        </Flex>
      </Box>
    </Flex>

    <Flex marginTop={4} justifyContent="center" alignItems="center">
      <Button onClick={handleSave} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Config'}
      </Button>
    </Flex>

    {/* Модальное окно для уведомлений */}
    {isModalOpen && (
      <Modal.Root open={isModalOpen} onOpenChange={closeModal}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Field.Root>
              <Field.Label>{modalMessage}</Field.Label>
            </Field.Root>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close>
              <Button variant="tertiary">Close</Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    )}
  </Main>
  );
};

export { HomePage };
