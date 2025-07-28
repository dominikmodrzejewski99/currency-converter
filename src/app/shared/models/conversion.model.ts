import { ApiResponseMeta } from './api.model';

export interface Conversion {
  timestamp: number;
  date: string;
  from: string;
  to: string;
  amount: number;
  value: number;
}

export interface ConversionApiResponse {
  meta: ApiResponseMeta;
  response: Conversion;
}

export type ConversionType = Omit<Conversion, 'timestamp' | 'date'>
