import React, { useState, useEffect } from 'react';
import { Product, ProductSelection } from '@stamp-card/shared';
import { productsService } from '../../services/products.service';

interface ProductSelectionModalProps {
  isOpen: boolean;
  qrCode: string;
  onConfirm: (products: ProductSelection[]) => void;
  onCancel: () => void;
}

export const ProductSelectionModal: React.FC<ProductSelectionModalProps> = ({
  isOpen,
  qrCode,
  onConfirm,
  onCancel,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Map<string, number>>(
    new Map(),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchActiveProducts();
      setSelectedProducts(new Map());
    }
  }, [isOpen]);

  const fetchActiveProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productsService.getActive();
      setProducts(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    setSelectedProducts((prev) => {
      const newMap = new Map(prev);
      const currentQty = newMap.get(productId) || 0;
      const newQty = Math.max(0, currentQty + delta);

      if (newQty === 0) {
        newMap.delete(productId);
      } else {
        newMap.set(productId, newQty);
      }

      return newMap;
    });
  };

  const handleConfirm = () => {
    const productSelections: ProductSelection[] = Array.from(
      selectedProducts.entries(),
    ).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));

    if (productSelections.length === 0) {
      setError('Please select at least one product');
      return;
    }

    onConfirm(productSelections);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Select Products</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No active products available. Please contact an administrator.
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            {products.map((product) => {
              const quantity = selectedProducts.get(product.id) || 0;

              return (
                <div
                  key={product.id}
                  className={`border rounded-lg p-4 ${
                    quantity > 0 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {product.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                        disabled={quantity === 0}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading || selectedProducts.size === 0}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            Confirm ({selectedProducts.size} product{selectedProducts.size !== 1 ? 's' : ''})
          </button>
        </div>
      </div>
    </div>
  );
};
