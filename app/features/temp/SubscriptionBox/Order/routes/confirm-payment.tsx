import { useFetcher } from "@remix-run/react";

const OrderConfirmationModal = () => {
  const fetcher = useFetcher();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-500 text-white rounded-full p-3">✓</div>
        </div>
        <h3 className="text-lg font-bold text-center">Congratulations !!</h3>
        <p className="text-center text-gray-600 mb-4">
          Your order is accepted. Your items are on the way and should arrive
          shortly.
        </p>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded mb-2"
          onClick={() => {
            // Handle track order action
          }}
        >
          Track Order Now
        </button>
        <button
          className="w-full bg-gray-200 text-gray-700 py-2 rounded"
          onClick={() => {
            // Handle continue shopping action
          }}
        >
          Continue Shopping
        </button>
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-gray-600">Total price</span>
            <span className="font-bold text-lg ml-2">$324.00</span>
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => {
              // Handle pay now action
            }}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
