export default function HealthSettings() {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Health Preferences</h2>
      <form method="post">
        <div className="mb-4">
          <label
            htmlFor="supplementPreferences"
            className="block text-sm font-medium text-gray-700"
          >
            Supplement Preferences
          </label>
          <input
            type="text"
            name="supplementPreferences"
            id="supplementPreferences"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="healthGoals"
            className="block text-sm font-medium text-gray-700"
          >
            Health Goals
          </label>
          <input
            type="text"
            name="healthGoals"
            id="healthGoals"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="allergies"
            className="block text-sm font-medium text-gray-700"
          >
            Allergies & Sensitivities
          </label>
          <input
            type="text"
            name="allergies"
            id="allergies"
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
