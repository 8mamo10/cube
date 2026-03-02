export interface Product {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  active?: boolean;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  active?: boolean;
}
