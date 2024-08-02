import { SettingsType } from "../type/settings.type";

export default function DisplaySettings
(props: Partial<SettingsType>) {
  
  const fetcher = useFetcher();
  
  const display = profile?.preferences.display;
  
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Display Settings</h2>
      <fetcher.Form method="post">
        <input type="hidden" name="_action" value={DISPLAY_UPDATE_ACTION} />
        <div className="mb-4">
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Theme
          </Label>
          <Select name="theme">
            <SelectTrigger id="name" className="flex bg-white">
              <SelectValue
                placeholder={display?.theme}
              />
            </SelectTrigger>
            <SelectContent className=" bg-white">
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          
        </div>
        <div className="mb-4">
          <Label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700"
          >
            Language
          </Label>
          <Select name="language">
            <SelectTrigger id="language" className="flex bg-white">
              <SelectValue
                placeholder={display?.theme}
              />
            </SelectTrigger>
            <SelectContent className=" bg-white">
          <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-700"
          >
            Currency
          </Label>
          <Select
            name="currency"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <SelectTrigger id="currency" className="flex bg-white">
              <SelectValue
                placeholder={display?.theme}
              />
            </SelectTrigger>
            <SelectContent className=" bg-white">
            <SelectItem value="ngn">NGN - Nigeria Naira</SelectItem>
            </SelectContent>
          </Select>
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
