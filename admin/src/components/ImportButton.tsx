import React, { useRef, ChangeEvent } from 'react';
import { Button, Flex } from '@strapi/design-system';

const ImportButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Проверяем формат файла
    if (!file.name.endsWith('.xlsx')) {
      console.error('Please select an Excel file .xlsx');
      alert('Please select an Excel file .xlsx');
      return;
    }

    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/strapi-xlsx-impexp-plugin/import', {
        method: 'POST',
        body: formData,
        // Не устанавливаем Content-Type - браузер сделает это сам с boundary
      });

      if (response.status === 401) {
        console.error('Unauthorized - check authentication');
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
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      // Сбрасываем значение input, чтобы можно было выбрать тот же файл снова
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Flex direction="row" gap={2}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xlsx,.xls"
        style={{ display: 'none' }}
      />
      <Button onClick={handleButtonClick}>
        Import
      </Button>
    </Flex>
  );
};

export default ImportButton;
