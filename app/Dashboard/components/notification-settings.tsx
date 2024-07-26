export default function NotificationSettings() {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
      <form method="post">
        <div className="mb-4">
          <label htmlFor="orderUpdates" className="block text-sm font-medium text-gray-700">Order Updates</label>
          <select name="orderUpdates" id="orderUpdates" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="app">App Notifications</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="subscriptionReminders" className="block text-sm font-medium text-gray-700">Subscription Reminders</label>
          <select name="subscriptionReminders" id="subscriptionReminders" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="app">App Notifications</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="promotionalNotifications" className="block text-sm font-medium text-gray-700">Promotional Notifications</label>
          <select name="promotionalNotifications" id="promotionalNotifications" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="app">App Notifications</option>
          </select>
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save
        </button>
      </form>
    </div>
  );
}
