import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { staffService } from '../../services/staff.service';
import { AwardStampResponse } from '@stamp-card/shared';

export const QRScanner = () => {
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
  const [result, setResult] = useState<AwardStampResponse | null>(null);
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (scanning && !scanner) {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        'qr-reader',
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      html5QrcodeScanner.render(
        async (decodedText) => {
          setError('');
          try {
            const response = await staffService.awardStamp(decodedText);
            setResult(response);
            html5QrcodeScanner.clear();
            setScanning(false);
          } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to award stamp');
          }
        },
        (errorMessage) => {
          console.log('Scan error:', errorMessage);
        }
      );

      setScanner(html5QrcodeScanner);
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(console.error);
      }
    };
  }, [scanning]);

  const startScanning = () => {
    setResult(null);
    setError('');
    setScanning(true);
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.clear().catch(console.error);
      setScanner(null);
    }
    setScanning(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Scan Customer QR Code</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 rounded-md">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {result && (
        <div className="mb-4 p-4 bg-green-50 rounded-md">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Stamp Awarded!</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>{result.message}</p>
                {result.isCompleted && (
                  <p className="font-semibold mt-1">Card is now complete!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {!scanning ? (
        <button
          onClick={startScanning}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Start Scanning
        </button>
      ) : (
        <div>
          <div id="qr-reader" className="mb-4"></div>
          <button
            onClick={stopScanning}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Stop Scanning
          </button>
        </div>
      )}
    </div>
  );
};
