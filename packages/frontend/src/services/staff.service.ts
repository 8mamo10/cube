import { api } from './api.service';
import { AwardStampResponse } from '@stamp-card/shared';

export const staffService = {
  async awardStamp(qrCode: string): Promise<AwardStampResponse> {
    const response = await api.post<AwardStampResponse>('/staff/award-stamp', {
      qrCode,
    });
    return response.data;
  },

  async getHistory(): Promise<any[]> {
    const response = await api.get<any[]>('/staff/history');
    return response.data;
  },
};
