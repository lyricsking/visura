export const action = async ({ request }: ActionFunctionArgs) => {
  // Handle server-side logic for form data

  //
  const supplements: ISupplement[] = await recommendSupplements(
    JSON.parse(data)
  );

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
  const location = useLocation();
  const fetcher = useFetcher();

  const answers = location.state;
  useEffect(() => {
    fetcher.submit(answers, {
      method: "post",
    });
  }, [answers]);

  return <div></div>;
}
