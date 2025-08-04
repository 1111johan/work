// 定义文献数据类型
export interface Paper {
  id: string;
  title: string;
  authors: string[];
  venue?: string;
  published?: string;
  doi?: string;
  abstract?: string;
  citations?: number;
  score?: number;
  tags?: string[];
  impact?: string;
  trending?: boolean;
  pdfUrl?: string;
  paperUrl?: string;
} 