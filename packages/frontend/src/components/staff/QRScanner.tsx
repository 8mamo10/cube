import React, { useState, useRef, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ProductSelection } from '@stamp-card/shared';
import { staffService } from '../../services/staff.service';
import { ProductSelectionModal } from './ProductSelectionModal';

export const QRScanner: React.FC = () => {
  const [scannedQR, setScannedQR] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const isInitializedRef = useRef(false);

  const initializeScanner = () => {
    if (isInitializedRef.current || scannerRef.current) {
      return;
    }

    // Clear any existing DOM elements from previous scanner instances
    const readerElement = document.getElementById('qr-reader');
    if (readerElement) {
      readerElement.innerHTML = '';
    }

    isInitializedRef.current = true;
    const qrScanner = new Html5QrcodeScanner(
      'qr-reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false,
    );

    scannerRef.current = qrScanner;

    qrScanner.render(
      (decodedText) => {
        setScannedQR(decodedText);
        setIsModalOpen(true);
        qrScanner.clear().catch(() => {});
        scannerRef.current = null;
        isInitializedRef.current = false;
      },
      () => {
        // Ignore scanning errors
      },
    );
  };

  useEffect(() => {
    initializeScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
      isInitializedRef.current = false;

      // Clean up any remaining DOM elements
      const readerElement = document.getElementById('qr-reader');
      if (readerElement) {
        readerElement.innerHTML = '';
      }
    };
  }, []);

  const handleConfirm = async (products: ProductSelection[]) => {
    if (!scannedQR) return;

    setError(null);
    setSuccess(null);

    try {
      const response = await staffService.awardStamp(scannedQR, products);
      setSuccess(response.message);
      setIsModalOpen(false);
      setScannedQR(null);

      // Restart scanner after success
      setTimeout(() => {
        setSuccess(null);
        initializeScanner();
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to award stamp');
      setIsModalOpen(false);
      setScannedQR(null);
      // Restart scanner after error
      setTimeout(() => {
        initializeScanner();
      }, 1000);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setScannedQR(null);
    // Restart scanner after cancel
    setTimeout(() => {
      initializeScanner();
    }, 500);
  };

  return (
    <div className="space-y-4">
      <div id="qr-reader" className="w-full"></div>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {scannedQR && (
        <ProductSelectionModal
          isOpen={isModalOpen}
          qrCode={scannedQR}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};
