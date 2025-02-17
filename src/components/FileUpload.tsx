import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadProgress } from '../types/document';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  uploadProgress?: UploadProgress[];
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const FileUpload: React.FC<FileUploadProps> = ({ onUpload, uploadProgress = [] }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      const isValidSize = file.size <= MAX_FILE_SIZE;
      const isValidType = file.type === 'application/pdf';

      if (!isValidSize) {
        alert(`File "${file.name}" exceeds the 50MB size limit.`);
      }
      if (!isValidType) {
        alert(`File "${file.name}" is not a PDF file. Please upload PDF files only.`);
      }

      return isValidSize && isValidType;
    });

    if (validFiles.length > 0) {
      onUpload(validFiles);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: MAX_FILE_SIZE,
    noClick: true
  });

  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-y-4">
        <div
          {...getRootProps()}
          className={`w-full border-2 border-dashed rounded-lg p-8 text-center
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            {isDragActive
              ? 'Drop the PDF file here...'
              : 'Drag and drop your PDF file here'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supported files: PDF only (Max 50MB)
          </p>
        </div>
        
        <button
          type="button"
          onClick={open}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Choose Files
        </button>
      </div>

      {uploadProgress.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadProgress.map((progress) => (
            <div key={progress.fileName} className="w-full">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{progress.fileName}</span>
                <span>{progress.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
