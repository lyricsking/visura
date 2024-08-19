export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <SearchIcon className="w-6 h-6 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 bg-gray-100 rounded-md focus:outline-none"
        />
      </div>
      <div className="flex items-center space-x-4">
        <BellIcon className="w-6 h-6 text-gray-500" />
        <UserCircleIcon className="w-8 h-8 text-gray-500" />
      </div>
    </header>
  );
}
