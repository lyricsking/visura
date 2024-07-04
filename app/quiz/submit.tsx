import { ActionFunctionArgs, json } from "@remix-run/node";
import { Link, useActionData, useNavigate } from "@remix-run/react";
import { createCart, recommendSupplements } from "./quiz.server";
import { commitSession, getSession } from "~/shared/utils/session";
import type { ISupplementModel } from "~/supplement/supplement.model";
import { ANSWER_KEY, GIDS_MAP_KEY } from ".";
import React from "react";
import Loading from "~/shared/components/loading";

export const action = async ({ request }: ActionFunctionArgs) => {
  //  Retrieve the submitted form quiz answers as json object
  const answers = await request.json();
  console.log(answers);

  const session = await getSession(request.headers.get("Cookie"));
    
  session.unset(GIDS_MAP_KEY)
  session.unset(ANSWER_KEY)
    
  const headers = {
    "Set-Cookie": await commitSession(session),
  };
    
  //  Validate answer here
  if (answers) {
    try {
      const supplements: ISupplementModel[] = await recommendSupplements(answers);

      if (Array.isArray(supplements) && supplements.length > 0) {
        await createCart(supplements);
        
        return json({ success: true, data: { answers }}, { headers });
      }
    } catch (error) {
      console.log(error);
      
      return json({ success: false, data: { answers }}, { headers });
    }
  }
  
  return json({ success: false, data: { answers }}, { headers });
};

export default function Submit() {
  const data = useActionData<typeof action>();
  
  const [loading, setLoading] = React.useState(true);
  
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulating a loading state for 2 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <Loading />;
  }
  
  if(false/*!data?.success*/) {
     return (<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
         <h1 className="text-2xl font-bold text-red-600">
           An error occurred while processing your request.
         </h1>
         <Link
           to="/"
           className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
         >
           Go Home
         </Link>
       </div>
     );
  }
  
  return navigate("/cart")
}
