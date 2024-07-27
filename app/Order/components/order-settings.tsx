export default function OrderPreferences() {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Order Preferences</h2>
      <form method="post">
        <div className="mb-4">
          <label htmlFor="deliveryInstructions" className="block text-sm font-medium text-gray-700">Delivery Instructions</label>
          <input type="text" name="deliveryInstructions" id="deliveryInstructions" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="packagingPreferences" className="block text-sm font-medium text-gray-700">Packaging Preferences</label>
          <select name="packagingPreferences" id="packagingPreferences" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="eco-friendly">Eco-friendly</option>
            <option value="discreet">Discreet</option>
          </select>
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save
        </button>
      </form>
    </div>
  );
}
