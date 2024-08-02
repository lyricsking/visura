export default function HealthSettings() {
  
  const fetcher = useFetcher();
  
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Health Preferences</h2>
      <fetcher.Form method="post">
        <input type="hidden" name="_action" value={HEALTH_UPDATE_ACTION} />
        <div className="mb-4">
          <Label
            htmlFor="supplementPreferences"
            className="block text-sm font-medium text-gray-700"
          >
            Supplement Preferences
          </Label>
          <Input
            type="text"
            name="supplementPreferences"
            id="supplementPreferences"
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="healthGoals"
            className="block text-sm font-medium text-gray-700"
          >
            Health Goals
          </Label>
          <Input
            type="text"
            name="healthGoals"
            id="healthGoals"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="allergies"
            className="block text-sm font-medium text-gray-700"
          >
            Allergies & Sensitivities
          </Label>
          <Input
            type="text"
            name="allergies"
            id="allergies"
            className="mt-1"
          />
        </div>
        <Button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </Button>
      </fetcher.Form>
    </div>
  );
}
