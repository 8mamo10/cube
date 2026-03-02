export interface ProductSelection {
  productId: string;
  quantity: number;
}

export interface StampProductInfo {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
}

export interface AwardStampDto {
  qrCode: string;
  products: ProductSelection[];
}

export interface AwardStampResponse {
  card: {
    id: string;
    status: string;
    stampsCount: number;
    maxStamps: number;
  };
  stamp: {
    id: string;
    awardedAt: Date;
    products: StampProductInfo[];
  };
  message: string;
  isCompleted: boolean;
}
