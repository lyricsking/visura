export default function PaymentSettings() {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Payment Settings</h2>
      <form method="post">
        <div className="mb-4">
          <label
            htmlFor="paymentMethod"
            className="block text-sm font-medium text-gray-700"
          >
            Saved Payment Methods
          </label>
          <input
            type="text"
            name="paymentMethod"
            id="paymentMethod"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="billingHistory"
            className="block text-sm font-medium text-gray-700"
          >
            Billing History
          </label>
          <input
            type="text"
            name="billingHistory"
            id="billingHistory"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </form>
    </div>
  );
}
