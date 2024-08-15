import { Link } from "remix";

export {action};

export default function Quiz() {
  const fetcher = useFetcher();
  let isSubmitting = fetcher.state !== "idle";
  let navigate = useNavigate();
  let location = useLocation();
  
  useEffect(() => {
    if(!isSubmitting && fetcher.data) {
      let data = fetcher.data;
      if(data["uid"]){
        navigate(`/quiz/question/${data["uid"]}`, {
          replace: true,
        })
      }
    }
  }, [fetcher]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to the Quiz!</h1>
      </header>
      <main id="main-content" className="max-w-md text-center">
        <p className="mb-6">
          By participating in this quiz, you agree that your responses will be recorded and used to process the quiz results.
        </p>
        <div className="mt-auto">
          <fetcher.Form method="post">
            <Button
              variant='text'
              type="submit"
              className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Start Quiz
            </Button>
          </fetcher.Form>
        </div>
      </main>
    </div>
  );
}
