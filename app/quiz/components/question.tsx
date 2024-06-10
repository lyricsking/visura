import Button from "~/shared/components/button";
import { Question } from "./quiz.provider";
import { useCallback, useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "~/shared/components/radio";
import { Label } from "~/shared/components/label";
import { Checkbox } from "~/shared/components/checkbox";

type QuestionHandlerProps = {
  question: Question;
  selectedAnswer: any;
  isLastQuestion: boolean;
  onAnswer: (answer: any) => void;
};

export default function QuestionHandler({
  question: { question, type, options },
  selectedAnswer,
  onAnswer,
  isLastQuestion,
}: QuestionHandlerProps) {
  const [answer, setAnswer] = useState(selectedAnswer);

  const switchType = useCallback(() => {
    switch (type) {
      case "single":
        return (
          <Single
            options={options}
            selectedAnswer={selectedAnswer}
            onAnswer={setAnswer}
          />
        );
      case "multiple":
        return (
          <Multiple
            options={options}
            selectedAnswer={selectedAnswer}
            onAnswer={setAnswer}
          />
        );
      default:
        return null;
    }
  }, [selectedAnswer, type, options]);

  useEffect(() => {
    //  alert(JSON.stringify(answer, null, 2));
  }, [answer]);

  return (
    <div className="flex flex-col items-center justify-center h-full py-8 px-6">
      <h3 className="text-3xl font-bold tracking-tight text-center my-4 mx-auto">
        {question}
      </h3>

      <div className="flex-1 my-6 p-2 w-full">{switchType()}</div>

      <Button
        variant={"fill"}
        radius={"full"}
        className="fixed z-40 bottom-6 h-12 w-2/3 text-xl text-white text-center bg-indigo-400"
        onClick={() => {
          answer && onAnswer(answer);
        }}
      >
        {isLastQuestion ? "Finish" : "Next"}
      </Button>
    </div>
  );
}

type AnswerTypeProps = Pick<
  QuestionHandlerProps,
  "onAnswer" | "selectedAnswer"
> & {
  options: string[];
};

function Single({ options, selectedAnswer, onAnswer }: AnswerTypeProps) {
  return (
    <RadioGroup value={selectedAnswer as string} onValueChange={onAnswer}>
      {options.map((option) => (
        <div
          key={option}
          className="flex items-center space-x-4 py-6 px-6 border rounded-md bg-indigo-400 text-white"
        >
          <RadioGroupItem
            className="h-5 w-6 rounded-none"
            value={option}
            id={option}
          />
          <Label
            className="w-full text-2xl font-bold capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor={option}
          >
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function Multiple({ options, selectedAnswer, onAnswer }: AnswerTypeProps) {
  return (
    <div className="flex flex-col space-y-2">
      {options.map((option) => (
        <div
          key={option}
          className="flex items-center space-x-4 py-6 px-6 border rounded-md bg-indigo-400 text-white"
        >
          <Checkbox
            id={option}
            className="h-5 w-5 rounded-none"
            checked={selectedAnswer?.includes(option)}
            onCheckedChange={(checked) => {
              const currentAnswers =
                selectedAnswer && Array.isArray(selectedAnswer)
                  ? [...selectedAnswer]
                  : [];
              if (checked) {
                currentAnswers.push(option);
                onAnswer(currentAnswers);
              }
            }}
          />
          <label
            htmlFor={option}
            className="w-full text-2xl font-bold capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}
