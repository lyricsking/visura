export default function DisplaySettings() {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Display Settings</h2>
      <form method="post">
        <div className="mb-4">
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Theme</label>
          <select name="theme" id="theme" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
          <select name="language" id="language" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <!-- Add more languages as needed -->
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
          <select name="currency" id="currency" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="usd">USD - United States Dollar</option>
            <option value="eur">EUR - Euro</option>
            <option value="gbp">GBP - British Pound</option>
            <option value="jpy">JPY - Japanese Yen</option>
            {/* Add more currencies as needed -->*/}
          </select>
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save
        </button>
      </form>
    </div>
  );
}
