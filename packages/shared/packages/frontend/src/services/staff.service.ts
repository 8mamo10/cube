import { apiClient } from '../utils/api';
import {
  AwardStampResponse,
  ProductSelection,
} from '@stamp-card/shared';

export const staffService = {
  async awardStamp(
    qrCode: string,
    products: ProductSelection[],
  ): Promise<AwardStampResponse> {
    const response = await apiClient.post<AwardStampResponse>(
      '/staff/award-stamp',
      { qrCode, products },
    );
    return response.data;
  },

  async getHistory(): Promise<any[]> {
    const response = await apiClient.get<any[]>('/staff/history');
    return response.data;
  },
};
