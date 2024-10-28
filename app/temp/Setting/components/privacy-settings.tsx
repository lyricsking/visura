export default function PrivacySettings() {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Privacy Settings</h2>
      <form method="post">
        <div className="mb-4">
          <label htmlFor="dataSharing" className="block text-sm font-medium text-gray-700">Data Sharing Preferences</label>
          <select name="dataSharing" id="dataSharing" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="opt-in">Opt-in</option>
            <option value="opt-out">Opt-out</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="activityTracking" className="block text-sm font-medium text-gray-700">Activity Tracking</label>
          <select name="activityTracking" id="activityTracking" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="accountVisibility" className="block text-sm font-medium text-gray-700">Account Visibility</label>
          <select name="accountVisibility" id="accountVisibility" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save
        </button>
      </form>
    </div>
  );
}
