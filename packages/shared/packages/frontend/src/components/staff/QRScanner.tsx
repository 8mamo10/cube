import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ProductSelection } from '@stamp-card/shared';
import { staffService } from '../../services/staff.service';
import { ProductSelectionModal } from './ProductSelectionModal';

export const QRScanner: React.FC = () => {
  const [scannedQR, setScannedQR] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

  React.useEffect(() => {
    const qrScanner = new Html5QrcodeScanner(
      'qr-reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false,
    );

    qrScanner.render(
      (decodedText) => {
        setScannedQR(decodedText);
        setIsModalOpen(true);
        qrScanner.clear();
      },
      (error) => {
        // Ignore scanning errors
      },
    );

    setScanner(qrScanner);

    return () => {
      qrScanner.clear();
    };
  }, []);

  const handleConfirm = async (products: ProductSelection[]) => {
    if (!scannedQR) return;

    setLoading(true);
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
        const qrScanner = new Html5QrcodeScanner(
          'qr-reader',
          { fps: 10, qrbox: { width: 250, height: 250 } },
          false,
        );

        qrScanner.render(
          (decodedText) => {
            setScannedQR(decodedText);
            setIsModalOpen(true);
            qrScanner.clear();
          },
          (error) => {
            // Ignore scanning errors
          },
        );

        setScanner(qrScanner);
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to award stamp');
      setIsModalOpen(false);
      setScannedQR(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setScannedQR(null);
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
