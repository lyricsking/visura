export type SidebarMenuProps = {
  id: number | string,
  label: string,
  url: string
}

export type SidebarContentProps = {
  menus: SidebarMenuProps[]
}

export const SidebarContent = ({ menus }: SidebarContentProps) => {
  
  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white w-64" aria-label="Sidebar">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-semibold" aria-label="Logo">Logo</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          {
            menus.map((menu)=>(
          <li key={menu.id}>
            <NavLink
              to={menu.url}
              className={({ isActive, isPending }) =>
                `flex items-center px-4 py-2 mt-5 text-gray-300 capitalize transition-colors duration-300 transform ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                } ${isPending ? "animate-pulse" : ""}`
              }
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              aria-busy={({ isPending }) => (isPending ? "true" : "false")}
            >
              {menu.label}
            </NavLink>
          </li>)
            )
          }
        </ul>
      </nav>
    </div>
  );
};
