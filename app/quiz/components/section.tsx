import { SectionType } from "..";
import Question from "./question";

const Section = ({
  questions,
  questionIndex,
  nextCallback,
  isLastQuestion,
}: SectionType) => {
  const currentQuestion = questions[questionIndex];

  return (
    <div className="flex flex-col items-center justify-center h-[100%] py-8">
      <h2></h2>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <Question {...currentQuestion} />
      </div>
      <button onClick={() => nextCallback(currentQuestion.id, "")}>
        {isLastQuestion ? "Finish" : "Next"}
      </button>
    </div>
  );
};

export default Section;
