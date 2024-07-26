// routes/order.$orderId.tsx
import { useLoaderData } from 'remix';
import { getOrderDetails } from '~/utils/orderUtils';

export default function OrderDetails() {
  const { order } = useLoaderData();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
      <div className="mt-6 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Order Summary</h2>
          <p className="mt-1 text-sm text-gray-600">Order ID: {order.id}</p>
          <p className="mt-1 text-sm text-gray-600">Date: {order.date}</p>
          <p className="mt-1 text-sm text-gray-600">Total: ${order.total}</p>
          <p className="mt-1 text-sm text-gray-600">Status: {order.status}</p>
        </div>
        <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Products</h2>
          {order.products.map((product) => (
            <div key={product.id} className="mt-4 flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                <p className="mt-1 text-sm text-gray-600">Quantity: {product.quantity}</p>
                <p className="mt-1 text-sm text-gray-600">Price: ${product.price}</p>
              </div>
              <div>
                <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Shipping Information</h2>
          <p className="mt-1 text-sm text-gray-600">Address: {order.shippingAddress}</p>
          <p className="mt-1 text-sm text-gray-600">Delivery Status: {order.deliveryStatus}</p>
        </div>
        <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Payment Information</h2>
          <p className="mt-1 text-sm text-gray-600">Payment Method: {order.paymentMethod}</p>
          <p className="mt-1 text-sm text-gray-600">Billing Address: {order.billingAddress}</p>
        </div>
      </div>
    </div>
  );
}

export const loader = async ({ params }) => {
  const order = await getOrderDetails(params.orderId);
  return { order };
};

async function getOrderFromDatabase(orderId: string) {
  // Replace with your database fetching logic
  return {
    id: orderId,
    date: '2023-01-01',
    total: 100,
    status: 'Delivered',
    products: [
      {
        id: '1',
        name: 'Product 1',
        quantity: 2,
        price: 25,
        imageUrl: '/images/product1.jpg',
      },
      {
        id: '2',
        name: 'Product 2',
        quantity: 1,
        price: 50,
        imageUrl: '/images/product2.jpg',
      },
    ],
    shippingAddress: '123 Main St, Anytown, USA',
    deliveryStatus: 'Delivered',
    paymentMethod: 'Credit Card',
    billingAddress: '123 Main St, Anytown, USA',
  };
}
