import React, { useState } from 'react';
import { DocumentList } from '../components/DocumentList';
import { FileUpload } from '../components/FileUpload';
import { Document, UploadProgress } from '../types/document';
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const DocumentManagement: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const { toast } = useToast();

  const handleUpload = async (files: File[]) => {
    try {
      if (files.length > 1) {
        toast({
          title: "Upload Error",
          description: "Please upload only one file at a time.",
          variant: "destructive",
        });
        return;
      }

      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);

      const newDoc: Document = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date(),
        status: 'processing'
      };

      setDocuments(prev => [...prev, newDoc]);

      return new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadProgress([{ fileName: file.name, progress }]);
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            setUploadProgress([]);
            setDocuments(prev =>
              prev.map(doc =>
                doc.id === newDoc.id ? { ...doc, status: 'ready' } : doc
              )
            );
            toast({
              title: "Upload Success",
              description: "File has been successfully processed",
            });
            resolve();
          } else {
            handleUploadError(newDoc.id, `Server error: ${xhr.statusText}`);
            reject(xhr.statusText);
          }
        });

        xhr.addEventListener("error", () => {
          handleUploadError(newDoc.id, "Network error occurred");
          reject(new Error("Network error"));
        });

        xhr.open("POST", "http://127.0.0.1:8080/load");
        xhr.send(formData);
      });

    } catch (error) {
      console.error('Upload error:', error);
      handleUploadError("", "Unexpected error occurred");
    }
  };

  const handleUploadError = (docId: string, message: string) => {
    setUploadProgress([]);
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === docId ? { ...doc, status: 'error' } : doc
      )
    );
    toast({
      title: "Upload Failed",
      description: message,
      variant: "destructive",
    });
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
