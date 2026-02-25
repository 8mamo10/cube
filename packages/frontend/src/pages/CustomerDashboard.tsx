import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { StampCard } from '../components/customer/StampCard';
import { QRCodeDisplay } from '../components/customer/QRCodeDisplay';
import { customerService } from '../services/customer.service';
import { StampCard as StampCardType } from '@stamp-card/shared';

export const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const [cards, setCards] = useState<StampCardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await customerService.getCards();
        setCards(data);
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Stamp Card System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={logout}
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Welcome, {user?.firstName}!
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <QRCodeDisplay />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Your Stamp Cards
            </h3>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading cards...</p>
              </div>
            ) : cards.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600">No stamp cards yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map((card) => (
                  <StampCard key={card.id} card={card} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
