import React, { useState } from 'react';
import { DocumentList } from '../components/DocumentList';
import { FileUpload } from '../components/FileUpload';
import { Document, UploadProgress } from '../types/document';
import { Card } from "@/components/ui/card";

export const DocumentManagement: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);

  const handleUpload = async (files: File[]) => {
    try {
      if (files.length > 1) {
        alert("Please upload only one file at a time.");
        return;
      }

      const file = files[0];
      const newDoc: Document = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date(),
        status: 'processing'
      };

      setDocuments(prev => [...prev, newDoc]);

      // Simulate file upload with progress updates
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress([{ fileName: file.name, progress }]);
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      setUploadProgress([]);
      
      setDocuments(prev =>
        prev.map(doc =>
          doc.id === newDoc.id ? { ...doc, status: 'ready' } : doc
        )
      );
    } catch (error) {
      console.error('Upload error:', error);
      setDocuments(prev =>
        prev.map(doc =>
          doc.status === 'processing' ? { ...doc, status: 'error' } : doc
        )
      );
    }
  };

  const handleDelete = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold">Upload Documents</h2>
          <div className="mt-4">
            <FileUpload onUpload={handleUpload} uploadProgress={uploadProgress} />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold">Document Library</h2>
          <div className="mt-4">
            <DocumentList documents={documents} onDelete={handleDelete} />
          </div>
        </Card>
      </div>
    </div>
  );
};