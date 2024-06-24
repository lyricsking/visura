// app/components/DynamicForm.jsx
import { useNavigate, useLocation, useFetcher } from '@remix-run/react';
import { formConfig } from '~/utils/formConfig';

type DynamicFormType = {
  questionId: string
}

export default function DynamicForm({ questionId }: DynamicFormType) {
  const navigate = useNavigate();
  const location = useLocation();
  const fetcher = useFetcher();
  
  const initialState = location.state || {};
  
  const questions = initialState["questions"] || {};
  
  const question: Question = questions[questionId];
  
  const questionKeys = Object.keys(questions)
  const questionIndex = questionKeys.findIndex((key) => key === questionId);
  const lastQuestionId = questionKeys[questionKeys.length-1];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (questionId === lastQuestionId) {
      // Final form submission
      console.log('Final data:', { ...initialState, ...data });
      // You can send the data to your backend here
    } else {
      const nextQuestionIndex= questionIndex + 1;
      const nextQuestionId = questionKeys[nextQuestionIndex];
      navigate(`/quiz?id=${nextQuestionId}`, {
        state: { ...initialState, ...data },
      });
    }
  };

  const handlePrevious = () => {
    const prevQuestionIndex = questionIndex - 1;
    const prevQuestionId = questionKeys[prevQuestionIndex];
    navigate(`/quiz?id=${prevQuestionId}`, {
      state: initialState,
    });
  };

  return (
    <div className="flex flex-col h-screen">
      {isSubmitting 
        ? (
          <div className="flex-1 self-center items-center justify-center">
              Loading...
            </div>
          ) 
        : (
            <>
              <div className="border-b">
                <Button
                  variant="text"
                  size="sm"
                  className="border-e gap-2 h-12"
                  onClick={() => handlePrevious()}
                  disabled={progress.ratio === 0}
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                  Back
                </Button>
              </div>
    
              <Progress
                value={Math.min(questionIndex+1/questionKeys.length, 1)*100}
                className="h-4 w-full rounded-none"
                indicatorColor="bg-indigo-400"
              />
    
              <h3 className="text-3xl font-bold tracking-tight text-center my-4 mx-auto">
                {question.question}
              </h3>
    
              <div className="flex-1 my-6 p-2 w-full">
              <fetcher.Form method="post" onSubmit={handleSubmit}>
     <OptionsHandler
              answerType={question.type}
              currentAnswer={"answer"}
              onAnswerSelected={() => {}}
              options={question.options}
            />
      
              <div className="flex flex-col gap-4 fixed z-20 bottom-8 right-0 left-0">
                <Button
                  variant={"fill"}
                  radius={"full"}
                  className="h-12 w-2/3 mx-auto text-xl text-white text-center bg-indigo-400"
                  onClick={() => handleNext("Your answer")}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting"
                    : progress.currentIndex >= progress.lastIndex
                    ? "Finish"
                    : "Next"}
                </Button>
              </div>
    </fetcher.Form>
              </div>
            </>
          )}
        </div>
  );
}
