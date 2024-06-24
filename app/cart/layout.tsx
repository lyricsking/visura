import { getCartByUserId } from ".cart.server.ts";

export const loader = () => {
  const cart = getCartByUserId("");
  
  return json({cart})
}

export default function Layout(){
  const {cart} = useLoaderData();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 border rounded-md">
      <div className="col-span-9 bg-white">
        <Outlet context={{cart}} />
      </div>
      
      <div className="col-span-3 bg-orange-300">
        <div>
        </div>
      </div>
    </div>
  ) 
}