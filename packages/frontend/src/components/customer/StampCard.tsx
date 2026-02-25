import { CardStatus, StampCard as StampCardType } from '@stamp-card/shared';

interface StampCardProps {
  card: StampCardType;
}

export const StampCard = ({ card }: StampCardProps) => {
  const filledStamps = card.stampsCount;
  const emptyStamps = card.maxStamps - card.stampsCount;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Stamp Card</h3>
          <p className="text-sm text-gray-500">
            {filledStamps} / {card.maxStamps} stamps
          </p>
        </div>
        <div>
          {card.status === CardStatus.COMPLETED && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Completed
            </span>
          )}
          {card.status === CardStatus.ACTIVE && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Active
            </span>
          )}
          {card.status === CardStatus.REDEEMED && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              Redeemed
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: filledStamps }).map((_, index) => (
          <div
            key={`filled-${index}`}
            className="aspect-square rounded-full bg-indigo-600 flex items-center justify-center"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ))}
        {Array.from({ length: emptyStamps }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="aspect-square rounded-full border-2 border-gray-300 border-dashed"
          />
        ))}
      </div>

      {card.status === CardStatus.COMPLETED && (
        <div className="mt-4 p-3 bg-green-50 rounded-md">
          <p className="text-sm text-green-800 font-medium text-center">
            Congratulations! Your card is complete!
          </p>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <p>Created: {new Date(card.createdAt).toLocaleDateString()}</p>
        {card.completedAt && (
          <p>Completed: {new Date(card.completedAt).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
};
