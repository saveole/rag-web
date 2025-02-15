import React, { useState } from 'react';
import { Document, QueryResult } from '../types/document';
// Update import paths to use @/ alias
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { format } from 'date-fns';

interface QueryInterfaceProps {
  documents: Document[];
  onSubmitQuery: (query: string, selectedDocs: string[]) => void;
  queryHistory: QueryResult[];
}

export const QueryInterface: React.FC<QueryInterfaceProps> = ({
  documents,
  onSubmitQuery,
  queryHistory
}) => {
  const [query, setQuery] = useState('');
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmitQuery(query, selectedDocs);
      setQuery('');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Select Documents</h3>
          <div className="grid grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center space-x-2">
                <Checkbox
                  id={doc.id}
                  checked={selectedDocs.includes(doc.id)}
                  onCheckedChange={(checked) => {
                    setSelectedDocs(
                      checked
                        ? [...selectedDocs, doc.id]
                        : selectedDocs.filter(id => id !== doc.id)
                    );
                  }}
                />
                <label
                  htmlFor={doc.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {doc.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="query" className="text-sm font-medium">
            Enter your query
          </label>
          <Textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your question here..."
            className="min-h-[100px]"
          />
        </div>

        <Button
          type="submit"
          disabled={!query.trim() || selectedDocs.length === 0}
        >
          Submit Query
        </Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Query History</h3>
        <div className="space-y-4">
          {queryHistory.map((result) => (
            <Card key={result.id} className="p-4">
              <p className="text-sm text-muted-foreground">
                {format(new Date(result.timestamp), 'PPpp')}
              </p>
              <p className="font-medium mt-1">{result.query}</p>
              <p className="text-muted-foreground mt-2">{result.response}</p>
              <div className="mt-2">
                <p className="text-sm font-medium">Documents used:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {result.documents.map((docId) => (
                    <li key={docId}>
                      {documents.find(d => d.id === docId)?.name || 'Unknown document'}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};