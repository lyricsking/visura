import Button from "~/shared/components/button";
import { Question } from "./quiz.provider";
import { useCallback, useState } from "react";
import { RadioGroup, RadioGroupItem } from "~/shared/components/radio";
import { Label } from "~/shared/components/label";
import { Checkbox } from "~/shared/components/checkbox";

type QuestionHandlerProps = {
  question: Question;
  answer?: string | string[];
  isLastQuestion: boolean;
  onSave: (answer: string | string[]) => void;
};

export default function QuestionHandler({
  question: { question, type, options },
  answer: currentAnswer,
  isLastQuestion,
  onSave,
}: QuestionHandlerProps) {
  const [answer, setAnswer] = useState<string | string[]>(() => {});
  const switchType = useCallback(() => {
    switch (type) {
      case "single":
        return (
          <Single answer={currentAnswer} options={options} onSave={setAnswer} />
        );
      case "multiple":
        return (
          <Multiple
            answer={currentAnswer}
            options={options}
            onSave={setAnswer}
          />
        );
      default:
        return null;
    }
  }, [currentAnswer, type, options]);

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
          onSave(answer);
        }}
      >
        {isLastQuestion ? "Finish" : "Next"}
      </Button>
    </div>
  );
}

type AnswerTypeProps = {
  options: string[];
  answer?: string | string[];
  onSave: QuestionHandlerProps["onSave"];
};

function Single({ answer, options, onSave }: AnswerTypeProps) {
  return (
    <RadioGroup value={answer as string} onValueChange={onSave}>
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

function Multiple({ answer, options, onSave }: AnswerTypeProps) {
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
            checked={answer?.includes(option)}
            onCheckedChange={(checkState) => {
              const prevState = [...(answer as string[])];

              const optionIndex = answer?.indexOf(option) ?? -1;

              if (!checkState && optionIndex >= 0)
                delete prevState[optionIndex];
              else prevState.push(option);

              onSave(prevState);
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
