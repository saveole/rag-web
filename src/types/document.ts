export interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  status: 'processing' | 'ready' | 'error';
}

export interface UploadProgress {
  fileName: string;
  progress: number;
}

export interface QueryResult {
  id: string;
  query: string;
  timestamp: Date;
  response: string;
  documents: string[];
}
