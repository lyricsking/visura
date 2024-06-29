export const action = async ({ request }: ActionFunctionArgs) => {
  // Handle server-side logic for form data
  
  //  Retrieve the submitted form quiz answers as json object
  const body = await request.json();
  
  //
  const supplements: ISupplement[] = await recommendSupplements(body);

  if (supplements) {
    try {
      await createCart(supplements);

      return json({ success: true });
    } catch (error) {
      return json({
        success: false,
        message: "Failed to convert supplements into order.",
      });
    }
  }
};

export default function Confirmation() {

  return <div></div>;
}
