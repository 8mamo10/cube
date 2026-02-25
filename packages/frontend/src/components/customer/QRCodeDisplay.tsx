import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { customerService } from '../../services/customer.service';

export const QRCodeDisplay = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const generateQRCode = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await customerService.getQRCode();
      setQrCode(result.code);
      setExpiresAt(new Date(result.expiresAt));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (expiresAt) {
      const interval = setInterval(() => {
        const now = Date.now();
        const expires = new Date(expiresAt).getTime();
        const remaining = Math.max(0, expires - now);
        setTimeLeft(remaining);

        if (remaining === 0) {
          setQrCode(null);
          setExpiresAt(null);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [expiresAt]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Show QR Code to Staff
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 rounded-md">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {qrCode ? (
        <div className="text-center">
          <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
            <QRCode value={qrCode} size={200} level="H" />
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Expires in: <span className="font-medium">{formatTime(timeLeft)}</span>
            </p>
            <button
              onClick={generateQRCode}
              disabled={loading}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
            >
              Refresh QR Code
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Generate a QR code for staff to scan and award you a stamp
          </p>
          <button
            onClick={generateQRCode}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate QR Code'}
          </button>
        </div>
      )}
    </div>
  );
};
