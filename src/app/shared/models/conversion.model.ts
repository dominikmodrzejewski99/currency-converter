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

export interface ConversionParams {
  readonly from: string;
  readonly to: string;
  readonly amount: number;
}

export type ConversionType = Omit<Conversion, 'timestamp' | 'date'>
