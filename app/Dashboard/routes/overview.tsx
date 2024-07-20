import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = {
    name: "Jamiu Adeniyi",
    avatar: "/illustrations/avatar.svg",
    subscriptionStatus: "Pending",
    nextDelivery: "31th July, 2024",
    healthTips: "Make hay before sundown",
    notifications: "You have 3 notifications",
    recentActivities: [
      "Order delivery",
      "Order Shipped",
      "Order Processed",
      "Order Received"
    ],
    recommendedProducts:[
      {
        name: "Product 1",
        description: "Product descritpion in lorem so si huio faciid Mopery. Ipsy duo para kate bouyth Lala koko fenfe ni agabti yawo de lati sabo ngari lo wa jeun ta."
      }
    ]
  };
  return json({ user });
};

export const handle = {
  pageName: "Overview",
  breadcrumb: () => <span>Overview</span>
};

export default function Dashboard() {
  const { user } = useLoaderData();
  
  const { sidebarMenuRef }: { sidebarMenuRef: any } = useOutletContext();
  
  useEffect(() => {
    if (sidebarMenuRef) {
      sidebarMenuRef.current = () => (
        <SheetHeader>
          <SheetTitle>
            Are you absolutely sure?
          </SheetTitle>
          <SheetDescription>
            This is from handle func
          </SheetDescription>
        </SheetHeader>
      )
    }
  }, [sidebarMenuRef]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{user.name}</span>
            <img
              className="h-8 w-8 rounded-full"
              src={user.avatar}
              alt="User avatar"
            />
            <nav>
              <Link to="/profile" className="text-gray-700">Profile</Link>
              <Link to="/logout" className="text-gray-700 ml-4">Logout</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Welcome Section */}
            <section className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Welcome back, {user.name}!
              </h2>
              <p className="mt-4 text-gray-600">Here's an overview of your account:</p>
            </section>

            {/* Key Metrics and Notifications */}
            <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">Subscription Status</h3>
                <p className="mt-2 text-gray-600">{user.subscriptionStatus}</p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">Next Delivery</h3>
                <p className="mt-2 text-gray-600">{user.nextDelivery}</p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">Health Tips</h3>
                <p className="mt-2 text-gray-600">{user.healthTips}</p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                <p className="mt-2 text-gray-600">{user.notifications}</p>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/subscriptions" className="bg-blue-500 text-white shadow rounded-lg p-6 text-center">
                Manage Subscriptions
              </Link>
              <Link to="/orders" className="bg-green-500 text-white shadow rounded-lg p-6 text-center">
                View Order History
              </Link>
              <Link to="/support" className="bg-red-500 text-white shadow rounded-lg p-6 text-center">
                Contact Support
              </Link>
            </section>

            {/* Recent Activity */}
            <section className="mt-6 bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900">Recent Activity</h2>
              <ul className="mt-4 space-y-4">
                {user.recentActivities.map((activity: string, index: number) => (
                  <li key={index} className="text-gray-600">{activity}</li>
                ))}
              </ul>
            </section>

            {/* Product Recommendations */}
            <section className="mt-6 bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900">Recommended Products</h2>
              <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {user.recommendedProducts.map((product, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                    <p className="mt-2 text-gray-600">{product.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-4">
            <Link to="/help" className="text-gray-700">Help</Link>
            <Link to="/faq" className="text-gray-700">FAQ</Link>
            <Link to="/privacy" className="text-gray-700">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-700">Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
