import React, { useState } from 'react';
import { QueryInterface as QueryComponent } from '../components/QueryInterface';
import { Document, QueryResult } from '../types/document';

export const QueryInterfacePage: React.FC = () => {
  const [documents] = useState<Document[]>([]);
  const [queryHistory, setQueryHistory] = useState<QueryResult[]>([]);

  const handleSubmitQuery = async (query: string, selectedDocs: string[]) => {
    // Simulate API call
    const result: QueryResult = {
      id: Math.random().toString(36).substr(2, 9),
      query,
      timestamp: new Date(),
      response: 'This is a simulated response. In a real application, this would be the result from the RAG system.',
      documents: selectedDocs
    };

    setQueryHistory(prev => [result, ...prev]);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Query Documents</h2>
      <QueryComponent
        documents={documents}
        onSubmitQuery={handleSubmitQuery}
        queryHistory={queryHistory}
      />
    </div>
  );
};