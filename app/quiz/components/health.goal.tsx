// app/routes/quiz/section1.tsx
import { SectionType } from "..";

const HealthGoal = ({
  questions,
  questionIndex,
  nextCallback,
  isLastQuestion,
}: SectionType) => {
  const currentQuestion = questions[questionIndex];

  return (
    <div>
      <h2>Health Goal</h2>
      <p>{currentQuestion.question}</p>
      <button onClick={() => nextCallback(currentQuestion.id, "")}>
        {isLastQuestion ? "Finish" : "Next"}
      </button>
    </div>
  );
};

export default HealthGoal;
