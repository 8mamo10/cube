import { api } from './api.service';
import { CardWithStamps, StampCard } from '@stamp-card/shared';

export const customerService = {
  async getCards(): Promise<StampCard[]> {
    const response = await api.get<StampCard[]>('/customer/cards');
    return response.data;
  },

  async getCard(id: string): Promise<CardWithStamps> {
    const response = await api.get<CardWithStamps>(`/customer/cards/${id}`);
    return response.data;
  },

  async getQRCode(): Promise<{ code: string; expiresAt: Date }> {
    const response = await api.get<{ code: string; expiresAt: Date }>('/customer/qr-code');
    return response.data;
  },
};
